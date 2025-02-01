import React from 'react';
import { Link } from 'react-router-dom';

const Nav1 = () => {
  return (
    <nav className="bg-[#2E8B57] p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo slightly to the right */}
        <div className="text-white font-bold text-2xl ml-4">
          CarbonIQ
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="#" className="text-white hover:underline">Home</a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">About</a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">Services</a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">Contact</a>
          </li>
        </ul>

        {/* Login Button */}
        <Link to="/login">
          <button className="bg-white text-[#2E8B57] px-4 py-2 rounded-lg font-semibold hover:bg-[#90C8A0]">
            Login
          </button>
        </Link>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Nav1;
