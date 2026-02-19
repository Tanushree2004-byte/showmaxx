import React, { useState, useEffect, useRef } from 'react';
import tmdbApi from '../../services/tmdbApi';
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
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-[200px] h-[300px] bg-gray-800 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between px-6 mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => scroll('left')}
            className="glass-button p-2 rounded-full transition-all duration-300 transform hover:scale-110"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="glass-button p-2 rounded-full transition-all duration-300 transform hover:scale-110"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div
        ref={scrollContainerRef}
        className="flex gap-4 px-6 overflow-x-auto scrollbar-hide scroll-smooth"
        onWheel={handleWheel}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: 'none'
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
