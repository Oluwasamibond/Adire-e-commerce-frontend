import React from "react";
import Loader from "./Loader";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ element }) {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return element;
}

export default ProtectedRoute;
