// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function DashboardPage() {
//   const [user, setUser] = useState(null);
//   const [foodItems, setFoodItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const cookie = document.cookie;
//     console.log("Document cookie:", cookie);

//     const token = cookie
//       .split("; ")
//       .find((row) => row.startsWith("token="))
//       ?.split("=")[1];

//     if (!token) {
//       console.log("No token found in cookies.");
//       navigate("/login");
//       return;
//     }

//     // Fetch user info using token
//     axios
//       .get("http://localhost:5005/api/auth/dashboard", {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.status) {
//           setUser(res.data.user);
//         } else {
//           console.log("User not authorized");
//           navigate("/login");
//         }
//       })
//       .catch((err) => {
//         console.error("Auth failed", err);
//         navigate("/login");
//       });

//     // Fetch food items
//     axios
//       .get("http://localhost:5005/api/foodItems/all")
//       .then((res) => {
//         if (res.data.status) {
//           setFoodItems(res.data.foodItems);
//         }
//       })
//       .catch((err) => {
//         console.error("Food fetch error", err);
//       });
//   }, [navigate]);

//   return (
//     <div className="min-h-screen bg-[#FFF5EB] dark:bg-gray-900 text-gray-800 dark:text-white p-6">
//       <header className="mb-8 text-center">
//         <h1 className="text-3xl font-bold text-[#FF4C29]">🍔 Welcome to YummyBite!</h1>
//         {user && (
//           <p className="text-md text-gray-600 dark:text-gray-300 mt-2">
//             Logged in as{" "}
//             <span className="font-semibold">
//               {user.firstname} {user.lastname}
//             </span>{" "}
//             ({user.email})
//           </p>
//         )}
//       </header>

//       <section>
//         <h2 className="text-2xl font-semibold mb-4 text-[#FFD93D]">Available Food Items</h2>
//         {foodItems.length > 0 ? (
//           <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {foodItems.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-40 object-cover rounded-lg mb-3"
//                 />
//                 <h3 className="text-lg font-bold text-[#FF4C29]">{item.name}</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
//                 <p className="mt-2 font-semibold text-[#FFD93D]">${item.price}</p>
//                 <p className="text-sm italic text-gray-400">{item.category}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 dark:text-gray-400">No food items available.</p>
//         )}
//       </section>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/auth/dashboard", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status) {
          setUser(res.data.user);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Auth failed", err);
        navigate("/login");
      });

    axios
      .get("http://localhost:5005/api/foodItems")
      .then((res) => {
        if (res.data.status) {
          setFoodItems(res.data.foodItems);
        }
      })
      .catch((err) => {
        console.error("Food fetch error", err);
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FFF5EB] dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#FF4C29]">🍔 Welcome to YummyBite!</h1>
        {user && (
          <p className="text-md text-gray-600 dark:text-gray-300 mt-2">
            Logged in as <span className="font-semibold">{user.firstname} {user.lastname}</span> ({user.email})
          </p>
        )}
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[#FFD93D]">Available Food Items</h2>
        {foodItems.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {foodItems.map((item) => (
              <div key={item._id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-3" />
                <h3 className="text-lg font-bold text-[#FF4C29]">{item.name}</h3>
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
    </div>
  );
}
