import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Nav1 = () => {
  return (
    <nav className='bg-[#2E8B57] bg-opacity-0 p-4 flex justify-between items-center z-50 mix-blend-overlay'>
      <div className='text-[#F0FFF0] text-2xl font-bold'>CarbonIQ</div>
      <Link to="/login">
        <button className='bg-[#8FBC8F] text-[#F0FFF0] py-2 px-4 rounded hover:bg-[#3CB371]'>
          Login
        </button>
      </Link>
    </nav>
  );
};

export default Nav1;