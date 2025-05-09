import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from '../context/AuthContext';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "@/component/Navbar";

export default function DashboardPage() {

  const { user, authLoading } = useAuth();
  const navigate = useNavigate();
  
  // State to store food items
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    // Fetch user info and redirect to login if not authenticated
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);
 console.log(user);
 
  useEffect(() => {
    // Fetch food items from the API
    if (user) {
      axios
        .get("http://localhost:5005/api/foodItems") // replace with actual endpoint
        .then((res) => {
          if (res.data.status) {
            setFoodItems(res.data.foodItems); // Store fetched food items in state
          }
        })
        .catch((err) => {
          console.error("Food fetch error", err);
        });
    }
  }, [user]);

  if (authLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="min-h-screen bg-[#FFF5EB] dark:bg-gray-900 text-gray-800 dark:text-white px-4 md:px-8 pt-6 md:pt-[80px] pb-[80px] md:pb-0">
        {/* Welcome Header */}
        <header className="mb-8 text-center">
  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#FF4C29] mb-4">
    🍔 Welcome to QuickPlate!
  </h1>
  {user && (
    <p className="text-md sm:text-lg text-gray-600 dark:text-gray-300 mt-2">
      Logged in as <span className="font-semibold">{user.firstname} {user.lastname}</span> ({user.email})
    </p>
  )}
        </header>


        {/* Food Items Section */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-[#FFD93D]">Available Food Items</h2>
          {foodItems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {foodItems.map((item) => (
                <div key={item._id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition">
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-3" />
                  <h3 className="text-lg sm:text-xl font-bold text-[#FF4C29]">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                  <p className="mt-2 font-semibold text-[#FFD93D]">${item.price}</p>
                  <p className="text-sm italic text-gray-400">{item.category}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No food items available.</p>
          )}
        </section>

        {/* Sidebar */}
        <SidebarProvider>
          <main>
            <SidebarTrigger />
          </main>
        </SidebarProvider>
      </div>
    </>
  );
}
