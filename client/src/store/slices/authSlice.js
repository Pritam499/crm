// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api"; // ✅ Import default API instance

// Thunks
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/verify-otp", { email, otp });
      localStorage.setItem("token", response.data.token);
      return response.data.token;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Invalid OTP");
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (email, { rejectWithValue }) => {
    try {
      await API.post("/auth/resend-otp", { email });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to resend OTP");
    }
  }
);

export const checkSession = createAsyncThunk(
  "auth/checkSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/auth/me");
      return response.data;
    } catch {
      return rejectWithValue();
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    status: "idle",
    user: null,
    error: null,
  },
  reducers: {
    logoutUser(state) {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(resendOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(checkSession.pending, (state) => {
        state.status = "checking";
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "authenticated";
      })
      .addCase(checkSession.rejected, (state) => {
        state.token = null;
        state.user = null;
        state.status = "unauthenticated";
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
