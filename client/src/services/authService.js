// src/services/authService.js

import api from "./api.js";

export default {
  sendOtp: (email) => api.post("/auth/send-otp", { email }),
  verifyOtp: ({ email, otp }) => api.post("/auth/verify-otp", { email, otp })
};
