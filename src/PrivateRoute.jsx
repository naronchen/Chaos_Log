import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from './client';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const user = supabase.auth.getSession();
      // console.log('user: ', user);

      if ((await user).data.session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
