// src/pages/VerifyOtpPage.jsx
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import OtpForm from "../components/Auth/OtpForm.jsx";

export default function VerifyOtpPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const navigate = useNavigate();

  // Redirect back if no email in URL
  useEffect(() => {
    if (!email) {
      navigate("/login-signup", { replace: true });
    }
  }, [email]);

  const handleVerified = () => {
    // *** URL changes here: ***
    navigate("/dashboard", { replace: true });
  };

  const handleEditEmail = () => {
    navigate("/login-signup", { replace: true });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <OtpForm
        email={email}
        onVerified={handleVerified}
        onEditEmail={handleEditEmail}
      />
    </div>
  );
}



// // src/pages/VerifyOtpPage.jsx
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import OtpForm from "../components/Auth/OtpForm.jsx";

// export default function VerifyOtpPage() {
//   const { state } = useLocation();
//   const email = state?.email;
//   const navigate = useNavigate();

//   if (!email) {
//     navigate("/login-signup", { replace: true });
//     return null;
//   }

//   const handleVerified = () => {
//     navigate("/dashboard", { replace: true });
//   };

//   const handleEditEmail = () => {
//     navigate("/login-signup", { replace: true });
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-blue-100">
//       <OtpForm
//         email={email}
//         onVerified={handleVerified}
//         onEditEmail={handleEditEmail}
//       />
//     </div>
//   );
// }
