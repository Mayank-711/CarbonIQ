import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import loginBackImage from '../Assets/images/loginback.jpg';
import API_BASE_URL from '../config';


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Login successful!' });
        
        // Save JWT token in local storage
        localStorage.setItem('token', result.access_token);

        // Redirect after login
        console.log('redirecting');
        navigate('/home');
      } else {
        setMessage({ type: 'error', text: result.error || 'Invalid credentials' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-fill bg-center"
      style={{ backgroundImage: `url(${loginBackImage})` }}
    >
      <div className="bg-[#F0FFF0] p-8 rounded-md shadow-lg w-full max-w-md opacity-90">
        <h2 className="text-center text-3xl font-bold text-[#2E8B57] mb-6">Login to CarbonIQ</h2>

        {message && (
          <div className={`p-3 mb-4 text-center rounded-md ${message.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-[#2E8B57] text-xl mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border-2 border-[#3CB371] rounded-md focus:outline-none focus:border-[#2E8B57]"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-[#2E8B57] text-xl mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-2 border-[#3CB371] rounded-md focus:outline-none focus:border-[#2E8B57]"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-3 text-[#3CB371] hover:text-[#2E8B57]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-[#3CB371] text-[#F0FFF0] font-bold text-xl rounded-md hover:bg-[#2E8B57] transition-colors"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-[#3CB371] text-lg">Don't have an account? </span>
          <a href="/signup" className="text-[#3CB371] hover:text-[#2E8B57] text-lg">
            Sign Up
          </a>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-[#3CB371] hover:text-[#2E8B57] text-lg">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
