import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function DashboardLayout({ onLogout }) {
  const navigate = useNavigate();

  const doLogout = () => {
    onLogout();                                // dispatch(logoutUser())
    navigate("/login-signup", { replace: true }); // redirect to login-signup
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between p-4 bg-gray-800 text-white">
        <nav className="space-x-4">
          <Link to="/dashboard">Home</Link>
          <Link to="/leads">Leads</Link>
          {/* …other links */}
        </nav>
        <button onClick={doLogout} className="underline">
          Logout
        </button>
      </header>
      <main className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
