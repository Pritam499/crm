// // // src/components/VerifyOTP.jsx

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '../services/apis';
import { setUser, setLoading, setError } from '../redux/userSlice';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const { userInfo, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading());

    try {
      const res = await verifyOtp({ email: userInfo.email, otp });
      dispatch(setUser(res.data.user)); // update user data from backend
      localStorage.setItem('token', res.data.token); // save JWT
      navigate('/'); // redirect to homepage
    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Invalid OTP or Email'));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   dispatch(setLoading());
  
  //   try {
  //     const res = await verifyOtp({ email: userInfo.email, otp });
  //     dispatch(setUser(res.data.user));
  //     localStorage.setItem('token', res.data.token);
  
  //     // ✅ Conditionally redirect
  //     const hasProfile = user.name && user.name.trim() !== '';
  //     navigate(hasProfile ? '/dashboard' : '/profile');
  //   } catch (err) {
  //     dispatch(setError(err.response?.data?.message || 'Invalid OTP or Email'));
  //   }
  // };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white border border-gray-200">
        <div className="text-center mb-6">
          <img src="/src/assets/LogoGradient.png" alt="Logo" className="w-12 h-12 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900">Verify OTP</h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter the OTP sent to <strong>{userInfo?.email}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-md text-sm transition ${
              loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className="text-sm text-center mt-6 text-gray-600">
          Didn’t get OTP?{' '}
          <a href="/resend-otp" className="text-blue-600 hover:underline">
            Resend
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;


// src/components/VerifyOTP.jsx

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { verifyOtp } from '../services/apis';
// import { setUser, setLoading, setError } from '../redux/userSlice';

// const VerifyOTP = () => {
//   const [otp, setOtp] = useState('');
//   const { userInfo, loading, error } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(setLoading());

//     try {
//       const res = await verifyOtp({ email: userInfo.email, otp });
//       const user = res.data.user;

//       dispatch(setUser(user));
//       localStorage.setItem('token', res.data.token);

//       // 🌟 Conditional redirect
//       if (!user.name || user.name.trim() === '') {
//         navigate('/profile'); // new user → go to profile update
//       } else {
//         navigate('/dashboard'); // returning user → dashboard
//       }
//     } catch (err) {
//       dispatch(setError(err.response?.data?.message || 'Invalid OTP or Email'));
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
//       <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white border border-gray-200">
//         <div className="text-center mb-6">
//           <img src="/src/assets/LogoGradient.png" alt="Logo" className="w-12 h-12 mx-auto" />
//           <h1 className="text-2xl font-bold text-gray-900">Verify OTP</h1>
//           <p className="text-sm text-gray-500 mt-1">Enter the OTP sent to <strong>{userInfo?.email}</strong></p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
//           />
//           {error && <p className="text-sm text-red-500">{error}</p>}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 text-white rounded-md text-sm transition ${
//               loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {loading ? 'Verifying...' : 'Verify OTP'}
//           </button>
//         </form>
//         <div className="text-sm text-center mt-6 text-gray-600">
//           Didn’t get OTP?{' '}
//           <a href="/resend-otp" className="text-blue-600 hover:underline">Resend</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyOTP;
