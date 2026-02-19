import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm transition-all duration-300" id="navbar">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-white text-2xl font-bold font-poppins tracking-wide text-glow">ShowMaxx</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/login" 
              className="text-white hover:text-[#E50914] transition-colors duration-300 relative group font-medium"
            >
              Login
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E50914] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
