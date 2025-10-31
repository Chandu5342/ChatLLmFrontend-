// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

/**
 * Simple protected route wrapper.
 * If user is not present, redirect to /login.
 * If loading, show a minimal loading placeholder.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div style={{padding:20}}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
