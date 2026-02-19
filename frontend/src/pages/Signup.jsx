import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import BackgroundCarousel from '../components/BackgroundCarousel';

// Configure axios defaults
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    confirmPassword: ''
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
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select gender';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      // Use environment variable for API URL or fallback to localhost
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      
      // Ensure proper request format
      const requestData = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        gender: formData.gender,
        password: formData.password.trim()
      };
      
      const response = await axios.post(`${API_URL}/api/auth/signup`, requestData);
      
      if (response.data.success) {
        // Show success message and redirect to login
        alert('Account created successfully! Please login.');
        navigate('/login');
      } else {
        setErrors({ 
          general: response.data.message || 'Signup failed. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle different types of errors with proper status codes
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message;
        
        if (status === 400) {
          setErrors({ 
            general: message || 'Invalid input. Please check all fields.' 
          });
        } else if (status === 409) {
          setErrors({ 
            general: message || 'User already exists. Please try different credentials.' 
          });
        } else if (status === 500) {
          setErrors({ 
            general: 'Server error. Please try again later.' 
          });
        } else {
          setErrors({ 
            general: message || 'Signup failed. Please try again.' 
          });
        }
      } else if (error.request) {
        // Network error - server not reachable
        setErrors({ 
          general: 'Unable to connect to server. Please check your internet connection.' 
        });
      } else {
        // Other error
        setErrors({ 
          general: 'Signup failed. Please try again.' 
        });
      }
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
            <p className="text-gray-300 text-lg">Create your account to start streaming</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input-glass w-full text-lg"
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="input-glass w-full text-lg"
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>
            
            <div>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-glass w-full text-lg appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '20px',
                  paddingRight: '40px'
                }}
              >
                <option value="" className="bg-gray-800 text-white">Select Gender</option>
                <option value="male" className="bg-gray-800 text-white">Male</option>
                <option value="female" className="bg-gray-800 text-white">Female</option>
                <option value="other" className="bg-gray-800 text-white">Other</option>
              </select>
              {errors.gender && <p className="error-text">{errors.gender}</p>}
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
            
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="input-glass w-full text-lg"
              />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            </div>
            
            {errors.general && <p className="error-text text-center">{errors.general}</p>}
            
            <button
              type="submit"
              disabled={loading}
              className="primary-button w-full text-lg py-4 disabled:opacity-50 font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="text-center mt-8">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-[#E50914] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
