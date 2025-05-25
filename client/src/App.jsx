// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignupForm from './components/SignupForm';
import VerifyOTP from './components/VerifyOTP';
import ResendOTP from './components/ResendOTP';
import UpdateProfile from './components/UpdateProfile';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

        {/* Auth flow routes */}
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/resend-otp" element={<ResendOTP />} />
        <Route path="/update-profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />

        {/* Fallback route */}
        <Route path="*" element={<SignupForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
