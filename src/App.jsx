// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from "./pages/Login";
// import Register from './pages/Register';
// import Home from './pages/Home';
// import NotFound from './pages/Notfound';
// import Dashboard from './pages/Dashboard';
// import ProtectedRoute from './utils/ProtectedRoute';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Check if user is authenticated on app load
//   useEffect(() => {
//     axios.get("http://localhost:5005/api/auth/dashboard", { withCredentials: true })
//       .then(res => {
//         if (res.data.status) {
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//         }
//       })
//       .catch(() => {
//         setIsAuthenticated(false);
//       });
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={
//           <ProtectedRoute isAuthenticated={isAuthenticated}>
//             <Dashboard />
//           </ProtectedRoute>
//         } />
//         <Route path="**" element={<NotFound/>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
// import other pages...

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Optional: auto-check auth on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:5005/api/auth/me', { withCredentials: true });
        setIsAuthenticated(res.data.status);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
