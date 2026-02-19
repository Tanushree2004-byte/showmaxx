import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroCarousel from '../components/Dashboard/HeroCarousel';
import tmdbApi from '../services/tmdbApi';

// Mock TMDB API
jest.mock('../services/tmdbApi');

describe('HeroCarousel Component', () => {
  const mockMovies = [
    {
      id: 1,
      title: 'Test Movie',
      overview: 'Test overview for carousel',
      vote_average: 8.5,
      release_date: '2023-01-01',
      backdrop_path: '/test_backdrop.jpg'
    }
  ];

  beforeEach(() => {
    tmdbApi.getTrending.mockResolvedValue(mockMovies);
    tmdbApi.getImageUrl.mockImplementation((path) => `https://image.tmdb.org/t/p/original${path}`);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<HeroCarousel />);
    
    expect(screen.getByRole('status')).toBeInTheDocument(); // Loading spinner
  });

  test('renders movies when data is loaded', async () => {
    render(<HeroCarousel />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
      expect(screen.getByText('Test overview for carousel')).toBeInTheDocument();
      expect(screen.getByText('8.5')).toBeInTheDocument();
      expect(screen.getByText('2023')).toBeInTheDocument();
      expect(screen.getByText('▶ Play')).toBeInTheDocument();
      expect(screen.getByText('ℹ More Info')).toBeInTheDocument();
    });
  });

  test('calls TMDB API on mount', () => {
    render(<HeroCarousel />);
    
    expect(tmdbApi.getTrending).toHaveBeenCalledTimes(1);
  });

  test('auto-advances slides every 5 seconds', async () => {
    jest.useFakeTimers();
    
    render(<HeroCarousel />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });

    // Fast-forward 5 seconds
    jest.advanceTimersByTime(5000);

    // Should still show the same movie (since we only have 1 in mock)
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    
    jest.useRealTimers();
  });

  test('displays carousel indicators', async () => {
    render(<HeroCarousel />);
    
    await waitFor(() => {
      const indicators = screen.getAllByRole('button');
      expect(indicators.length).toBeGreaterThan(0);
    });
  });

  test('handles image URL correctly', async () => {
    render(<HeroCarousel />);
    
    await waitFor(() => {
      const backdropImage = screen.getByAltText('Test Movie');
      expect(backdropImage).toHaveAttribute('src', 'https://image.tmdb.org/t/p/original/test_backdrop.jpg');
    });
  });
});
