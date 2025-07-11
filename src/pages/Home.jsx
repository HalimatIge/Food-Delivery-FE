import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaBolt, FaHeart, FaMobileAlt, FaStar } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-[#FF4C29] text-white py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Delicious Food <br /> Delivered Fast
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Order from your favorite restaurants with just a few taps. Quick, easy, and delicious!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/register" 
                className="bg-white text-[#FF4C29] px-8 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition duration-300 text-center"
              >
                Get Started
              </Link>
              <Link 
                to="/login" 
                className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white hover:bg-opacity-20 transition duration-300 text-center"
              >
                Sign In
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Delicious food" 
              className="rounded-lg shadow-2xl w-full max-w-md transform rotate-2 hover:rotate-0 transition duration-500"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Why Choose QuickPlate?</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<FaBolt className="text-4xl mb-4 text-[#FF4C29]" />}
              title="Lightning Fast"
              description="Get your food delivered in under 30 minutes or get it for free."
            />
            <FeatureCard 
              icon={<FaUtensils className="text-4xl mb-4 text-[#FF4C29]" />}
              title="100+ Restaurants"
              description="Choose from a wide variety of cuisines and restaurants."
            />
            <FeatureCard 
              icon={<FaHeart className="text-4xl mb-4 text-[#FF4C29]" />}
              title="Healthy Options"
              description="We offer plenty of healthy and dietary-specific meal choices."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number="1"
              icon={<FaMobileAlt className="text-2xl" />}
              title="Browse Restaurants"
              description="Explore restaurants and menus in your area."
            />
            <StepCard 
              number="2"
              icon={<FaUtensils className="text-2xl" />}
              title="Choose Your Meal"
              description="Select your favorite dishes and add to cart."
            />
            <StepCard 
              number="3"
              icon={<FaBolt className="text-2xl" />}
              title="Fast Delivery"
              description="Track your order in real-time until it arrives."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">What Our Customers Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Sarah Johnson"
              rating={5}
              review="QuickPlate has completely changed how I order food. The delivery is always on time and the food arrives hot!"
            />
            <TestimonialCard 
              name="Michael Chen"
              rating={4}
              review="Great selection of restaurants and the app is so easy to use. My go-to for food delivery now."
            />
            <TestimonialCard 
              name="Emma Rodriguez"
              rating={5}
              review="I love the healthy options available. Makes eating well so convenient when I'm busy."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FF4C29] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Try QuickPlate?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers enjoying delicious meals delivered to their doorstep.
          </p>
          <Link 
            to="/register" 
            className="bg-white text-[#FF4C29] px-8 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition duration-300 inline-block"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

// Reusable Components
const FeatureCard = ({ icon, title, description }) => (
  <div className="text-center p-6 hover:shadow-lg rounded-lg transition duration-300">
    <div className="flex justify-center">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StepCard = ({ number, icon, title, description }) => (
  <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <div className="w-12 h-12 bg-[#FF4C29] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
      {number}
    </div>
    <div className="flex items-center mb-3">
      <div className="mr-3 text-[#FF4C29]">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TestimonialCard = ({ name, rating, review }) => (
  <div className="bg-gray-50 p-6 rounded-lg">
    <div className="flex mb-3">
      {[...Array(5)].map((_, i) => (
        <FaStar 
          key={i} 
          className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        />
      ))}
    </div>
    <p className="text-gray-700 italic mb-4">"{review}"</p>
    <p className="font-semibold text-gray-800">{name}</p>
  </div>
);

export default LandingPage;

// import React from 'react'
// import Navbar from "../component/Navbar"
// import HomeCaro from "../component/HomeCarousel"




// const Home = () => {


//   return (
//     <div className=''>

     
//       <HomeCaro/>
      
      
//     </div>
//   )
// }

// export default Home
