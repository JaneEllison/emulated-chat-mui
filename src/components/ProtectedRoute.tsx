import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from "../store/authStore.ts";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthorized = useAuthStore(store => store.isAuthorized)

  if (!isAuthorized) {
    return <Navigate to='/' />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
