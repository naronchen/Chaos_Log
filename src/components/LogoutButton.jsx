// components/LogoutButton/LogoutButton.js
import React from 'react';
import { supabase } from '../client';

const LogoutButton = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div onClick={handleLogout}>
      Logout
    </div>
  );
};

export default LogoutButton;
