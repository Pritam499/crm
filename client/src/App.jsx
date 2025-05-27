// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkSession, logoutUser } from "./store/slices/authSlice.js";
import LoginPage from "./pages/LoginPage.jsx";
import VerifyOtpPage from "./pages/VerifyOtpPage.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LeadsPage from "./pages/LeadsPage.jsx";
import LeadDetails from "./pages/LeadDetails.jsx";

export default function App() {
  const dispatch = useDispatch();
  const { token, status } = useSelector(s => s.auth);

  // Run once on mount
  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  // While checking, show nothing or a spinner
  if (status === "checking") {
    return <div className="h-screen flex items-center justify-center">Checking session…</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login-signup" element={<LoginPage />} />
        <Route path="/verify-otp"   element={<VerifyOtpPage />} />

        <Route path="/" element={
          token
            ? <DashboardLayout onLogout={() => dispatch(logoutUser())}/>
            : <Navigate to="/login-signup" replace />
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leads"      element={<LeadsPage />} />
          <Route path="leads/:id"  element={<LeadDetails />} />
        </Route>

        <Route path="*" element={<Navigate to="/login-signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
