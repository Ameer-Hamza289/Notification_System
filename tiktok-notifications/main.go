package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
)

var ctx = context.Background()

// WebSocket upgrader
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		// Allow all origins for now, be sure to restrict in production
		return true
	},
}

func main() {

	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	// Access environment variables
	dbUser := os.Getenv("DB_USER")
	// dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	// jwtSecret := os.Getenv("JWT_SECRET")
	redisAddress := os.Getenv("REDIS_ADDRESS")
	redisPassword := os.Getenv("REDIS_PASSWORD")

	log.Printf("Connecting to database %s with user %s", dbName, dbUser)

	// Initialize Redis
	rdb := redis.NewClient(&redis.Options{
		Addr:     redisAddress, // Use the Redis endpoint from redis.io
		Password: redisPassword,
		DB:       0, // Use default DB
	})

	// Test the Redis connection
	_, err = rdb.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	} else {
		log.Println("Successfully connected to Redis")
	}

	// Goroutine to subscribe to the Redis channel and log messages
	go func() {
		pubsub := rdb.Subscribe(ctx, "new_content_channel")
		defer pubsub.Close()

		// Listen for messages from the channel
		for {
			msg, err := pubsub.ReceiveMessage(ctx)
			if err != nil {
				log.Printf("Error receiving message: %v", err)
				continue
			}

			log.Printf("Received message: %s", msg.Payload)
		}
	}()

	// Initialize Gin router
	router := gin.Default()

	// WebSocket endpoint to handle connections
	router.GET("/ws", func(c *gin.Context) {
		handleWebSocket(c.Writer, c.Request, rdb)
	})

	// Example route to simulate content posting
	router.POST("/post-content", func(c *gin.Context) {
		// Simulate content being posted
		content := "New TikTok Shop Content!"

		// Publish content to Redis Pub/Sub channel
		err := rdb.Publish(ctx, "new_content_channel", content).Err()
		if err != nil {
			log.Printf("Failed to publish content: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to publish content"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"status": "Content published successfully!"})
	})

	// Start the Gin server
	if err := router.Run(":8080"); err != nil {
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
