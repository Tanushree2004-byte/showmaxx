import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-3">
            <h1 className="text-4xl font-bold font-poppins tracking-wide text-glow">ShowMaxx</h1>
          </div>
          <button
            onClick={handleLogout}
            className="glass-button text-white px-6 py-2 rounded-lg font-medium"
          >
            Logout
          </button>
        </div>
        
        <div className="glass-card p-8 max-w-2xl mx-auto text-center backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome back, {user?.username || 'ShowMaxx Viewer'}! 🎬
          </h2>
          <p className="text-gray-300 mb-6">
            Your premium streaming experience awaits. Explore our vast collection of movies and series.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <div className="w-12 h-12 bg-[#E50914] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Movies</h3>
              <p className="text-gray-400 text-sm">Thousands of blockbuster movies</p>
            </div>
            
            <div className="glass-card p-6">
              <div className="w-12 h-12 bg-[#E50914] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Series</h3>
              <p className="text-gray-400 text-sm">Binge-worthy original series</p>
            </div>
            
            <div className="glass-card p-6">
              <div className="w-12 h-12 bg-[#E50914] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">My List</h3>
              <p className="text-gray-400 text-sm">Your personal watchlist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
