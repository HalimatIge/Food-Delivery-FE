import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiChevronLeft } from "react-icons/fi";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState("email"); // "email" | "otp" | "form"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const sendOtp = async () => {
    try {
      setLoading(true);
      setError("");
      await axios.post("http://localhost:5005/api/auth/send-otp", { email });
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      setError("");
      const otpCode = otp.join('');
      await axios.post("http://localhost:5005/api/auth/verify-otp", { email, otp: otpCode });
      setStep("form");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");
      const otpCode = otp.join('');
      const res = await axios.post("http://localhost:5005/api/auth/register", {
        ...formData,
        email,
        otp: otpCode,
      });

      if (res.data.status) {
        navigate("/login", { state: { registrationSuccess: true } });
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (step === "otp") {
      setStep("email");
    } else if (step === "form") {
      setStep("otp");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF5EB] to-[#FFE4D6] dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 px-4 py-10">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden w-full max-w-md">
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#FF4C29] dark:bg-yellow-400 flex items-center justify-center mb-4">
              <FiUser className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-[#FF4C29] dark:text-yellow-400 mb-2">
              {step === "email" ? "Start Registration" 
               : step === "otp" ? "Verify Email" 
               : "Complete Profile"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {step === "email" ? "Enter your email to begin" 
               : step === "otp" ? "Enter the OTP sent to your email" 
               : "Fill in your details to complete registration"}
            </p>
          </div>

          {step === "email" && (
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF4C29] dark:focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <button
                onClick={sendOtp}
                disabled={loading || !email}
                className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#FF4C29] to-[#FF7B54] dark:from-yellow-500 dark:to-yellow-600 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center ${
                  loading || !email ? "opacity-75" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </button>
            </div>
          )}

          {step === "otp" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Enter 6-digit OTP sent to {email}
                </label>
                <div className="flex justify-between space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      className="w-12 h-12 text-center text-2xl border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF4C29] dark:focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-transparent"
                      pattern="\d*"
                      inputMode="numeric"
                      required
                    />
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={goBack}
                  className="flex-1 py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center"
                >
                  <FiChevronLeft className="mr-2" /> Back
                </button>
                <button
                  onClick={verifyOtp}
                  disabled={loading || otp.some(d => d === "")}
                  className={`flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-[#FF4C29] to-[#FF7B54] dark:from-yellow-500 dark:to-yellow-600 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center ${
                    loading || otp.some(d => d === "") ? "opacity-75" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
            </div>
          )}

          {step === "form" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                      placeholder="First Name"
                      value={formData.firstname}
                      onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF4C29] dark:focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                      placeholder="Last Name"
                      value={formData.lastname}
                      onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF4C29] dark:focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF4C29] dark:focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={goBack}
                  className="flex-1 py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center"
                >
                  <FiChevronLeft className="mr-2" /> Back
                </button>
                <button
                  onClick={handleRegister}
                  disabled={loading || !formData.firstname || !formData.lastname || !formData.password}
                  className={`flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-[#FF4C29] to-[#FF7B54] dark:from-yellow-500 dark:to-yellow-600 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center ${
                    loading || !formData.firstname || !formData.lastname || !formData.password ? "opacity-75" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registering...
                    </>
                  ) : (
                    'Register Now'
                  )}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 mt-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#FF4C29] dark:text-yellow-400 hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const RegisterPage = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState("email"); // "email" | "otp" | "form"
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const sendOtp = async () => {
//     try {
//       setLoading(true);
//       await axios.post("http://localhost:5005/api/auth/send-otp", { email });
//       setStep("otp");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOtp = () => {
//     setStep("form");
//   };

//   const handleRegister = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:5005/api/auth/register", {
//         ...formData,
//         email,
//         otp,
//       });

//       if (res.data.status) {
//         navigate("/login");
//       } else {
//         setError(res.data.message);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto mt-20 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Create an Account</h2>

//       {step === "email" && (
//         <>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//               setError("");
//             }}
//             className="w-full border p-2 mb-4 rounded"
//           />
//           <button
//             className="w-full bg-[#FF4C29] text-white p-2 rounded"
//             onClick={sendOtp}
//             disabled={loading}
//           >
//             {loading ? "Sending OTP..." : "Send OTP"}
//           </button>
//         </>
//       )}

//       {step === "otp" && (
//         <>
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => {
//               setOtp(e.target.value);
//               setError("");
//             }}
//             className="w-full border p-2 mb-4 rounded"
//           />
//           <button
//             className="w-full bg-[#FF4C29] text-white p-2 rounded"
//             onClick={verifyOtp}
//           >
//             Continue
//           </button>
//         </>
//       )}

//       {step === "form" && (
//         <>
//           <input
//             type="text"
//             placeholder="First Name"
//             value={formData.firstname}
//             onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
//             className="w-full border p-2 mb-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={formData.lastname}
//             onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
//             className="w-full border p-2 mb-2 rounded"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             className="w-full border p-2 mb-2 rounded"
//           />
//           <button
//             className="w-full bg-[#FF4C29] text-white p-2 rounded"
//             onClick={handleRegister}
//             disabled={loading}
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </>
//       )}

//       {error && <p className="text-red-500 mt-3">{error}</p>}
//     </div>
//   );
// };

// export default RegisterPage;

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

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
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Clear error when user types
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched({ ...touched, [name]: true });
    
//     // Validate on blur
//     if (!value.trim()) {
//       setErrors({
//         ...errors,
//         [name]: `${e.target.placeholder} is required`,
//       });
//     } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//       setErrors({
//         ...errors,
//         [name]: "Please enter a valid email address",
//       });
//     } else if (name === "password" && value.length < 6) {
//       setErrors({
//         ...errors,
//         [name]: "Password must be at least 6 characters",
//       });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.firstname.trim()) newErrors.firstname = "First Name is required";
//     if (!formData.lastname.trim()) newErrors.lastname = "Last Name is required";
    
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }
    
//     if (!formData.password.trim()) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitError("");
    
//     if (!validateForm()) return;
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:5005/api/auth/register",
//         formData
//       );
      
//       if (response.data.status) {
//         navigate("/login", { state: { registrationSuccess: true } });
//       } else {
//         setSubmitError(response.data.message || "Registration failed");
//       }
//     } catch (err) {
//       setSubmitError(
//         err.response?.data?.message || 
//         "Something went wrong. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF5EB] to-[#FFE4D6] dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 px-4 py-10">
//       <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
//         {/* Illustration Section */}
//         <div className="hidden md:flex w-1/2 items-center justify-center p-8 bg-gradient-to-br from-[#FF4C29] to-[#FF7B54] relative overflow-hidden">
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white"></div>
//             <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white"></div>
//           </div>
//           <div className="relative z-10 text-center">
//             <img
//               src="/assets/chefbro.svg"
//               alt="Register Illustration"
//               className="w-full max-w-xs mx-auto mb-8 transform hover:scale-105 transition-transform duration-500"
//             />
//             <h3 className="text-2xl font-bold text-white mb-2">Join Our Community</h3>
//             <p className="text-white opacity-90">Start your culinary journey with us today</p>
//           </div>
//         </div>

//         {/* Form Section */}
//         <div className="w-full md:w-1/2 p-8 md:p-10">
//           <div className="text-center mb-8">
//             <div className="mx-auto w-16 h-16 rounded-full bg-[#FF4C29] dark:bg-yellow-400 flex items-center justify-center mb-4">
//               <FiUser className="h-6 w-6 text-white" />
//             </div>
//             <h2 className="text-3xl font-bold text-[#FF4C29] dark:text-yellow-400 mb-2">
//               Create an Account
//             </h2>
//             <p className="text-gray-600 dark:text-gray-300">
//               Fill in your details to get started
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* First Name */}
//               <div>
//                 <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   First Name
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiUser className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="firstname"
//                     type="text"
//                     name="firstname"
//                     placeholder="First Name"
//                     value={formData.firstname}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
//                       errors.firstname && touched.firstname
//                         ? "border-red-500 focus:ring-red-500"
//                         : "border-gray-300 dark:border-gray-600 focus:ring-[#FF4C29] dark:focus:ring-yellow-400"
//                     } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
//                   />
//                 </div>
//                 {errors.firstname && touched.firstname && (
//                   <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
//                 )}
//               </div>

//               {/* Last Name */}
//               <div>
//                 <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Last Name
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiUser className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="lastname"
//                     type="text"
//                     name="lastname"
//                     placeholder="Last Name"
//                     value={formData.lastname}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
//                       errors.lastname && touched.lastname
//                         ? "border-red-500 focus:ring-red-500"
//                         : "border-gray-300 dark:border-gray-600 focus:ring-[#FF4C29] dark:focus:ring-yellow-400"
//                     } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
//                   />
//                 </div>
//                 {errors.lastname && touched.lastname && (
//                   <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
//                 )}
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Email
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiMail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email"
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
//                     errors.email && touched.email
//                       ? "border-red-500 focus:ring-red-500"
//                       : "border-gray-300 dark:border-gray-600 focus:ring-[#FF4C29] dark:focus:ring-yellow-400"
//                   } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
//                 />
//               </div>
//               {errors.email && touched.email && (
//                 <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiLock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
//                     errors.password && touched.password
//                       ? "border-red-500 focus:ring-red-500"
//                       : "border-gray-300 dark:border-gray-600 focus:ring-[#FF4C29] dark:focus:ring-yellow-400"
//                   } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                   ) : (
//                     <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                   )}
//                 </button>
//               </div>
//               {errors.password && touched.password && (
//                 <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//               )}
//             </div>

//             {submitError && (
//               <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
//                 <div className="flex items-center">
//                   <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                   <p className="text-red-700 dark:text-red-300">{submitError}</p>
//                 </div>
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#FF4C29] to-[#FF7B54] dark:from-yellow-500 dark:to-yellow-600 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center ${
//                 isLoading ? "opacity-75" : ""
//               }`}
//             >
//               {isLoading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Creating Account...
//                 </>
//               ) : (
//                 'Register Now'
//               )}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="font-medium text-[#FF4C29] dark:text-yellow-400 hover:underline"
//               >
//                 Login here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }