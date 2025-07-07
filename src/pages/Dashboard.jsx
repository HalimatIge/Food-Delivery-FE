
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from "../context/CartContext";

// import { toast } from "react-toastify";


// const Dashboard = () => {
//   const { user, authLoading } = useAuth();
//   const [foodItems, setFoodItems] = useState([]);
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   useEffect(() => {
//     if (!authLoading && !user) {
//       navigate('/login');
//     }
//   }, [authLoading, user]);

//   useEffect(() => {
//     if (user) {
//       axios.get('http://localhost:5005/api/foodItems')
//         .then(res => setFoodItems(res.data.foodItems))
//         .catch(err => console.log(err));
//     }
//   }, [user]);

//   return (
//     <div className="pt-20 px-4 md:px-8">
//       <h1 className="text-3xl font-bold text-[#FF4C29] mb-4">Welcome, {user?.firstname}</h1>
//       <h2 className="text-xl text-[#FFD93D] mb-6">Available Food Items</h2>
//       <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {foodItems.map(item => (
//           <div key={item._id} className="bg-white p-4 rounded-xl shadow">
//              <img 
//   src={item.images?.[0]?.url || '/placeholder.jpg'} 
//   alt={item.name} 
//   className="w-full h-48 object-cover mb-3"
// />
//             <h3 className="text-lg font-bold text-[#FF4C29]">{item.name}</h3>
//             <p className="text-gray-600">{item.description}</p>
//             <p className="text-[#FFD93D] font-semibold mt-2">${item.price}</p>
//              <button
//         className="bg-[#FF4C29] text-white px-4 py-2 mt-2 rounded hover:bg-[#e04427]"
//         onClick={() => addToCart(item)}
//       >
//         Add to Cart
//       </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FoodItemCard from "../component/FoodItemCard"; // ✅ import your new component

const Dashboard = () => {
  const { user, authLoading } = useAuth();
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user]);

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5005/api/foodItems")
        .then((res) => setFoodItems(res.data.foodItems))
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="pt-20 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-[#FF4C29] mb-4">
        Welcome, {user?.firstname}
      </h1>
      <h2 className="text-xl text-[#FFD93D] mb-6">Available Food Items</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {foodItems.map((item) => (
          <FoodItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
