import React, { useEffect, useState } from 'react';
// import '../App.css';

// Define the types for your component state
interface Notification {
  message: string;
}

interface NotificationProps {
  token: string;
}

const Notifications: React.FC<NotificationProps> = ({ token }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Create WebSocket connection.
    const socket = new WebSocket('ws://localhost:8081/ws');

    // Connection opened
    socket.onopen = () => {
      console.log('WebSocket is connected.');
      setIsConnected(true);

      // Optionally, you could send an authentication message with the token if required
      if (token) {
        socket.send(JSON.stringify({ type: 'auth', token }));
      }
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
  }, [token]); // Add token as a dependency if it is used in the connection

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Notifications</h2>
      <div className="mb-4 text-center">
        {isConnected ? (
          <span className="text-green-500">Connected</span>
        ) : (
          <span className="text-red-500">Disconnected</span>
        )}
      </div>

      <div className="notification-list space-y-4">
        {notifications.length > 0 ? (
          <ul className="space-y-2">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 rounded-md shadow-md"
              >
                {notification.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No notifications yet.</p>
        )}
      </div>
    </div>
  </div>
  );
};

export default Notifications;
