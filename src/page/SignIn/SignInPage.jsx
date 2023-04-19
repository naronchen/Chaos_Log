import React, { useState } from "react";
import './SignInPage.css'
import { supabase } from '../../client';

function SignInPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Add logic for authentication here
    if (isSigningUp) {
      // Sign up
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) {
        console.log("Error signing up:", error.message);
      } else {
        console.log(user)
        console.log("User signed up!");
      }
    } else {
      // Sign in
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        console.log("Error signing in:", error.message);
      } else {
        console.log("User signed in!");
      }
    }
  
    // Clear form fields
    setUsername("");
    setEmail("");
    setPassword("");
  
    // Redirect to main page
    // window.location.href = "/main";
  };
  

  const toggleSignInUp = () => {
    setIsSigningUp(!isSigningUp);
  };

  return (
    <div>
      <h1 className="gradient">Chaos Log</h1>
      <form onSubmit={handleSubmit}>
        {isSigningUp && (
          <label>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </label>
        )}
        <label>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <label>
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <button type="submit">{isSigningUp ? "Sign Up" : "Sign In"}</button>
      </form>
      <p>
        {isSigningUp
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <button onClick={toggleSignInUp}>
          {isSigningUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}

export default SignInPage;
