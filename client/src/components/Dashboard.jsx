import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {userInfo?.name || 'User'} 👋</h1>
          <p className="text-sm text-gray-500 mt-2">Your fitness dashboard is ready!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 shadow-sm">
            <h2 className="text-lg font-semibold text-blue-800">Profile Info</h2>
            <ul className="mt-2 text-sm text-gray-600">
              <li><strong>Email:</strong> {userInfo?.email}</li>
              <li><strong>Weight:</strong> {userInfo?.weight || 'Not set'} kg</li>
              <li><strong>Goal Weight:</strong> {userInfo?.goal_weight || 'Not set'} kg</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-green-50 border border-green-200 shadow-sm">
            <h2 className="text-lg font-semibold text-green-800">Get Started</h2>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li>✅ Log your first meal</li>
              <li>✅ Set your activity level</li>
              <li>✅ View AI fitness plan (Pro users)</li>
            </ul>
            <button
              onClick={() => navigate('/log-meal')}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm"
            >
              Log Meal Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
