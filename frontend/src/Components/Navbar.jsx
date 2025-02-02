import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import baseProfileImage from '../assets/baseprofile.jpg'; // Assuming the image is in the src/assets folder

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the auth token
    navigate('/login');
  };

  return (
    <nav className="bg-[#2E8B57] text-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">CarbonIQ</h1>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <Link to="/home" className="text-white hover:text-[#3CB371] font-semibold transition">
            Home
          </Link>
          <Link to="/redeem" className="text-white hover:text-[#3CB371] font-semibold transition">
            Redeem
          </Link>
        </div>

        {/* Profile & Logout */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 text-white"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src={baseProfileImage} // Use the imported base profile image
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <ChevronDownIcon size={18} className="text-white" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black border border-gray-200 rounded-lg shadow-lg w-40">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm font-semibold text-black hover:bg-[#3CB371] hover:text-white transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-sm text-red-600 font-semibold text-left hover:bg-[#ffcccc] transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
