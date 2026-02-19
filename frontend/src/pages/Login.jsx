import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundCarousel from '../components/BackgroundCarousel';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', formData);
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      } else {
        setErrors({ 
          general: response.data.message || 'Login failed. Please try again.' 
        });
      }
    } catch (error) {
      setErrors({ 
        general: error.response?.data?.message || 'Login failed. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black">
      <BackgroundCarousel />
      
      <div className="relative z-10 w-full md:w-3/4 lg:w-1/2 min-w-[600px] px-6">
        <div className="glass-card p-12 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <h2 className="text-3xl font-bold text-white font-poppins tracking-wide text-glow mb-2">Showmaxx</h2>
            </div>
            <p className="text-gray-300 text-lg">Welcome back. Continue your journey.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="input-glass w-full text-lg"
              />
              {errors.username && <p className="error-text">{errors.username}</p>}
            </div>
            
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="input-glass w-full text-lg"
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>
            
            {errors.general && <p className="error-text text-center">{errors.general}</p>}
            
            <button
              type="submit"
              disabled={loading}
              className="primary-button w-full text-lg py-4 disabled:opacity-50 font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="text-center mt-8">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#E50914] hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
