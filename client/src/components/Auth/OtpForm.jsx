// src/components/Auth/OtpForm.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, resendOtp } from "../../store/slices/authSlice.js";
import Button from "../Shared/Button.jsx";

export default function OtpForm({ email, onVerified, onEditEmail }) {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { status, error, token } = useSelector(s => s.auth);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(verifyOtp({ email, otp }))
      .unwrap()
      .then(() => onVerified?.())
      .catch(() => {});
  };

  const handleResend = () => {
    dispatch(resendOtp({ email }));
  };

  // If token already present, immediately call onVerified
  useEffect(() => {
    if (token && onVerified) {
      onVerified();
    }
  }, [token, onVerified]);

  return (
    <div className="space-y-4 p-6 bg-white rounded shadow w-full max-w-sm">
      <h2 className="text-2xl font-semibold">Verify OTP</h2>

      <p className="text-sm">Sent to: <strong>{email}</strong></p>
      <button
        onClick={onEditEmail}
        className="text-blue-600 text-xs hover:underline"
      >
        Edit email
      </button>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-3 py-2 border rounded"
          required
        />

        <div className="flex justify-between items-center">
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Verifying..." : "Verify"}
          </Button>
          <button
            type="button"
            onClick={handleResend}
            className="text-indigo-600 text-sm hover:underline"
            disabled={status === "loading"}
          >
            Resend OTP
          </button>
        </div>

        {status === "error" && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { verifyOtp } from "../../store/slices/authSlice";
// import { useNavigate } from "react-router-dom";
// import Button from "../Shared/Button";

// export default function OtpForm({ email }) {
//   const [otp, setOtp] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { status, error, token } = useSelector(state => state.auth);

//   const handleSubmit = e => {
//     e.preventDefault();
//     dispatch(verifyOtp({ email, otp }))
//       .unwrap()
//       .then(() => {
//         console.log("OTP verified successfully");
//         // Don't navigate here — let useEffect handle it
//       })
//       .catch(err => {
//         console.error("OTP verification failed:", err);
//       });
//   };

//   // ✅ Automatically navigate after token is set
//   useEffect(() => {
//     if (token) {
//       navigate("/dashboard");
//     }
//   }, [token, navigate]);

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-semibold">Enter OTP</h2>
//       <input
//         type="text"
//         value={otp}
//         onChange={e => setOtp(e.target.value)}
//         placeholder="Enter OTP"
//         className="w-full px-4 py-2 border rounded"
//         required
//       />
//       <Button type="submit">
//         {status === "loading" ? "Verifying..." : "Verify OTP"}
//       </Button>
//       {status === "error" && <p className="text-red-500">{error}</p>}
//     </form>
//   );
// }





// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { verifyOtp } from "../../store/slices/authSlice";
// import { useNavigate } from "react-router-dom";
// import Button from "../Shared/Button";

// export default function OtpForm({ email }) {
//   const [otp, setOtp] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { status, error, token } = useSelector(state => state.auth);

//   const handleSubmit = e => {
//     e.preventDefault();
//     dispatch(verifyOtp({ email, otp }))
//       .unwrap()
//       .catch(err => {
//         console.error("OTP verification failed:", err);
//       });
//   };

//   // Automatically navigate after token is set
//   useEffect(() => {
//     if (token) {
//       navigate("/dashboard");
//     }
//   }, [token, navigate]);

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-semibold">Enter OTP</h2>
//       <input
//         type="text"
//         value={otp}
//         onChange={e => setOtp(e.target.value)}
//         placeholder="Enter OTP"
//         className="w-full px-4 py-2 border rounded"
//         required
//       />
//       <Button type="submit">
//         {status === "loading" ? "Verifying..." : "Verify OTP"}
//       </Button>
//       {status === "error" && <p className="text-red-500">{error}</p>}
//     </form>
//   );
// }
