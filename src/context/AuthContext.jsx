// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5005/api/auth/dashboard");
      setUser(res.data.user);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          await axios.get("http://localhost:5005/api/auth/refresh");
          const res = await axios.get("http://localhost:5005/api/auth/dashboard");
          setUser(res.data.user);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
