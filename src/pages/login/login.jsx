import React,  { useState } from 'react'
import axios from 'axios';
import './login.css'
import {  Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom';



export const LoginScreen = () => {

  const [user, setUsername] = useState('');
  const [pwd, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validation for special characters in username
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(user)) {
      setError('Username can only contain letters, numbers, and underscores.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:1337/login', { user, pwd });
      console.log(response.data);
      // Handle successful login, e.g., redirect to dashboard
      const { accessToken, userId } = response.data;
      localStorage.setItem('accessToken', accessToken); // Store the access token in local storage
      localStorage.setItem('userId', userId); // Store the user ID in local storage
      window.location.href = '/dashboard'; // Redirect to the dashboard after successful login
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      setError('Invalid username or password');
    }
  };
  
  return (
    <div className='loginPage'>
  <h2 className='loginHeader'>Login</h2>
  {error && <p>{error}</p>}
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={user}
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={pwd}
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">Login</button>
  </form>
  <p>Don't have an account? <Link to="/register">Register</Link></p> {/* Link to the register page */}
</div>

  )
}
