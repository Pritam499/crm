import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/api";
import Button from "../components/Shared/Button.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state.auth);

  const handleSubmit = async e => {
    e.preventDefault();
    const email = e.target.email.value;
    try {
      await auth.sendOtp({ email });  // <-- call API directly here
      navigate(`/verify-otp?email=${encodeURIComponent(email)}`, { replace: true });
    } catch {
      // handle error via selector or show inline here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-700 via-cyan-800 to-sky-800">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/20 text-white"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-sky-300 via-teal-300 to-purple-300 text-transparent bg-clip-text">
          Welcome to Qcrm
        </h2>

        <p className="text-sm text-center mb-6 opacity-80">
          Sign in to continue — powered by{" "}
          <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-400 bg-clip-text text-transparent font-semibold">
            SoftQubic
          </span>
        </p>

        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/80 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 mb-4"
          required
        />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 text-white font-semibold py-2 rounded-md hover:from-cyan-500 hover:to-indigo-500 transition"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending OTP..." : "Send OTP"}
        </Button>

        {status === "error" && (
          <p className="mt-4 text-red-300 text-sm text-center">{error}</p>
        )}
      </form>
    </div>
  );
}
