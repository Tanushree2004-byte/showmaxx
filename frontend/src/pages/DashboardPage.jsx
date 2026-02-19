import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tmdbApi from '../services/tmdbApi';
import HeroCarousel from '../components/Dashboard/HeroCarousel';
import MovieRow from '../components/Dashboard/MovieRow';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      navigate('/login');
      return;
    }

    const fetchAllMovies = async () => {
      try {
        const [trending] = await Promise.all([
          tmdbApi.getTrending(),
          tmdbApi.getTopRated(),
          tmdbApi.getActionMovies(),
          tmdbApi.getComedyMovies()
        ]);

        setTrendingMovies(trending);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        setIsLoading(false);
      }
    };

    fetchAllMovies();
  }, [isAuthenticated, authLoading, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-white text-lg">Loading Showmaxx...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md transition-all duration-300" id="navbar">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-white text-2xl font-bold font-poppins tracking-wide text-glow">Showmaxx</h1>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#home" className="text-white hover:text-[#E50914] transition-colors duration-300 relative group font-medium">
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E50914] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#movies" className="text-white hover:text-[#E50914] transition-colors duration-300 relative group font-medium">
                  Movies
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E50914] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#tvshows" className="text-white hover:text-[#E50914] transition-colors duration-300 relative group font-medium">
                  TV Shows
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E50914] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#mylist" className="text-white hover:text-[#E50914] transition-colors duration-300 relative group font-medium">
                  My List
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E50914] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <button className="glass-button p-2 rounded-full transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 014 0z" />
                </svg>
              </button>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">U</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-white hover:text-[#E50914] transition-colors duration-300 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Movie Rows */}
      <div className="mt-8">
        <MovieRow title="Trending This Week" movies={trendingMovies} />
        <MovieRow title="Top Rated" fetchFunction={tmdbApi.getTopRated} />
        <MovieRow title="Action Movies" fetchFunction={tmdbApi.getActionMovies} />
        <MovieRow title="Comedy Movies" fetchFunction={tmdbApi.getComedyMovies} />
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 glass-button p-3 rounded-full transition-all duration-300 transform hover:scale-110 z-40"
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default Dashboard;
