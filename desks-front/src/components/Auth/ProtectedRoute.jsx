import React from "react";
import { Navigate } from "react-router-dom";
import verifyToken from "../../utils/verifyToken";

const ProtectedRoute = ({ children, ...rest }) => {
    if (!verifyToken().isAuthenticated) return <Navigate to="/login" replace />;
    return children;
};

export default ProtectedRoute;
