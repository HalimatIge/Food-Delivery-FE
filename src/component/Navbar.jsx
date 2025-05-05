import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5005/api/auth/logout', {}, { withCredentials: true });
      setIsAuthenticated(false);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className='border w-full h-20 md:py-6 md:px-10 px-5 py-6 bg-[#FF4C29] flex justify-between'>
      <div className='text-[#fdf6e3] font-bold text-2xl'>QuickPlate</div>

      <div className='gap-5 md:gap-10 flex text-[#333333] text-xl font-medium'>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="font-medium hover:underline">Home</Link>
            <Link to="/cart" className="font-medium hover:underline">Cart</Link>
            <Link to="/orders" className="font-medium hover:underline">Orders</Link>
            <button onClick={handleLogout} className="font-medium hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="font-medium hover:underline">Login</Link>
            <Link to="/register" className="font-medium hover:underline">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
