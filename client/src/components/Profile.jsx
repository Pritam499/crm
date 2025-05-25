import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../services/apis';
import { setUser, setLoading, setError } from '../redux/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: userInfo?.name || '',
    weight: '',
    height: '',
    goal_weight: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading());

    try {
      const token = localStorage.getItem('token');
      const res = await updateProfile(formData, token);
      dispatch(setUser(res.data)); // update Redux with new profile
      navigate('/dashboard'); // redirect to dashboard after profile complete
    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Profile update failed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white border border-gray-200">
        <div className="text-center mb-6">
          <img src="/src/assets/LogoGradient.png" alt="Logo" className="w-12 h-12 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
          <p className="text-sm text-gray-500 mt-1">This helps us personalize your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            type="number"
            name="weight"
            placeholder="Current Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
          />
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
          />
          <input
            type="number"
            name="goal_weight"
            placeholder="Goal Weight (kg)"
            value={formData.goal_weight}
            onChange={handleChange}
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
            {loading ? 'Updating...' : 'Save & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
