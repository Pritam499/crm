// src/components/HomePage.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Welcome, {userInfo?.name}!</h1>
        <div className="space-y-4">
          <p className="text-center">Email: {userInfo?.email}</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;