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
import CheckoutPage from './component/CheckoutPage';
import OrderPage from './component/OrderPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';


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
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrderPage />} />

        
        {/* Admin Routes */}
        <Route path="/admin" element={user?.role === 'admin' ? <AdminLayout /> : <Navigate to="/login" />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="foods" element={<FoodList />} />
          <Route path="foods/new" element={<AddEditFood />} />
          <Route path="foods/edit/:id" element={<AddEditFood />} />
          <Route path="orders" element={<AdminOrdersPage />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
       <ToastContainer />
    </Router>
  );
}

export default App;

