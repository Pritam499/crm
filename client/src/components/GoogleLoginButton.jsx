//   src/components/GoogleLoginButton.jsx

import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setUser, setError } from '../redux/userSlice';
import { authAPI } from '../services/api.js';

const GoogleLoginButton = ({ mode = 'login' }) => {
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await authAPI.googleAuth(tokenResponse.access_token);
        localStorage.setItem('token', res.data.token);
        dispatch(setUser(res.data));
      } catch (error) {
        dispatch(setError(error.response?.data?.message || 'Google Sign-in failed'));
      }
    },
    onError: () => dispatch(setError('Google Sign-in failed')),
    flow: 'implicit',
  });

  const buttonText = mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google';

  return (
    <button
      onClick={() => login()}
      className="w-full flex items-center justify-center gap-3 py-2 px-4 bg-white text-gray-800 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition duration-150"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="google"
        className="w-5 h-5"
      />
      <span className="text-sm font-medium">{buttonText}</span>
    </button>
  );
};

export default GoogleLoginButton;
