import React from 'react';

const Profile = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Your Profile</h1>

      {/* Profile Information */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src="https://via.placeholder.com/150?text=Profile"
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-[#2E8B57]"
          />
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-600">Email: johndoe@example.com</p>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <h3 className="text-lg font-semibold mb-4">Account Details</h3>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Username:</span>
            <span className="text-gray-700">johndoe</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Joined On:</span>
            <span className="text-gray-700">January 2023</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
