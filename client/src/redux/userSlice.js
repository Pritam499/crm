import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

try {
  const storedUserInfo = localStorage.getItem('userInfo');
  if (storedUserInfo) {
    initialState.userInfo = JSON.parse(storedUserInfo);
  }
} catch (error) {
  console.error('Error reading from localStorage', error);
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
      state.error = null;
      try {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      } catch (error) {
        console.error('Error writing to localStorage', error);
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.userInfo = null;
      try {
        localStorage.removeItem('userInfo');
      } catch (error) {
        console.error('Error removing from localStorage', error);
      }
    },
  },
});

export const { setLoading, setUser, setError, logout } = userSlice.actions;

export default userSlice.reducer;
