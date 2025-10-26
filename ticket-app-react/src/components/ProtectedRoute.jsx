// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

// notification instance
const notyf = new Notyf({duration:5000});

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      notyf.error("Your session has expired <br/> Please log in again.")
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;