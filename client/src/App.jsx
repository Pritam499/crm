// import React, { useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { checkSession, logoutUser } from "./store/slices/authSlice.js";

// import LoginPage from "./pages/LoginPage.jsx";
// import VerifyOtpPage from "./pages/VerifyOtpPage.jsx";
// import DashboardLayout from "./layouts/DashboardLayout.jsx";
// import Dashboard from "./pages/Dashboard.jsx";

// import LeadsPage from "./pages/LeadsPage.jsx";
// import LeadDetails from "./pages/LeadDetails.jsx";
// import AccountsPage from "./pages/AccountsPage.jsx";
// import ContactsPage from "./pages/ContactsPage.jsx";
// import OpportunitiesPage from "./pages/OpportunitiesPage.jsx";
// import TasksPage from "./pages/TasksPage.jsx";
// import NotesPage from "./pages/NotesPage.jsx";
// import ReportsPage from "./pages/ReportsPage.jsx";
// import PaymentsPage from "./pages/PaymentsPage.jsx";
// import OpportunityDetailsPage from "./pages/OpportunityDetailsPage.jsx";
// import ActivitiesPage from "./pages/ActivitiesPage.jsx";

// export default function App() {
// const dispatch = useDispatch();
// const { token, status } = useSelector(state => state.auth);

// useEffect(() => {
// dispatch(checkSession());
// }, [dispatch]);

// if (status === "checking") {
// return <div className="h-screen flex items-center justify-center text-white">Checking session…</div>;
// }

// return (
// <BrowserRouter>
// <Routes>
// <Route path="/login-signup" element={<LoginPage />} />
// <Route path="/verify-otp" element={<VerifyOtpPage />} />
//     <Route
//       path="/"
//       element={
//         token ? (
//           <DashboardLayout onLogout={() => dispatch(logoutUser())} />
//         ) : (
//           <Navigate to="/login-signup" replace />
//         )
//       }
//     >
//       <Route index element={<Navigate to="dashboard" replace />} />
//       <Route path="dashboard" element={<Dashboard />} />
//       <Route path="accounts" element={<AccountsPage />} />
//       <Route path="leads" element={<LeadsPage />} />
//       <Route path="leads/:id" element={<LeadDetails />} />

//       <Route path="opportunities/:id" element={<OpportunityDetailsPage />} />
//       <Route path="contacts" element={<ContactsPage />} />
//       <Route path="opportunities" element={<OpportunitiesPage />} />
//       <Route path="tasks" element={<TasksPage />} />
//       <Route path="notes" element={<NotesPage />} />
//       <Route path="activities" element={<ActivitiesPage />} />
//       <Route path="reports" element={<ReportsPage />} />
//       <Route path="payments" element={<PaymentsPage />} />
//     </Route>

//     <Route path="*" element={<Navigate to="/login-signup" replace />} />
//   </Routes>
// </BrowserRouter>
// );
// }

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkSession, logoutUser } from "./store/slices/authSlice.js";

// Pages & Layout
import LoginPage from "./pages/LoginPage.jsx";
import VerifyOtpPage from "./pages/VerifyOtpPage.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// Modules
import LeadsPage from "./pages/LeadsPage.jsx";
import LeadDetails from "./pages/LeadDetails.jsx";
import AccountsPage from "./pages/AccountsPage.jsx";
import ContactsPage from "./pages/ContactsPage.jsx";
import OpportunitiesPage from "./pages/OpportunitiesPage.jsx";
import OpportunityDetailsPage from "./pages/OpportunityDetailsPage.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import PaymentsPage from "./pages/PaymentsPage.jsx";
import ActivitiesPage from "./pages/ActivitiesPage.jsx";

export default function App() {
  const dispatch = useDispatch();
  const { token, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  if (status === "checking") {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Checking session…
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login-signup" element={<LoginPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            token ? (
              <DashboardLayout onLogout={() => dispatch(logoutUser())} />
            ) : (
              <Navigate to="/login-signup" replace />
            )
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="leads/:id" element={<LeadDetails />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="opportunities" element={<OpportunitiesPage />} />
          <Route path="opportunities/:id" element={<OpportunityDetailsPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="notes" element={<NotesPage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login-signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
