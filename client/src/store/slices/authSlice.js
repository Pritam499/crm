// src/store/slices/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../services/apis.js";

// existing thunks…
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email, thunkAPI) => {
    try {
      await auth.sendOtp({ email });
      return { email };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "OTP send failed");
    }
  }
);

// src/store/slices/authSlice.js
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, thunkAPI) => {
    const res = await auth.verifyOtp({ email, otp });
    const token = res.data.token;              // token from backend
    localStorage.setItem("token", token);     // store it HERE
    return { email, token };
  }
);


// ← NEW: resendOtp thunk
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (email, thunkAPI) => {
    try {
      await auth.resendOtp({ email });
      return { email };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "OTP resend failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    await auth.logout();                     // POST /auth/logout
    localStorage.removeItem("token");        // remove stored token
    return true;
  }
);


// NEW: checkSession
export const checkSession = createAsyncThunk(
  "auth/checkSession",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token");
    try {
      await auth.me();           // GET /api/auth/me
      return token;
    } catch (err) {
      localStorage.removeItem("token");
      return thunkAPI.rejectWithValue("Session expired");
    }
  }
);

const token = localStorage.getItem("token");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    token: token || null,
    status: "idle",     // idle|loading|otpSent|authenticated|checking|error
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // … other thunks …
      .addCase(checkSession.pending, state => {
        state.status = "checking";
      })
      .addCase(checkSession.fulfilled, (state, { payload }) => {
        state.status = "authenticated";
        state.token = payload;
      })
      .addCase(checkSession.rejected, state => {
        state.status = "idle";
        state.token = null;
      });
  }
});

export default authSlice.reducer;