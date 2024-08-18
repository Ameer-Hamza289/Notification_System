import React, { useEffect, useState } from 'react';
import './App.css';

// Define the types for your component state
interface Notification {
  message: string;
}

const App: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Create WebSocket connection.
    const socket = new WebSocket('ws://localhost:8080/ws');

    // Connection opened
    socket.onopen = () => {
      console.log('WebSocket is connected.');
      setIsConnected(true);
    };

    // Listen for messages
    socket.onmessage = (event: MessageEvent) => {
      console.log('New notification received:', event.data);

      // Update notifications state with the new message
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { message: event.data },
      ]);
    };

    // Handle WebSocket errors
    socket.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    // Connection closed
    socket.onclose = () => {
      console.log('WebSocket connection closed.');
      setIsConnected(false);
    };

    // Clean up WebSocket connection when component unmounts
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>TikTok Shop Notifications</h1>
        <div className="connection-status">
          {isConnected ? (
            <span className="status-connected">Connected</span>
          ) : (
            <span className="status-disconnected">Disconnected</span>
          )}
        </div>

        <div className="notification-list">
          <h2>Notifications</h2>
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification, index) => (
                <li key={index}>{notification.message}</li>
              ))}
            </ul>
          ) : (
            <p>No notifications yet.</p>
          )}
        </div>
      </header>
    </div>
  );
};

export default App;
