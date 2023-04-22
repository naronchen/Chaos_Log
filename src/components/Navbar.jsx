// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import './Navbar.css'; // Import the CSS file
import { supabase } from '../client';



function Navbar({ children }) {
    const handleLogout = async () => {
        await supabase.auth.signOut();
      };
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/tasks">Tasks</Link>
        </li>
        <li>
            <Link to="/agent">AI Agent</Link>
        </li>
        <li>
            <Link onClick={handleLogout} to="/">LogOut</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
