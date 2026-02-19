import React from 'react';
import tmdbApi from '../../services/tmdbApi';
import { formatDate, formatRating, truncateText } from '../../utils/helpers';

const MovieCard = ({ movie }) => {
  const posterUrl = tmdbApi.getImageUrl(movie.poster_path);
  const rating = formatRating(movie.vote_average);
  const year = formatDate(movie.release_date);

  return (
    <div className="group relative flex-none cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105">
      {/* Movie Poster */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-[200px] h-[300px] object-cover transition-all duration-300 group-hover:brightness-110"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
              {movie.title}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-white text-xs font-medium">{rating}</span>
              </div>
              <span className="text-white text-xs">{year}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Info Below */}
      <div className="mt-3">
        <h4 className="text-white font-medium text-sm mb-1 line-clamp-1">
          {truncateText(movie.title, 20)}
        </h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-gray-400 text-xs">{rating}</span>
          </div>
          <span className="text-gray-500 text-xs">{year}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
