import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useAuth();
  const { cartItems } = useCart();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5005/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Hide navbar on auth pages
  const hideNavbarRoutes = ['/login', '/register', '/forgotpassword'];
  if (hideNavbarRoutes.includes(location.pathname)) return null;

  return (
    <div className="fixed w-full bottom-0 md:top-0 md:bottom-auto z-50 bg-[#FF4C29] py-4 px-6 md:px-10 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-[#fdf6e3] font-bold text-xl md:text-2xl">QuickPlate</div>

        <div className="hidden md:flex gap-5 text-lg font-medium text-white">
          {user ? (
            <>
              <Link to="/dashboard">Home</Link>
              <Link to="/cart" className="relative">
                Cart
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-4 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </Link>
              <Link to="/orders">Orders</Link>
              <Link to="/profile">Profile</Link>

              {user.role === 'admin' && (
                <>
                  <Link to="/admin/dashboard">Admin</Link>
                  <Link to="/admin/foods">Foods</Link>
                  <Link to="/admin/orders">Admin Orders</Link>
                </>
              )}

              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Signup</Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-white">
          {user ? (
            <>
              <Link to="/dashboard">Home</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/orders">Orders</Link>
              <Link to="/profile">Profile</Link>

              {user.role === 'admin' && (
                <>
                  <Link to="/admin/dashboard">Admin</Link>
                  <Link to="/admin/foods">Foods</Link>
                  <Link to="/admin/orders">Admin Orders</Link>
                </>
              )}

              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Signup</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;



// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from "../context/CartContext";


// const Navbar = () => {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { user, setUser } = useAuth();
//   const { cartItems } = useCart();

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5005/api/auth/logout',{}, { withCredentials: true });
//       setUser(null);
//       navigate('/login');
//     } catch (err) {
//       console.error('Logout failed:', err);
//     }
//   };

  
  

//   return (
//     <div className="fixed w-full bottom-0 md:top-0 md:bottom-auto z-50 bg-[#FF4C29] py-4 px-6 md:px-10 shadow-md">
//       <div className="flex justify-between items-center">
//         <div className="text-[#fdf6e3] font-bold text-xl md:text-2xl">QuickPlate</div>

//         <div className="hidden md:flex gap-5 text-lg font-medium text-white">
//           {user ? (
//             <>
//               <Link to="/dashboard">Home</Link>
//              <Link to="/cart" className="relative">
//   Cart
//   {cartItems.length > 0 && (
//     <span className="absolute -top-2 -right-4 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full">
//       {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
//     </span>
//   )}
// </Link>

//               <Link to="/orders">Orders</Link>
//               <Link to="/profile">Profile</Link>
//               <button onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/login">Login</Link>
//               <Link to="/register">Signup</Link>
//             </>
//           )}
//         </div>

//         <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
//           {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//         </button>
//       </div>

//       {menuOpen && (
//         <div className="md:hidden mt-4 flex flex-col gap-4 text-white">
//           {user ? (
//             <>
//               <Link to="/dashboard">Home</Link>
//               <Link to="/cart">Cart</Link>
//               <Link to="/orders">Orders</Link>
//               <Link to="/profile">Profile</Link>
//               <button onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/login">Login</Link>
//               <Link to="/register">Signup</Link>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;