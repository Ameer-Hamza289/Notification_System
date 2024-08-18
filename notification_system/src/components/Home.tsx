
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cover from "../assets/image/cover.png"

const Home: React.FC = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  const handleStarted = () => {
    if (token) {
      navigate('/content');
    } else {
      navigate('register')
    }
  }

  useEffect(() => {
    setToken(token);
  }, [token]);
 
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="bg-blue-500 text-white min-h-screen flex items-center justify-center"
      style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(50%)',
        }}>
      
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-white">Welcome to TikTok Shop</h1>
          <p className="text-xl mb-8 font-extrabold">
            Your one-stop platform for shopping and selling amazing products
          </p>
          <a
            onClick={handleStarted}
            className="text-blue-500  bg-white hover:bg-gray-100 px-6 py-3 rounded-md text-lg font-semibold cursor-pointer"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* <!-- Features Section --> */}
      
<section id="features" className="min-h-screen py-16 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-12">Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* <!-- Feature One --> */}

      <div className="p-8  bg-gray-900 text-white rounded-lg shadow-md border border-gray-800 transition-transform transform hover:scale-105 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-700 duration-300 ease-in-out text-left">
        <h3 className="text-2xl font-semibold mb-4 text-center">First Feature </h3>
        <hr className="pb-6 "/>
        <p className="text-gray-300 mb-4 ">
          First amazing feature. Highlight the benefits of using your product. This feature provides incredible value and stands out from the competition by offering unique capabilities.
        </p>
        <p className="text-gray-300 pb-12">
          Additional details or examples that demonstrate the effectiveness of the feature. Users will find this feature particularly useful for their specific needs and challenges.
        </p>
      </div>
      {/* <!-- Feature Two --> */}
      <div className="p-8 bg-gray-900 text-white rounded-lg shadow-md border border-gray-800 transition-transform transform hover:scale-105 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-700 duration-300 ease-in-out text-left">
        <h3 className="text-2xl font-semibold mb-4 text-center">Second Feature </h3>
        <hr className="pb-6 "/>
        <p className="text-gray-300 mb-4">
          Second amazing feature. Explain how it improves the user experience. This feature is designed to make interactions smoother and more intuitive.
        </p>
        <p className="text-gray-300">
          Additional context or scenarios where this feature excels. It's engineered to solve common issues and enhance overall functionality.
        </p>
      </div>
      {/* <!-- Feature Three --> */}
      <div className="p-8 bg-gray-900 text-white rounded-lg shadow-md border border-gray-800 transition-transform transform hover:scale-105 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-700 duration-300 ease-in-out text-left">
        <h3 className="text-2xl font-semibold mb-4 text-center">Third Feature</h3>
        <hr className="pb-6 "/>
        <p className="text-gray-300 mb-4">
           Third amazing feature. Make your users excited about using this feature. This feature offers advanced functionality that adds significant value to the user experience.
        </p>
        <p className="text-gray-300">
          Further insights or benefits of this feature. Ideal for users looking for comprehensive solutions and enhanced capabilities.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* <!-- Pricing Section --> */}

      <section id="pricing" className="min-h-screen py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-12">Pricing Plans</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* <!-- Basic Plan --> */}
      <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md border border-gray-800 transition-transform transform hover:scale-105 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-700 duration-300 ease-in-out h-full flex flex-col">
        <h3 className="text-2xl font-semibold mb-4">Basic Plan</h3>
        <hr className="pb-6 "/>
        <p className="text-4xl font-bold mb-4 text-left pb-5">$9.99 <span className="text-base font-medium">/ month</span></p>
        <ul className="text-left mb-6 space-y-2 flex-grow">
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10l4 4 4-4-1.41-1.41L10 11.17l-2.59-2.58L6 10z"></path></svg>
            Basic Features
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10l4 4 4-4-1.41-1.41L10 11.17l-2.59-2.58L6 10z"></path></svg>
            5 Product Listings
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10l4 4 4-4-1.41-1.41L10 11.17l-2.59-2.58L6 10z"></path></svg>
            Basic Analytics
          </li>
          <li className="flex items-center text-gray-500">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10l4 4 4-4-1.41-1.41L10 11.17l-2.59-2.58L6 10z"></path></svg>
            No Priority Support
          </li>
        </ul>
        <a href="#register" className="bg-blue-500 mt-16 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition duration-300 mt-auto">
          Choose Plan
        </a>
      </div>
      {/* <!-- Pro Plan --> */}
      <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md border border-gray-800 transition-transform transform hover:scale-105 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-700 duration-300 ease-in-out h-full flex flex-col">
        <h3 className="text-2xl font-semibold mb-4">Pro Plan</h3>
        <hr className="pb-6 "/>
        <p className="text-4xl font-bold mb-4 text-left pb-5">$19.99 <span className="text-base font-medium">/ month</span></p>
        <ul className="text-left mb-6 space-y-2 flex-grow">
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10l4 4 4-4-1.41-1.41L10 11.17l-2.59-2.58L6 10z"></path></svg>
            All Basic Features
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10l4 4 4-4-1.41-1.41L10 11.17l-2.59-2.58L6 10z"></path></svg>
            20 Product Listings
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10l4 4 4-4-1.41-1.41L10 11.17l-2.59-2.58L6 10z"></path></svg>
            Advanced Analytics
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10l4 4 4-4-1.41-1.41L10 11.17l-2.59-2.58L6 10z"></path></svg>
            Priority Support
          </li>
        </ul>
        <a href="#register" className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition duration-300 mt-auto">
          Choose Plan
        </a>
      </div>
      {/* <!-- Enterprise Plan --> */}
      <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md border border-gray-800 transition-transform transform hover:scale-105 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-700 duration-300 ease-in-out h-full flex flex-col">
        <h3 className="text-2xl font-semibold mb-4">Enterprise Plan</h3>
        <hr className="pb-6 "/>
        <h3 className="text-2xl font-semibold text-left pb-5">For Enterprise</h3>
        <ul className="text-left mb-6 space-y-2 flex-grow">
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10l4 4 4-4-1.41-1.41L10 11.17l-2.59-2.58L6 10z"></path></svg>
            All Pro Features
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10l4 4 4-4-1.41-1.41L10 11.17l-2.59-2.58L6 10z"></path></svg>
            Unlimited Product Listings
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10l4 4 4-4-1.41-1.41L10 11.17l-2.59-2.58L6 10z"></path></svg>
            Custom Analytics
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10l4 4 4-4-1.41-1.41L10 11.17l-2.59-2.58L6 10z"></path></svg>
            24/7 Support
          </li>
        </ul>
        <a href="#contact" className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition duration-300 mt-auto ">
          Contact Us
        </a>
      </div>
    </div>
  </div>
