// src/components/Auth/LoginForm.jsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../store/slices/authSlice.js";
import Button from "../Shared/Button.jsx";

export default function LoginForm({ onOtpSent }) {
  const [email, setEmail] = useState("");
  const dispatch   = useDispatch();
  const { status, error } = useSelector(s => s.auth);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(sendOtp(email))
      .unwrap()
      .then(() => onOtpSent(email))
      .catch(() => {});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold">Login / Sign Up</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <Button type="submit">
        {status === "loading" ? "Sending..." : "Send OTP"}
      </Button>
      {status === "error" && <p className="text-red-500">{error}</p>}
    </form>
  );
}


// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { sendOtp } from "../../store/slices/authSlice.js";
// import Button from "../Shared/Button.jsx";

// export default function LoginForm({ onOtpSent }) {
//   const [email, setEmail] = useState("");
//   const dispatch = useDispatch();
//   const { status, error } = useSelector(state => state.auth);

// //   const handleSubmit = e => {
// //     e.preventDefault();
// //     dispatch(sendOtp(email))
// //       .unwrap()
// //       .then(() => onOtpSent(email))
// //       .catch(() => {}); // error shown via selector
// //   };

// const handleSubmit = e => {
//   e.preventDefault();
//   dispatch(sendOtp(email))
//     .unwrap()
//     .then(() => {
//       console.log("OTP sent successfully");  // ✅ Debug here
//       onOtpSent(email);
//     })
//     .catch(err => {
//       console.error("Failed to send OTP:", err);  // ✅ Better than silent fail
//     });
// };


//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-semibold">Login / Sign Up</h2>
//       <input
//         type="email"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         placeholder="Enter your email"
//         className="w-full px-4 py-2 border rounded"
//         required
//       />
//       {/* <Button type="submit">
//         {status === "loading" ? "Sending..." : "Send OTP"}
//       </Button> */}
// <Button
//   type="submit"
//   className="px-4 py-2 rounded font-medium bg-primary text-black hover:bg-primary/90"
// >
//   Send OTP
// </Button>


//       {status === "error" && <p className="text-red-500">{error}</p>}
//     </form>
//   );
// }
