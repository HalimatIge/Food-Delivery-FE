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

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    showPasswordFields: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordFields = () => {
    setFormData((prev) => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      showPasswordFields: !prev.showPasswordFields,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        'http://localhost:5005/api/user/update-profile',
        formData,
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setUser(res.data.user);
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
      }));
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to update profile'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={user?.email}
            disabled
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 text-gray-500"
          />
        </div>

        <button
          type="button"
          onClick={togglePasswordFields}
          className="text-blue-600 hover:underline text-sm"
        >
          {formData.showPasswordFields ? 'Cancel password change' : 'Change password'}
        </button>

        {formData.showPasswordFields && (
          <>
            <div>
              <label className="block text-sm font-medium">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FF4C29] text-white py-2 rounded hover:bg-orange-600"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;

