// src/components/Auth/OtpForm.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, resendOtp } from "../../store/slices/authSlice";

export default function OtpForm({ email: initialEmail, onVerified, onEditEmail }) {
  const dispatch = useDispatch();
  const [email] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [errorMessage, setErrorMessage] = useState("");

  const loading = useSelector((state) => state.auth.status === "loading");

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!otp.trim()) {
      setErrorMessage("OTP is required");
      return;
    }

    try {
      const result = await dispatch(verifyOtp({ email, otp })).unwrap();
      if (result) onVerified();
    } catch (error) {
      setErrorMessage(error || "Invalid OTP");
    }
  };

  const handleResend = async () => {
    setErrorMessage("");
    try {
      await dispatch(resendOtp(email)).unwrap();
      setTimer(60);
    } catch (error) {
      setErrorMessage(error || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-800 px-4">
      <form
        onSubmit={handleVerify}
        className="max-w-md w-full bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/20 text-white"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-sky-300 via-teal-300 to-purple-300 text-transparent bg-clip-text">
          Verify Your OTP
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="email"
            value={email}
            readOnly
            className="flex-1 px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none"
          />
          <button
            type="button"
            onClick={onEditEmail}
            className="text-sm text-cyan-300 hover:underline"
          >
            Edit
          </button>
        </div>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-4 py-3 mb-4 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300"
          required
        />

        {errorMessage && (
          <p className="text-red-400 text-sm mb-4">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mb-4 bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 rounded-md hover:from-green-500 hover:to-cyan-500 transition disabled:opacity-50"
        >
          {loading ? "Verifying…" : "Verify OTP"}
        </button>

        <div className="text-center text-sm">
          {timer > 0 ? (
            <span className="text-white/70">
              Resend OTP in <strong>{timer}</strong>s
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-cyan-300 hover:underline"
              disabled={loading}
            >
              Resend OTP
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
