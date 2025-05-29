// src/services/authService.js
import api from "./api.js";

export const verifyOtp = ({ email, otp }) =>
  api.post("/auth/verify-otp", { email, otp });

export const resendOtp = (email) =>
  api.post("/auth/send-otp", { email });

export default {
  verifyOtp,
  resendOtp
};