</section>

<section id="testimonials" className="py-16 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold text-black mb-8">What Our Customers Say</h2>
    <div className="flex flex-col md:flex-row md:space-x-8">
      {/* Testimonial 1 */}
      <div className="flex-1 p-6 bg-gray-800 text-white rounded-lg shadow-md border border-gray-700 transition-transform transform hover:scale-105 hover:bg-gray-700 hover:shadow-xl hover:shadow-gray-600 duration-300 ease-in-out flex flex-col">
        <p className="font-semibold mb-3">Jane Doe</p>
        <hr className="w-full"/>

        <p className="text-gray-200 font-medium m-3">Verified Buyer</p>
        <p className="text-gray-300 mb-4 flex-grow">
          "TikTok Shop has revolutionized my shopping experience. The variety and ease of use are unbeatable!"
        </p>
      </div>

      {/* Testimonial 2 */}
      <div className="flex-1 p-6 bg-gray-800 text-white rounded-lg shadow-md border border-gray-700 transition-transform transform hover:scale-105 hover:bg-gray-700 hover:shadow-xl hover:shadow-gray-600 duration-300 ease-in-out flex flex-col mt-4 md:mt-0">
        <p className="font-semibold mb-3">John Smith</p>
        <hr className="w-full"/>

        <p className="text-gray-200 font-medium m-3">Business Owner</p>
        <p className="text-gray-300 mb-4 flex-grow">
          "An incredible platform for both shopping and selling. Highly recommended!"
        </p>
      </div>

      {/* Testimonial 3 */}
      <div className="flex-1 p-6 bg-gray-800 text-white rounded-lg shadow-md border border-gray-700 transition-transform transform hover:scale-105 hover:bg-gray-700 hover:shadow-xl hover:shadow-gray-600 duration-300 ease-in-out flex flex-col mt-4 md:mt-0">
        <p className="font-semibold pb-3">Alice Johnson</p>
        <hr className="w-full"/>
        <p className="text-gray-200 font-medium m-3">Frequent Shopper</p>
        <p className="text-gray-300 mb-4 flex-grow">
          "The customer service is outstanding, and the interface is very user-friendly."
        </p>
      </div>

      {/* Testimonial 4 */}
      
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; 2024 TikTok Shop. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
