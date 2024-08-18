import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">TikTok Shop</div>
          <div className="space-x-4">
            <a href="#features" className="text-gray-600 hover:text-gray-800">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-800">Pricing</a>
            <a href="/register" className="text-gray-600 hover:text-gray-800">Register</a>
            <a href="/login" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">Login</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to TikTok Shop</h1>
          <p className="text-xl mb-8">Your one-stop platform for shopping and selling amazing products</p>
          <a href="#register" className="text-blue-500 bg-white hover:bg-gray-100 px-6 py-3 rounded-md text-lg font-semibold">
            Get Started
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">Feature One</h3>
              <p className="text-gray-600">Description of your first amazing feature. Highlight the benefits of using your product.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">Feature Two</h3>
              <p className="text-gray-600">Description of your second amazing feature. Explain how it improves the user experience.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">Feature Three</h3>
              <p className="text-gray-600">Description of your third amazing feature. Make your users excited about using this feature.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">Basic Plan</h3>
              <p className="text-gray-600 mb-4">$9.99 / month</p>
              <a href="#register" className="text-blue-500">Choose Plan</a>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">Pro Plan</h3>
              <p className="text-gray-600 mb-4">$19.99 / month</p>
              <a href="#register" className="text-blue-500">Choose Plan</a>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">Enterprise Plan</h3>
              <p className="text-gray-600 mb-4">Contact Us</p>
              <a href="#register" className="text-blue-500">Choose Plan</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2024 TikTok Shop. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
