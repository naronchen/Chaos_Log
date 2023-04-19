// components/LogoutButton/LogoutButton.js
import React from 'react';
import { supabase } from '../client';

const LogoutButton = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
