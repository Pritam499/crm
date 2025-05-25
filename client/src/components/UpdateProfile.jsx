import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setError, setLoading } from '../redux/userSlice';

const UpdateProfile = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: userInfo?.name || '',
    age: '',
    weight: '',
    height: '',
    goal_weight: '',
    gender: '',
    activity_level: '',
    fitness_goal: '',
    diet_preference: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(setLoading());
    try {
      const res = await axios.patch(
        'http://localhost:3001/api/auth/profile',
        form,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        }
      );
      dispatch(setUser({ ...userInfo, ...res.data.user }));
      navigate('/dashboard');
    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Profile update failed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full max-w-2xl p-8 rounded-2xl shadow-xl bg-white border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(form).map(([key, value]) => (
            <input
              key={key}
              name={key}
              placeholder={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              value={value}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 text-sm"
            />
          ))}

          <button
            type="submit"
            className="col-span-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
