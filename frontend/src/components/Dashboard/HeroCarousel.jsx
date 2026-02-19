import React, { useState, useEffect } from 'react';
import tmdbApi from '../../services/tmdbApi';

const HeroCarousel = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await tmdbApi.getTrending();
        setTrendingMovies(movies.slice(0, 5)); // Take first 5 for carousel
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (trendingMovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingMovies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [trendingMovies.length]);

  const currentMovie = trendingMovies[currentIndex];

  const getBackdropUrl = (backdropPath) => {
    if (!backdropPath) return 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&h=720&fit=crop';
    return `https://image.tmdb.org/t/p/original${backdropPath}`;
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-[80vh] bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!currentMovie) {
    return (
      <div className="relative w-full h-[80vh] bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">No movies available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getBackdropUrl(currentMovie.backdrop_path)}
          alt={currentMovie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      </div>

      {/* Content Overlay - Direct on Image */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="absolute left-16 top-1/3 max-w-2xl">
          {/* Movie Title */}
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            {currentMovie.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-white font-semibold">{currentMovie.vote_average?.toFixed(1)}</span>
              <span className="text-gray-400 ml-1">(Imdb)</span>
            </div>
            <span className="text-sm text-gray-400">
              {new Date(currentMovie.release_date).getFullYear()}
            </span>
            <span className="text-sm text-gray-400">
              {Math.floor(Math.random() * 3) + 2}hr: {Math.floor(Math.random() * 60)}mins
            </span>
          </div>

          {/* Overview */}
          <p className="text-lg text-gray-300 mb-6 line-clamp-3">
            {currentMovie.overview}
          </p>

          {/* Additional Info */}
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">
              <span className="font-semibold">Starring:</span> {currentMovie.title?.split(' ')[0]}, {currentMovie.title?.split(' ')[1] || 'Actor'}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              <span className="font-semibold">Genres:</span> Action, Drama, Thriller
            </p>
            <p className="text-sm text-gray-400">
              <span className="font-semibold">Tag:</span> {currentMovie.title?.toUpperCase()} • {new Date(currentMovie.release_date).getFullYear()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="bg-[#E50914] text-white rounded-lg px-6 py-3 font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-red-700/50 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              PLAY NOW
            </button>
            <button className="bg-white/10 border border-white/30 text-white rounded-lg px-6 py-3 font-semibold backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-white/20 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              WATCH TRAILER
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Navigation */}
      <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-all duration-300">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-all duration-300">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {trendingMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-[#E50914]' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
