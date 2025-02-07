import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import signupBackImage from '../Assets/images/loginback.jpg';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      email,
      password,
      confirmPassword,
    };

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Signup successful! Welcome to CarbonIQ.');
        setIsError(false);

        // Clear form fields after successful signup
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setMessage(result.error || 'Something went wrong!');
        setIsError(true);
      }
    } catch (error) {
      setMessage('Network error. Please try again later.');
      setIsError(true);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-fill bg-center"
      style={{ backgroundImage: `url(${signupBackImage})` }}
    >
      {/* Signup Form */}
      <div className="bg-[#F0FFF0] p-6 rounded-md shadow-lg w-full max-w-md opacity-90">
        <h2 className="text-center text-2xl font-bold text-[#2E8B57] mb-4">Sign Up for CarbonIQ</h2>

        {/* Display Message */}
        {message && (
          <div
            className={`mb-4 p-2 text-center rounded-md ${
              isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="block text-[#2E8B57] text-lg mb-1">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border-2 border-[#3CB371] rounded-md focus:outline-none focus:border-[#2E8B57]"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="block text-[#2E8B57] text-lg mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border-2 border-[#3CB371] rounded-md focus:outline-none focus:border-[#2E8B57]"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="block text-[#2E8B57] text-lg mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border-2 border-[#3CB371] rounded-md focus:outline-none focus:border-[#2E8B57]"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-3 text-[#3CB371] hover:text-[#2E8B57]"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="block text-[#2E8B57] text-lg mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border-2 border-[#3CB371] rounded-md focus:outline-none focus:border-[#2E8B57]"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute right-3 top-3 text-[#3CB371] hover:text-[#2E8B57]"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-[#3CB371] text-[#F0FFF0] font-bold text-lg rounded-md hover:bg-[#2E8B57] transition-colors"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-3 text-center">
          <span className="text-[#3CB371] text-lg">Already have an account? </span>
          <a href="/login" className="text-[#3CB371] hover:text-[#2E8B57] text-lg">
            Login
          </a>
        </div>

        <div className="mt-3 text-center">
          <Link to="/" className="text-[#3CB371] hover:text-[#2E8B57] text-lg">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
