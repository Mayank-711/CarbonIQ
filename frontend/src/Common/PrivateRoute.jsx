import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1]; // Extract payload part
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Token decoding failed:", error);
    return null;
  }
};

const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decodedToken = decodeToken(token);
    if (!decodedToken) return false;

    const currentTime = Date.now() / 1000;
    if (decodedToken.exp <= currentTime) {
      console.warn("Token has expired, logging out.");
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
