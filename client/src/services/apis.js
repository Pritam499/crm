// src/services/apis.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const sendOtp = (data) => API.post('/auth/send-otp', data);
export const verifyOtp = (data) => API.post('/auth/verify-otp', data);
export const resendOtp = (data) => API.post('/auth/resend-otp', data);
export const updateProfile = (data, token) => 
  API.patch('/profile/update', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const googleAuth = (token) => API.post('/auth/google', { token });