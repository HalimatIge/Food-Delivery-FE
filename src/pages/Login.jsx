// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [submitError, setSubmitError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleBlur = (e) => {
//     setTouched({ ...touched, [e.target.name]: true });
//     if (!formData[e.target.name]) {
//       setErrors({
//         ...errors,
//         [e.target.name]: `${e.target.placeholder} is required`,
//       });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email) newErrors.email = "Email is required";
//     if (!formData.password) newErrors.password = "Password is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitError("");
//     if (!validateForm()) return;

//     try {
//       const response = await axios.post(
//         "http://localhost:5005/api/auth/signin",
//         formData,
//         { withCredentials: true } // to send cookies
//       );
//       if (response.data.status) {
//         navigate("/dashboard"); // or wherever your main app page is
//       } else {
//         setSubmitError(response.data.message);
//       }
//     } catch (err) {
//       setSubmitError("Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#FFF5EB] dark:bg-gray-900 transition-colors duration-300 px-4 py-10">
//       <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
//         {/* Illustration Section */}
//         <div className="hidden md:flex w-1/2 items-center justify-center p-6 bg-white dark:bg-gray-800">
//           <img
//             src="/assets/loginbro.svg"
//             alt="Login Illustration"
//             className="w-full max-w-sm"
//           />
//         </div>

//         {/* Spiral Divider */}
//         <div className="hidden md:flex">
//           <div className="relative w-[20px] flex justify-center items-center">
//             <div className="w-[2px] h-full bg-gray-300 dark:bg-yellow-400"></div>
//             <div className="absolute flex flex-col gap-4">
//               {[...Array(6)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="w-3 h-3 border-[2px] border-black dark:border-white rounded-full bg-white dark:bg-gray-800 -ml-1.5"
//                 ></div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Form Section */}
//         <div className="w-full md:w-1/2 p-8">
//           <h2 className="text-2xl font-bold text-[#FF4C29] dark:text-yellow-400 mb-6 text-center">
//             Welcome Back
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Email */}
//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className={`w-full px-4 py-2 rounded-lg border ${
//                   errors.email && touched.email
//                     ? "border-red-500"
//                     : "border-gray-300 dark:border-gray-700"
//                 } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF4C29]`}
//               />
//               {errors.email && touched.email && (
//                 <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className={`w-full px-4 py-2 rounded-lg border ${
//                   errors.password && touched.password
//                     ? "border-red-500"
//                     : "border-gray-300 dark:border-gray-700"
//                 } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF4C29]`}
//               />
//               {errors.password && touched.password && (
//                 <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//               )}
//             </div>

//             {submitError && (
//               <p className="text-red-500 text-sm text-center">{submitError}</p>
//             )}

//             <button
//               type="submit"
//               className="w-full py-2 bg-[#FF4C29] hover:bg-[#e03d1e] text-white font-semibold rounded-lg transition duration-200"
//             >
//               Login
//             </button>
//           </form>
//           <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
//             Don’t have an account?{" "}
//             <a
//               href="/register"
//               className="text-[#FF4C29] font-medium hover:underline"
//             >
//               Register
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


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

      if (res.data.status) {
        setIsAuthenticated(true); // ✅ Set global auth status
        navigate("/dashboard");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5EB] dark:bg-gray-900 px-4">
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
