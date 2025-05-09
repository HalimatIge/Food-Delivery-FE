
// import React, { useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//     // console.log("admin page");
    
//   const [foodData, setFoodData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: ''
//   });

//   const handleChange = (e) => {
//     setFoodData({ ...foodData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5005/api/admin/food", foodData, {
//         withCredentials: true, // Include the cookie for auth
//       });
//       alert(response.data.message);
//     } catch (err) {
//       console.error("Error adding food item:", err);
//       alert("Failed to add food item");
//     }
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <h3 className="w-100 h-100 bg-red"> Im working</h3>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Food Name" onChange={handleChange} required />
//         <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
//         <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
//         <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
//         <button type="submit">Add Food Item</button>
//       </form>
//     </div>
//   );
// };

// export default AdminDashboard;
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <p>Loading...</p>;

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold h-100 bg-red text-[#FF4C29]">Admin Dashboard</h1>
      {/* Add admin content here */}
    </div>
  );
};

export default AdminDashboard;
