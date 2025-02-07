import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav2 = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    // Redirect to login page after logout
    navigate("/login");
  };

  return (
    <nav className="bg-[#2E8B57] text-[#F0FFF0] p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <span className="hover:text-[#F5FFFA]">CarbonIQ</span>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link
            to="/home"
            className="hover:text-[#F5FFFA] text-lg font-medium transition duration-200"
          >
            Home
          </Link>
          
          <Link
            to="/analyse"
            className="hover:text-[#F5FFFA] text-lg font-medium transition duration-200"
          >
            Analyse
          </Link>
          <Link
            to="/profile"
            className="hover:text-[#F5FFFA] text-lg font-medium transition duration-200"
          >
            Profile
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-[#3CB371] hover:bg-[#66CDAA] text-[#F0FFF0] font-bold px-4 py-2 rounded-lg transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Nav2;
