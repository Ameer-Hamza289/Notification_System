import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ContentProps {
  token: string;
}

interface Post {
  id: number;
  content: string;
  created_at: string;
}

interface Notification {
  message: string;
}

const Content: React.FC<ContentProps> = ({ token }) => {
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPostForm, setShowPostForm] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Fetch recent posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/recent-posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [token]);

  // WebSocket for notifications
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8081/ws');

    // Connection opened
    socket.onopen = () => {
      console.log('WebSocket is connected.');
      setIsConnected(true);

      // Optionally, send an authentication message with the token
      if (token) {
        socket.send(JSON.stringify({ type: 'auth', token }));
      }
    };

    // Listen for messages
    socket.onmessage = (event) => {
      setNotifications((prev) => [...prev, { message: event.data }]);
    };

    // Handle WebSocket errors
    socket.onerror = () => {
      console.error('WebSocket error');
      setIsConnected(false);
    };

    // Connection closed
    socket.onclose = () => {
      console.log('WebSocket connection closed.');
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, [token]);

  // Toggle notifications dropdown
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Handle content submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8081/post-content',
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Content posted successfully!');
      setShowPostForm(false);
      setContent('');
    } catch (error) {
      console.error(error);
      alert('Failed to post content');
    }
  };

  // Toggle post form visibility
  const togglePostForm = () => {
    setShowPostForm(!showPostForm);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header with Post Button and Notifications */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Recent Posts</h1>
          <div className="mt-2 text-sm">
            {isConnected ? (
              <span className="text-green-500">Connected</span>
            ) : (
              <span className="text-red-500">Disconnected</span>
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          {/* Toggle Post Form Button */}
          <button
            onClick={togglePostForm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {showPostForm ? 'View Posts' : 'Post Content'}
          </button>

          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="bg-gray-200 p-3 rounded-full hover:bg-gray-300"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8 6.659 6 9.87 6 14v3c0 .217-.053.427-.152.605L4.293 17H9m6 0v1a3 3 0 01-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 p-4">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <ul className="mt-2 space-y-2">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <li
                        key={index}
                        className="p-2 bg-gray-100 rounded-md"
                      >
                        {notification.message}
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-600">No notifications</p>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toggle between Post Form and Recent Posts */}
      {showPostForm ? (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Post Content</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your content"
              className="w-full p-3 border border-gray-300 rounded-md h-32"
              required
            />
            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="p-6 bg-white rounded-lg shadow-md">
                <p className="text-gray-800">{post.content}</p>
                <p className="text-gray-400 text-sm">{new Date(post.created_at).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No posts available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Content;






















// import React, { useState } from 'react';
// import axios from 'axios';

// interface ContentProps {
//   token: string;
// }

// const Content: React.FC<ContentProps> = ({ token }) => {
//   const [content, setContent] = useState('');

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         'http://localhost:8081/post-content',
//         { content },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert('Content posted successfully!');
//     } catch (error) {
//         console.error(error);
//       alert('Failed to post content');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center mb-6">Post Content</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="Enter your content"
//             className="w-full p-3 border border-gray-300 rounded-md h-32"
//             required
//           />
//           <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//             Post
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Content;
