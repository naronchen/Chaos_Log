import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './hooks/useUser';

const PrivateRoute = () => {
  const user = useUser();

  if (user === null) {
    // User is not authenticated, redirect to the signin page
    return <Navigate to="/" replace={true} />;
  }

  // User is authenticated, render the protected content
  return <Outlet />;
};

export default PrivateRoute;
