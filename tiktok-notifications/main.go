package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

var ctx = context.Background()
var jwtKey = []byte("your_secret_key") // Use a secure secret key

// WebSocket upgrader
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// JWT claims struct
type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func main() {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	// Access environment variables
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	redisAddress := os.Getenv("REDIS_ADDRESS")
	redisPassword := os.Getenv("REDIS_PASSWORD")

	// Connecting to MySQL
	log.Printf("Connecting to database %s with user %s", dbName, dbUser)
	dsn := fmt.Sprintf("%s:%s@tcp(127.0.0.1:3306)/%s", dbUser, dbPassword, dbName)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Failed to connect to MySQL: %v", err)
	}
	defer db.Close()

	// Test MySQL connection
	err = db.Ping()
	if err != nil {
		log.Fatalf("Failed to ping the database: %v", err)
	}
	fmt.Println("Successfully connected to MySQL!")

	// Initialize Redis
	rdb := redis.NewClient(&redis.Options{
		Addr:     redisAddress,
		Password: redisPassword,
		DB:       0,
	})

	// Test Redis connection
	_, err = rdb.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	} else {
		log.Println("Successfully connected to Redis")
	}

	// Initialize Gin router
	router := gin.Default()

	// router.Use(cors.Default())
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Add your frontend's origin
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"}, // Allow Authorization header
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Route for WebSocket connection
	router.GET("/ws", func(c *gin.Context) {
		handleWebSocket(c.Writer, c.Request, rdb)
	})

	// Registration route to create a new user
	router.POST("/register", func(c *gin.Context) {
		var request struct {
			Username string `json:"username"`
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		if err := c.BindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		// Hash the password using bcrypt
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(request.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
			return
		}

		// Insert the user into the database
		_, err = db.Exec("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)", request.Username, request.Email, hashedPassword)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "User registered successfully!"})
	})

	// Login route to issue JWT
	router.POST("/login", func(c *gin.Context) {
		var credentials struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		if err := c.BindJSON(&credentials); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		// Fetch user from the database by email
		var storedHash string
		var username string

		err := db.QueryRow("SELECT username, password_hash FROM users WHERE email = ?", credentials.Email).Scan(&username, &storedHash)
		if err != nil {
			if err == sql.ErrNoRows {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Server error"})
			return
		}

		// Compare the stored hash with the provided password
		err = bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(credentials.Password))
		if err != nil {
			// Password does not match
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
			return
		}

		// Create a JWT token if the password matches
		expirationTime := time.Now().Add(24 * time.Hour)
		claims := &Claims{
			Username: username,
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: expirationTime.Unix(),
			},
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		tokenString, err := token.SignedString(jwtKey)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not issue token"})
			return
		}

		// Return the token
		c.JSON(http.StatusOK, gin.H{"token": tokenString})
	})

	// Fetch recent posts
	router.GET("/recent-posts", authenticateJWT, func(c *gin.Context) {
		rows, err := db.Query("SELECT id, content_text, created_at FROM content ORDER BY created_at DESC LIMIT 20")
		if err != nil {
			log.Printf("Failed to query database: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch content"})
			return
		}
		defer rows.Close()

		var posts []struct {
			ID        int       `json:"id"`
			Content   string    `json:"content_text"`
			CreatedAt time.Time `json:"created_at"`
		}

		for rows.Next() {
			var post struct {
				ID        int
				Content   string
				CreatedAt string // Change to string to parse manually
			}

			if err := rows.Scan(&post.ID, &post.Content, &post.CreatedAt); err != nil {
				log.Printf("Failed to parse content data: %v", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse content"})
				return
			}

			// Convert the created_at string to time.Time manually
			createdAt, err := time.Parse("2006-01-02 15:04:05", post.CreatedAt)
			if err != nil {
				log.Printf("Failed to parse time: %v", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse time"})
				return
			}

			posts = append(posts, struct {
				ID        int       `json:"id"`
				Content   string    `json:"content_text"`
				CreatedAt time.Time `json:"created_at"`
			}{
				ID:        post.ID,
				Content:   post.Content,
				CreatedAt: createdAt,
			})
		}

		c.JSON(http.StatusOK, posts)
	})

	// Protected route for posting content
	router.POST("/post-content", authenticateJWT, func(c *gin.Context) {
		var requestBody struct {
			Content string `json:"content"`
		}

		if err := c.BindJSON(&requestBody); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		// Publish content to Redis Pub/Sub channel
		err := rdb.Publish(ctx, "new_content_channel", requestBody.Content).Err()
		if err != nil {
			log.Printf("Failed to publish content: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to publish content"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"status": "Content published successfully!"})
	})

	// Start the Gin server on port 8081
	if err := router.Run(":8081"); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}

// WebSocket handler
func handleWebSocket(w http.ResponseWriter, r *http.Request, rdb *redis.Client) {
	// Upgrade HTTP connection to WebSocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Failed to upgrade to WebSocket: %v", err)
		return
	}
	defer conn.Close()

	// Subscribe to Redis Pub/Sub channel
	pubsub := rdb.Subscribe(ctx, "new_content_channel")
	defer pubsub.Close()

	// Listen for messages and send them to WebSocket clients
	for {
		msg, err := pubsub.ReceiveMessage(ctx)
		if err != nil {
			log.Printf("Error receiving message from Redis: %v", err)
			break
		}

		// Send the message to the WebSocket client
		err = conn.WriteMessage(websocket.TextMessage, []byte(msg.Payload))
		if err != nil {
			log.Printf("Error sending message to WebSocket client: %v", err)
			break
		}
	}
}

// Middleware for JWT authentication
func authenticateJWT(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
		c.Abort()
		return
	}

	// Extract token from Authorization header (assuming the format is "Bearer <token>")
	tokenString := strings.Split(authHeader, "Bearer ")[1]

	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
		c.Abort()
		return
	}

	// Set the username from the token claims in the context
	c.Set("username", claims.Username)

	// Continue to the next handler
	c.Next()
}
