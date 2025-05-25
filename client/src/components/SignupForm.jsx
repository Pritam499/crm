// src/components/SignupForm.jsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading, setUser, setError } from '../redux/userSlice';
import GoogleLoginButton from './GoogleLoginButton';
import { sendOtp } from '../services/apis';

const SignupForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading());
    try {
      const res = await sendOtp(formData); // sendOtp API from apis.js
      dispatch(setUser({ email: formData.email, name: formData.name })); // store name & email in Redux
      navigate('/verify-otp'); // redirect to verify OTP page
    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Signup failed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white border border-gray-200">
        <div className="text-center mb-6">
          <img src="/src/assets/LogoGradient.png" alt="Logo" className="w-12 h-12 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1">Start your journey with us</p>
        </div>

        <div className="mb-6">
          <GoogleLoginButton mode="signup" />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-400">or sign up with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white rounded-md text-sm transition ${
                loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Sending OTP...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
