import axios from 'axios';
import { mockMovies } from './mockData';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '59ea933655599758d63240276c2a0d4e';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

export const tmdbApi = {
  // Get trending movies for the week
  getTrending: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trending/movie/week`, {
        params: {
          api_key: API_KEY,
          language: 'en-US'
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching trending movies, using mock data:', error);
      return mockMovies.trending;
    }
  },

  // Get top rated movies
  getTopRated: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movie/top_rated`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          page: 1
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching top rated movies, using mock data:', error);
      return mockMovies.topRated;
    }
  },

  // Get action movies (genre 28)
  getActionMovies: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          with_genres: 28,
          sort_by: 'popularity.desc',
          page: 1
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching action movies, using mock data:', error);
      return mockMovies.action;
    }
  },

  // Get comedy movies (genre 35)
  getComedyMovies: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          with_genres: 35,
          sort_by: 'popularity.desc',
          page: 1
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching comedy movies, using mock data:', error);
      return mockMovies.comedy;
    }
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
          language: 'en-US'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  // Get image URL
  getImageUrl: (path) => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}${path}`;
  }
};

export default tmdbApi;
