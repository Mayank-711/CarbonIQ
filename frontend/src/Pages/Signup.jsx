import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure to install react-router-dom if not already done
import signupBackImage from '../Assets/images/loginback.jpg'; // Import the image for signup background

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${signupBackImage})` }} // Use imported background image
    >
      {/* Signup Form */}
      <div className="bg-[#F0FFF0] p-6 rounded-md shadow-lg w-full max-w-md opacity-90">
        <h2 className="text-center text-2xl font-bold text-[#2E8B57] mb-4">Sign Up for CarbonIQ</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
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
          
          {/* Email Field */}
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

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="block text-[#2E8B57] text-lg mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
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
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="block text-[#2E8B57] text-lg mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
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
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-[#3CB371] text-[#F0FFF0] font-bold text-lg rounded-md hover:bg-[#2E8B57] transition-colors"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? Login Link */}
        <div className="mt-3 text-center">
          <span className="text-[#3CB371] text-lg">Already have an account? </span>
          <a href="/login" className="text-[#3CB371] hover:text-[#2E8B57] text-lg">
            Login
          </a>
        </div>

        {/* Back to Home Link */}
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
