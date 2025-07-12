// // src/pages/Profile.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { toast } from "react-toastify";

// const Profile = () => {
//   const { user, setUser } = useAuth();
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   useEffect(() => {
//     if (user) {
//       setForm(prev => ({
//         ...prev,
//         name: user.name || "",
//         phone: user.phone || "",
//       }));
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const validatePassword = (password) => {
//     return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (form.newPassword && !validatePassword(form.newPassword)) {
//       return toast.error("New password must be at least 8 characters and include 1 capital, 1 number, and 1 special character.");
//     }

//     if (form.newPassword && form.newPassword !== form.confirmPassword) {
//       return toast.error("Passwords do not match");
//     }

//     try {
//       const res = await axios.put(
//         "http://localhost:5005/api/user/update-profile",
//         {
//           name: form.name,
//           phone: form.phone,
//           currentPassword: form.currentPassword,
//           newPassword: form.newPassword,
//         },
//         { withCredentials: true }
//       );

//       toast.success("Profile updated successfully");
//       setUser(res.data.user);
//       setForm(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Update failed");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">

//         <div>
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label>Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <hr className="my-4" />

//         <div>
//           <label>Current Password</label>
//           <input
//             type="password"
//             name="currentPassword"
//             value={form.currentPassword}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label>New Password</label>
//           <input
//             type="password"
//             name="newPassword"
//             value={form.newPassword}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label>Confirm New Password</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={form.confirmPassword}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <button className="bg-[#FF4C29] text-white px-4 py-2 rounded" type="submit">
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;

// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const ProfilePage = () => {
//   const { user, setUser } = useAuth();
//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     phone: user?.phone || '',
//     currentPassword: '',
//     newPassword: '',
//     showPasswordFields: false,
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const togglePasswordFields = () => {
//     setFormData((prev) => ({
//       ...prev,
//       currentPassword: '',
//       newPassword: '',
//       showPasswordFields: !prev.showPasswordFields,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.put(
//         'http://localhost:5005/api/user/update-profile',
//         formData,
//         { withCredentials: true }
//       );

//       toast.success(res.data.message);
//       setUser(res.data.user);
//       setFormData((prev) => ({
//         ...prev,
//         currentPassword: '',
//         newPassword: '',
//       }));
//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || 'Failed to update profile'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Profile</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Phone</label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Email</label>
//           <input
//             type="email"
//             value={user?.email}
//             disabled
//             className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 text-gray-500"
//           />
//         </div>

//         <button
//           type="button"
//           onClick={togglePasswordFields}
//           className="text-blue-600 hover:underline text-sm"
//         >
//           {formData.showPasswordFields ? 'Cancel password change' : 'Change password'}
//         </button>

//         {formData.showPasswordFields && (
//           <>
//             <div>
//               <label className="block text-sm font-medium">Current Password</label>
//               <input
//                 type="password"
//                 name="currentPassword"
//                 value={formData.currentPassword}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">New Password</label>
//               <input
//                 type="password"
//                 name="newPassword"
//                 value={formData.newPassword}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//               />
//             </div>
//           </>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-[#FF4C29] text-white py-2 rounded hover:bg-orange-600"
//         >
//           {loading ? 'Updating...' : 'Update Profile'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit, FiSave, FiX } from "react-icons/fi";

export default function UserProfile() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.put(
        "http://localhost:5005/api/auth/update-profile",
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        setUser(res.data.user);
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
      } else {
        setError(res.data.message || "Failed to update profile");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5EB] to-[#FFE4D6] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-32 bg-gradient-to-r from-[#FF7B54] to-[#FF4C29]">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white flex items-center justify-center overflow-hidden">
                {user?.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUser className="h-16 w-16 text-[#FF4C29]" />
                )}
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {isEditing ? "Edit Profile" : "My Profile"}
              </h1>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center text-[#FF4C29] hover:text-[#FF7B54] transition-colors"
                >
                  <FiEdit className="mr-2" /> Edit
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center text-gray-500 hover:text-gray-700"
                  >
                    <FiX className="mr-1" /> Cancel
                  </button>
                </div>
              )}
            </div>

            {success && (
              <div className="mb-6 rounded-md bg-green-50 p-4">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-green-800">{success}</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 rounded-md bg-red-50 p-4">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-800">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* First Name */}
                <div>
                  <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="firstname"
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        isEditing ? "border-gray-300" : "border-transparent bg-gray-50"
                      } focus:ring-2 focus:ring-[#FF4C29] focus:border-transparent transition-all duration-200`}
                      required
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="lastname"
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        isEditing ? "border-gray-300" : "border-transparent bg-gray-50"
                      } focus:ring-2 focus:ring-[#FF4C29] focus:border-transparent transition-all duration-200`}
                      required
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        isEditing ? "border-gray-300" : "border-transparent bg-gray-50"
                      } focus:ring-2 focus:ring-[#FF4C29] focus:border-transparent transition-all duration-200`}
                      required
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        isEditing ? "border-gray-300" : "border-transparent bg-gray-50"
                      } focus:ring-2 focus:ring-[#FF4C29] focus:border-transparent transition-all duration-200`}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                      <FiMapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        isEditing ? "border-gray-300" : "border-transparent bg-gray-50"
                      } focus:ring-2 focus:ring-[#FF4C29] focus:border-transparent transition-all duration-200`}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`py-3 px-6 rounded-lg bg-gradient-to-r from-[#FF4C29] to-[#FF7B54] text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center ${
                      loading ? "opacity-75" : ""
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-2" /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>

            {/* Order History Section */}
            <div className="mt-12">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600 text-center py-8">
                  {user?.orders?.length > 0 
                    ? "Display order history here..." 
                    : "You haven't placed any orders yet."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}