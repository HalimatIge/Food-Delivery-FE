import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './component/Navbar';
import CartPage from './component/CartPage';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import FoodList from './pages/admin/FoodList';
import AddEditFood from './pages/admin/AddEditFood';
import NotFound from './pages/Notfound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';


function App() {
  const { user, authLoading } = useAuth();

  if (authLoading) return <div>Loading...</div>;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/cart" element={<CartPage />} />

        
        {/* Admin Routes */}
        <Route path="/admin" element={user?.role === 'admin' ? <AdminLayout /> : <Navigate to="/login" />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="foods" element={<FoodList />} />
          <Route path="foods/new" element={<AddEditFood />} />
          <Route path="foods/edit/:id" element={<AddEditFood />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
       <ToastContainer />
    </Router>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./component/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import NotFound from "./pages/Notfound";
// import AdminDashboard from "./pages/Admin";
// import { useAuth } from "./context/AuthContext";
// import Home from "./pages/Home";
// import FoodList from "./pages/admin/FoodList";
// import AddEditFood from "./pages/admin/AddEditFood";

// function App() {
//   const { user, authLoading } = useAuth();
  
//   if (authLoading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <Router>
//       <Navbar />
      
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"} />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        
//         {/* Admin Routes */}
//         <Route path="/admin/dashboard" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
//         <Route path="/admin/foods" element={user?.role === "admin" ? <FoodList /> : <Navigate to="/login" />} />
//         <Route path="/admin/foods/new" element={user?.role === "admin" ? <AddEditFood /> : <Navigate to="/login" />} />
//         <Route path="/admin/foods/edit/:id" element={user?.role === "admin" ? <AddEditFood /> : <Navigate to="/login" />} />
        
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Navbar from "./component/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import NotFound from "./pages/Notfound";
// import AdminDashboard from "./pages/Admin";
// import { useAuth } from "./context/AuthContext";
// import  Home  from "./pages/Home";

// function App() {
//   const { user, authLoading } = useAuth();
  
//   if (authLoading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <Router>
//       <Navbar />
      
//       <Routes>
//       <Route path="/" element={<Home />} />
//         <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"} />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
//         <Route path="/admin/dashboard" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
