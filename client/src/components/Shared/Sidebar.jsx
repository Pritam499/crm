import React from 'react';
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";

export default function Sidebar() {
  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/leads",      label: "Leads" },
    { to: "/contacts",   label: "Contacts" },
    // … add Opportunities, Tasks, Notes, Reports, Payments
  ];

  return (
    <aside className="w-64 bg-primary text-white flex flex-col">
      <div className="h-16 flex items-center justify-center">
        <Logo className="h-10 w-auto" />
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {links.map(({to, label}) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-primary/70 ${isActive ? "bg-primary/80" : ""}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
