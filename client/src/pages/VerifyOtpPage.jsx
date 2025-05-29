// src/pages/VerifyOtpPage.jsx
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import OtpForm from "../components/Auth/OtpForm.jsx";

export default function VerifyOtpPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/login-signup", { replace: true });
    }
  }, [email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-700 via-cyan-800 to-sky-800">
      <OtpForm
        email={email}
        onVerified={() => navigate("/dashboard", { replace: true })}
        onEditEmail={() => navigate("/login-signup", { replace: true })}
      />
    </div>
  );
}


// // src/pages/VerifyOtpPage.jsx
// import React, { useEffect }         from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import OtpForm                       from "../components/Auth/OtpForm.jsx";

// export default function VerifyOtpPage() {
//   const [searchParams] = useSearchParams();
//   const email   = searchParams.get("email") || "";
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!email) {
//       // if user somehow lands here without email
//       navigate("/login-signup", { replace: true });
//     }
//   }, [email]);

//   const handleVerified = () => {
//     navigate("/dashboard", { replace: true });
//   };

//   const handleEditEmail = () => {
//     // let user go back and change email
//     navigate("/login-signup", { replace: true });
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-blue-50">
//       <OtpForm
//         email={email}
//         onVerified={handleVerified}
//         onEditEmail={handleEditEmail}
//       />
//     </div>
//   );
// }
