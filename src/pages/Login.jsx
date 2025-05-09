
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5005/api/auth/signin", formData, {
        withCredentials: true,
      });

      // if (res.data.status) {
      //   setIsAuthenticated(true); // ✅ Set global auth status
      //   navigate("/dashboard");
      // } else {
      //   setError(res.data.message);
      // }
      // if (res.data.status) {
      //   const user = res.data.user;
      //   setIsAuthenticated(true);
      
      //   if (user.role === "admin") {
      //     navigate("/admin/dashboard");
      //   } else {
      //     navigate("/dashboard");
      //   }
      // }

      if (res.data.status) {
        const userRes = await axios.get("http://localhost:5005/api/auth/dashboard", { withCredentials: true });
        setUser(userRes.data.user); // set user in context immediately
        setIsAuthenticated(true);
        
        if (userRes.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }
      
    } catch (err) {
      setError("Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5EB] dark:bg-gray-900 px-4 pt-0 md:pt-[80px] pb-[80px] md:pb-0">
      <div className="flex w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="w-1/2 relative hidden md:block">
          <img src="/assets/chefbro.svg" alt="Login Illustration" className="w-full max-w-sm" />
          <div className="absolute top-0 right-0 h-full">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-8 fill-[#FFF5EB] dark:fill-gray-800">
              <path d="M 0 0 Q 50 50 0 100 L 100 100 L 100 0 Z" />
            </svg>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-[#FF4C29] text-center mb-4">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-800 dark:text-white" required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-800 dark:text-white" required />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full py-2 bg-[#FF4C29] text-white rounded-lg">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
