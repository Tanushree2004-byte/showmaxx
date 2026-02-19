import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundCarousel from '../components/BackgroundCarousel';
import axios from 'axios';

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
    
    try {
      const { confirmPassword, ...signupData } = formData;
      const response = await axios.post('http://localhost:5000/api/auth/signup', signupData);
      
      if (response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      setErrors({ 
        general: error.response?.data?.message || 'Signup failed. Please try again.' 
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
                className="input-glass w-full text-lg"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
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
