import React, { useState } from 'react';
import axios from 'axios';

interface ContentProps {
  token: string;
}

const Content: React.FC<ContentProps> = ({ token }) => {
  const [content, setContent] = useState('');

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
    } catch (error) {
        console.error(error);
      alert('Failed to post content');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
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
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Content;
