import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Intro = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const cinematicBanners = [
    'https://images.unsplash.com/photo-1489599807961-c79686cb15c2?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cinematicBanners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [cinematicBanners.length]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* Cinematic Background Carousel */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
        {cinematicBanners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={banner}
              alt={`Cinematic banner ${index + 1}`}
              className="w-full h-full object-cover blur-sm"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>

      <Navbar />
      
      {/* Center Content - Directly Over Background */}
      <div className="relative z-10 text-center px-6 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <h1 className="text-7xl font-bold text-white font-poppins tracking-wide text-glow mb-6 drop-shadow-2xl">
            ShowMaxx
          </h1>
        </div>
        
        {/* Tagline */}
        <p className="text-gray-300 text-2xl mb-10 font-inter font-light drop-shadow-lg">
          Watch movies and TV shows anytime, anywhere.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link 
            to="/signup"
            className="bg-[#E50914] text-white text-xl px-10 py-4 w-full sm:w-auto rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-red-700/50"
          >
            Get Started
          </Link>
          
          <Link 
            to="/login"
            className="bg-transparent text-white text-xl px-10 py-4 w-full sm:w-auto rounded-lg font-semibold border-2 border-white/30 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-white/10"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Intro;
