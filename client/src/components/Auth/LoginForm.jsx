// src/pages/LoginSignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api"; // ✅ Updated to use API directly

export default function LoginSignupPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage("Email is required");
      return;
    }

    try {
      setLoading(true);
      await API.post("/auth/send-otp", { email: trimmedEmail }); // ✅ direct API usage
      navigate(`/verify-otp?email=${encodeURIComponent(trimmedEmail)}`);
    } catch (err) {
      const msg = err.response?.data?.message || "Error sending OTP";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm w-full bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/20 text-white"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-sky-300 via-teal-300 to-purple-300 text-transparent bg-clip-text">
          Login via Email
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 mb-4 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          required
        />

        {errorMessage && (
          <p className="text-red-400 text-sm mb-4 text-center">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-sky-600 to-sky-500 rounded-md text-white font-semibold hover:from-sky-700 hover:to-sky-600 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
