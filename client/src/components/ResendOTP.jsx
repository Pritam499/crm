import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resendOtp } from '../services/apis';

const ResendOTP = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: '', error: '' });

    try {
      const res = await resendOtp({ email: userInfo.email });
      setStatus({ loading: false, success: res.data.message || 'OTP resent successfully!', error: '' });

      setTimeout(() => navigate('/verify-otp'), 2000);
    } catch (err) {
      setStatus({
        loading: false,
        success: '',
        error: err.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white border border-gray-200">
        <div className="text-center mb-6">
          <img src="/src/assets/LogoGradient.png" alt="Logo" className="w-12 h-12 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900">Resend OTP</h1>
          <p className="text-sm text-gray-500 mt-1">Resend OTP to <strong>{userInfo?.email}</strong></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {status.error && <p className="text-sm text-red-500">{status.error}</p>}
          {status.success && <p className="text-sm text-green-600">{status.success}</p>}

          <button
            type="submit"
            disabled={status.loading}
            className={`w-full py-2 text-white rounded-md text-sm transition ${
              status.loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {status.loading ? 'Resending...' : 'Resend OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResendOTP;
