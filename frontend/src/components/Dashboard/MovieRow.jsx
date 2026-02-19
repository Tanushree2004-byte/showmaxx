import React, { useState, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, fetchFunction, movies: propMovies }) => {
  const [movies, setMovies] = useState(propMovies || []);
  const [isLoading, setIsLoading] = useState(!propMovies);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!propMovies) {
      const fetchMovies = async () => {
        try {
          const movieData = await fetchFunction();
          setMovies(movieData);
          setIsLoading(false);
        } catch (error) {
          console.error(`Failed to fetch ${title}:`, error);
          setIsLoading(false);
        }
      };

      fetchMovies();
    }
  }, [title, fetchFunction, propMovies]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollBy({
      left: e.deltaY < 0 ? 300 : -300,
      behavior: 'smooth'
    });
  };

  if (isLoading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold text-white mb-6 px-6">{title}</h2>
        <div className="flex gap-4 px-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-white mb-6 px-6">{title}</h2>
      
      {/* Scroll Buttons */}
      <div className="flex justify-between items-center px-6 mb-4">
        <button
          onClick={() => scroll('left')}
          className="glass-button p-2 rounded-full transition-all duration-300"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 5 5 0 11-14 0 7 7 0 014 0z" />
          </svg>
        </button>
        
        <div className="text-white text-lg font-semibold">{title}</div>
        
        <button
          onClick={() => scroll('right')}
          className="glass-button p-2 rounded-full transition-all duration-300"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-5 5 5 0 11-14 0 7 7 0z" />
          </svg>
        </button>
      </div>

      {/* Movie Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-6 pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
        onWheel={handleWheel}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
