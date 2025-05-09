import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5005/api/auth/logout', {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUser(null); // clear context
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="fixed w-full bottom-0 md:top-0 md:bottom-auto z-50 bg-[#FF4C29] border-t md:border-b py-4 px-6 md:px-10 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-[#fdf6e3] font-bold text-xl md:text-2xl">QuickPlate</div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-5 md:gap-10 text-[#333333] text-lg font-medium">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:underline">Home</Link>
              <Link to="/cart" className="hover:underline">Cart</Link>
              <Link to="/orders" className="hover:underline">Orders</Link>
              <Link to="/profile" className="hover:underline">Profile</Link>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Signup</Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} color="#333" /> : <FaBars size={24} color="#333" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-[#333333] text-lg font-medium">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:underline">Home</Link>
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:underline">Cart</Link>
              <Link to="/orders" onClick={() => setMenuOpen(false)} className="hover:underline">Orders</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:underline">Profile</Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:underline">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="hover:underline">Signup</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
