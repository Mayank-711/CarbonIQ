import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2E8B57] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col justify-center items-center">
        {/* Logo and Copy */}
        <div className="text-2xl font-bold">
          CarbonIQ
        </div>

        <p className="text-sm mt-4 md:mt-0">
          © {new Date().getFullYear()} CarbonIQ. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
