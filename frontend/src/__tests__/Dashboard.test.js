import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../pages/DashboardPage';
import tmdbApi from '../services/tmdbApi';

// Mock TMDB API
jest.mock('../services/tmdbApi');

describe('Dashboard Component', () => {
  const mockTrendingMovies = [
    {
      id: 1,
      title: 'Test Movie 1',
      overview: 'Test overview 1',
      vote_average: 8.5,
      release_date: '2023-01-01',
      poster_path: '/test1.jpg',
      backdrop_path: '/test1_backdrop.jpg'
    },
    {
      id: 2,
      title: 'Test Movie 2',
      overview: 'Test overview 2',
      vote_average: 7.2,
      release_date: '2023-02-01',
      poster_path: '/test2.jpg',
      backdrop_path: '/test2_backdrop.jpg'
    }
  ];

  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();
    
    // Mock TMDB API responses
    tmdbApi.getTrending.mockResolvedValue(mockTrendingMovies);
    tmdbApi.getTopRated.mockResolvedValue(mockTrendingMovies);
    tmdbApi.getActionMovies.mockResolvedValue(mockTrendingMovies);
    tmdbApi.getComedyMovies.mockResolvedValue(mockTrendingMovies);
    tmdbApi.getImageUrl.mockImplementation((path) => `https://image.tmdb.org/t/p/original${path}`);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders loading state initially', () => {
    localStorage.setItem('token', 'valid_token');
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));
    
    render(<Dashboard />);
    
    expect(screen.getByText('Loading Showmaxx...')).toBeInTheDocument();
  });

  test('redirects to login when not authenticated', () => {
    render(<Dashboard />);
    
    // Should redirect to login page
    expect(window.location.pathname).toBe('/login');
  });

  test('renders dashboard when authenticated', async () => {
    localStorage.setItem('token', 'valid_token');
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));
    
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Showmaxx...')).not.toBeInTheDocument();
      expect(screen.getByText('Showmaxx')).toBeInTheDocument();
      expect(screen.getByText('Trending This Week')).toBeInTheDocument();
      expect(screen.getByText('Top Rated')).toBeInTheDocument();
      expect(screen.getByText('Action Movies')).toBeInTheDocument();
      expect(screen.getByText('Comedy Movies')).toBeInTheDocument();
    });
  });

  test('calls TMDB API on mount', () => {
    localStorage.setItem('token', 'valid_token');
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));
    
    render(<Dashboard />);
    
    expect(tmdbApi.getTrending).toHaveBeenCalledTimes(1);
    expect(tmdbApi.getTopRated).toHaveBeenCalledTimes(1);
    expect(tmdbApi.getActionMovies).toHaveBeenCalledTimes(1);
    expect(tmdbApi.getComedyMovies).toHaveBeenCalledTimes(1);
  });

  test('renders navigation correctly', async () => {
    localStorage.setItem('token', 'valid_token');
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));
    
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Showmaxx')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Movies')).toBeInTheDocument();
      expect(screen.getByText('TV Shows')).toBeInTheDocument();
      expect(screen.getByText('My List')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });
  });

  test('logout functionality works', async () => {
    localStorage.setItem('token', 'valid_token');
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));
    
    render(<Dashboard />);
    
    await waitFor(() => {
      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);
    });
    
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
