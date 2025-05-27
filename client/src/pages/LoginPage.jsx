// src/pages/LoginPage.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../store/slices/authSlice.js";
import Button from "../components/Shared/Button.jsx";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state.auth);

  const handleSubmit = async e => {
    e.preventDefault();
    const email = e.target.email.value;
    try {
      await dispatch(sendOtp(email)).unwrap();
      // *** URL changes here: ***
      navigate(`/verify-otp?email=${encodeURIComponent(email)}`, { replace: true });
    } catch {
      // error is shown via selector
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-24 p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-semibold mb-4">Login / Sign Up</h2>

      <input
        name="email"
        type="email"
        placeholder="you@example.com"
        className="w-full px-4 py-2 border rounded mb-4"
        required
      />

      <Button type="submit" className="w-full">
        {status === "loading" ? "Sending OTP..." : "Send OTP"}
      </Button>

      {status === "error" && <p className="mt-2 text-red-500">{error}</p>}
    </form>
  );
}



// src/pages/LoginPage.jsx
// import React, { useState } from "react";
// import LoginForm from "../components/Auth/LoginForm.jsx";
// import OtpForm from "../components/Auth/OtpForm.jsx";

// export default function LoginPage() {
//   const [step, setStep] = useState("login");
//   const [email, setEmail] = useState("");

//   const handleEmailSubmit = submittedEmail => {
//     setEmail(submittedEmail);
//     setStep("verify");
//   };

//   const handleBackToLogin = () => {
//     setEmail("");
//     setStep("login");
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-blue-200">
//       {step === "login" && <LoginForm onOtpSent={handleEmailSubmit} />}
//       {step === "verify" && (
//         <OtpForm email={email} onEditEmail={handleBackToLogin} />
//       )}
//     </div>
//   );
// }

