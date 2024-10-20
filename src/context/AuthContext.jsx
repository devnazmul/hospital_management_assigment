// ===========================================
// #00128
// ===========================================

import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getUserByToken } from "../apis/auth/auth";
import CustomToaster from "../components/CustomToaster";
import { useNavigate } from "react-router-dom";

// Create the authentication context
export const AuthContext = createContext();

// Create the authentication provider component
export const AuthProvider = ({ children }) => {
  // State to store the token validity
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRouteChange, setIsRouteChange] = useState(Math.random());
  const setLogout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setIsAuthenticated(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isAuthenticated || token) {
      getUserByToken()
        .then((res) => {
          localStorage.setItem("userData", JSON.stringify(res?.data));
          localStorage.setItem("token", res?.token);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          setLogout();
          toast.custom((t) => (
            <CustomToaster
              t={t}
              type={"error"}
              text={`ID: 00128 - ${error?.response?.data?.message}`}
            />
          ));
        });
    } else {
      setLogout();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setLogout,
        setIsAuthenticated,
        setIsRouteChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
