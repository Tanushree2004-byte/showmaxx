import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthGuard from '../components/AuthGuard';

describe('AuthGuard Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('shows loading state initially', () => {
    render(<AuthGuard><div>Test Content</div></AuthGuard>);
    
    expect(screen.getByText('Verifying authentication...')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).not.toBeInTheDocument();
  });

  test('redirects to login when not authenticated', () => {
    render(<AuthGuard><div>Test Content</div></AuthGuard>);
    
    // Should show redirect message (simulated by Navigate component)
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  test('renders children when authenticated', () => {
    localStorage.setItem('token', 'valid_token');
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));
    
    render(<AuthGuard><div>Test Content</div></AuthGuard>);
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.queryByText('Verifying authentication...')).not.toBeInTheDocument();
  });

  test('handles expired token', () => {
    // Set expired token (exp in past)
    const expiredToken = btoa(JSON.stringify({ exp: Date.now() / 1000 - 3600 }));
    localStorage.setItem('token', expiredToken);
    
    render(<AuthGuard><div>Test Content</div></AuthGuard>);
    
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });
});
