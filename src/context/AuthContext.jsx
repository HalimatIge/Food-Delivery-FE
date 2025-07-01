// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [authLoading, setAuthLoading] = useState(true);

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get("http://localhost:5005/api/auth/dashboard", {
//         withCredentials: true,
//       });
//       if (res.data.status) {
//         setUser(res.data.user);
//       } else {
//         setUser(null);
//       }
//     } catch (err) {
//       setUser(null);
//     } finally {
//       setAuthLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, authLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5005/api/auth/dashboard", {
          withCredentials: true,
        });
        if (res.data.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    await axios.post("http://localhost:5005/api/auth/logout", {}, { withCredentials: true });
    // Clear auth state (if using Context or Redux)
    setUser(null); // or dispatch logout action

    // Redirect to login or home
    navigate('/login');
   if (err) {
    console.error('Logout failed', err);
  }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, authLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
