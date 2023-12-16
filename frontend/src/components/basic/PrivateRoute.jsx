import { Navigate } from "react-router-dom";
import React from "react";
import { isAuthenticated } from "../../utils/auth";

const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/logowanie" />;
  }
  return children;
};
export default PrivateRoute;
