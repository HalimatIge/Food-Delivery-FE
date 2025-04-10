
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function RegisterPage() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [submitError, setSubmitError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//     // Clear error as user types
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleBlur = (e) => {
//     setTouched({ ...touched, [e.target.name]: true });

//     // Validate the field on blur
//     if (!formData[e.target.name]) {
//       setErrors({ ...errors, [e.target.name]: `${e.target.placeholder} is required` });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.firstname) newErrors.firstname = "First Name is required";
//     if (!formData.lastname) newErrors.lastname = "Last Name is required";
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
//       const response = await axios.post("http://localhost:5005/api/auth/register", formData);
//       if (response.data.status) {
//         navigate("/login");
//       } else {
//         setSubmitError(response.data.message);
//       }
//     } catch (err) {
//       setSubmitError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#FFF5EB] dark:bg-gray-900 transition-colors duration-300 px-4 py-10">
//       <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
//         {/* Illustration Section */}
//         <div className="hidden md:flex border-r-4 border-[#FF4C29] dark:border-yellow-400 w-1/2 items-center justify-center p-6">
//           <img
//             src="/assets/chefbro.svg"
//             alt="Register Illustration"
//             className="w-full max-w-sm"
//           />
//         </div>

//         {/* Form Section */}
//         <div className="w-full md:w-1/2 p-8">
//           <h2 className="text-2xl font-bold text-[#FF4C29] dark:text-yellow-400 mb-6 text-center">
//             Create an Account
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* First Name */}
//             <div>
//               <input
//                 type="text"
//                 name="firstname"
//                 placeholder="First Name"
//                 value={formData.firstname}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className={`w-full px-4 py-2 rounded-lg border ${
//                   errors.firstname && touched.firstname
//                     ? "border-red-500"
//                     : "border-gray-300 dark:border-gray-700"
//                 } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF4C29]`}
//               />
//               {errors.firstname && touched.firstname && (
//                 <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
//               )}
//             </div>

//             {/* Last Name */}
//             <div>
//               <input
//                 type="text"
//                 name="lastname"
//                 placeholder="Last Name"
//                 value={formData.lastname}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className={`w-full px-4 py-2 rounded-lg border ${
//                   errors.lastname && touched.lastname
//                     ? "border-red-500"
//                     : "border-gray-300 dark:border-gray-700"
//                 } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF4C29]`}
//               />
//               {errors.lastname && touched.lastname && (
//                 <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
//               )}
//             </div>

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

//             {submitError && <p className="text-red-500 text-sm text-center">{submitError}</p>}

//             <button
//               type="submit"
//               className="w-full py-2 bg-[#FF4C29] hover:bg-[#e03d1e] text-white font-semibold rounded-lg transition duration-200"
//             >
//               Register
//             </button>
//           </form>
//           <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
//             Already have an account?{" "}
//             <a href="/login" className="text-[#FF4C29] font-medium hover:underline">
//               Login
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

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
    if (!formData[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: `${e.target.placeholder} is required`,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First Name is required";
    if (!formData.lastname) newErrors.lastname = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:5005/api/auth/register",
        formData
      );
      if (response.data.status) {
        navigate("/login");
      } else {
        setSubmitError(response.data.message);
      }
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5EB] dark:bg-gray-900 transition-colors duration-300 px-4 py-10">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
        {/* Illustration Section */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-6 bg-white dark:bg-gray-800">
          <img
            src="/assets/chefbro.svg"
            alt="Register Illustration"
            className="w-full max-w-sm"
          />
        </div>

        {/* Spiral Divider */}
        <div className="hidden md:flex">
          <div className="relative w-[20px] flex justify-center items-center">
            <div className="w-[2px] h-full bg-gray-300 dark:bg-yellow-400"></div>
            <div className="absolute flex flex-col gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 border-[2px] border-black dark:border-white rounded-full bg-white dark:bg-gray-800 -ml-1.5"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-[#FF4C29] dark:text-yellow-400 mb-6 text-center">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.firstname && touched.firstname
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF4C29]`}
              />
              {errors.firstname && touched.firstname && (
                <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.lastname && touched.lastname
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF4C29]`}
              />
              {errors.lastname && touched.lastname && (
                <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.email && touched.email
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF4C29]`}
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.password && touched.password
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF4C29]`}
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {submitError && (
              <p className="text-red-500 text-sm text-center">{submitError}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-[#FF4C29] hover:bg-[#e03d1e] text-white font-semibold rounded-lg transition duration-200"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#FF4C29] font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
