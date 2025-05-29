// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ FIXED
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../store/slices/leadSlice";
import { fetchAccounts } from "../store/slices/accountSlice";
import { fetchContacts } from "../store/slices/contactSlice";
import { fetchOpportunities } from "../store/slices/opportunitySlice";
import { fetchTasks } from "../store/slices/taskSlice";
import { fetchNotes } from "../store/slices/noteSlice";
import { fetchActivities } from "../store/slices/activitySlice";
import { fetchReports } from "../store/slices/reportSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  const stats = {
    leads: useSelector((s) => s.leads.items.length) || 0,
    accounts: useSelector((s) => s.accounts.items.length) || 0,
    contacts: useSelector((s) => s.contacts.items.length) || 0,
    opps: useSelector((s) => s.opportunities.items.length) || 0,
    tasks: useSelector((s) => s.tasks.items.length) || 0,
    notes: useSelector((s) => s.notes.items.length) || 0,
    activities: useSelector((s) => s.activities.items.length) || 0,
    reports: useSelector((s) => s.reports.items.length) || 0,
  };

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchAccounts());
    dispatch(fetchContacts());
    dispatch(fetchOpportunities());
    dispatch(fetchTasks());
    dispatch(fetchNotes());
    dispatch(fetchActivities());
    dispatch(fetchReports());
  }, [dispatch]);

  const statCards = [
    { label: "Leads", value: stats.leads, href: "/leads", color: "from-blue-400 to-transparent"},
    { label: "Accounts", value: stats.accounts, href: "/accounts", color: "from-sky-400 to-transparent"},
    { label: "Contacts", value: stats.contacts, href: "/contacts", color: "from-green-400 to-transparent" },
    { label: "Opportunities", value: stats.opps, href: "/opportunities", color: "from-purple-400 to-transparent" },
    { label: "Tasks", value: stats.tasks, href: "/tasks", color: "from-yellow-400 to-transparent" },
    { label: "Notes", value: stats.notes, href: "/notes", color: "from-red-400 to-transparent" },
    { label: "Activities", value: stats.activities, href: "/activities", color: "from-indigo-400 to-transparent" },
    { label: "Reports", value: stats.reports, href: "/reports", color: "from-teal-400 to-transparent" },
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-100 via-white to-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-sky-800">Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ label, value, href, color }) => (
          <div
            key={label}
            className={`relative overflow-hidden rounded-2xl bg-white bg-opacity-50 backdrop-blur-md p-6 shadow-lg flex flex-col justify-between transition-transform hover:scale-105`}
          >
            {/* Header */}
            <div>
              <h2 className="text-lg font-medium text-gray-700">{label}</h2>
              <p className="mt-2 text-4xl font-extrabold text-gray-900">{value}</p>
            </div>

            {/* View Link */}
            <Link
              to={href}
              className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
            >
              View {label}
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Gradient accent bar */}
            <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${color}`} />
          </div>
        ))}
      </div>

      {/* Add-New Floating Button */}
      <Link
        to="/new"
        className="fixed right-8 bottom-8 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl hover:bg-blue-700 transition"
        aria-label="Add new record"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </Link>
    </div>
  );
}




// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLeads } from "../store/slices/leadSlice";
// import { fetchContacts } from "../store/slices/contactSlice";
// import { fetchOpportunities } from "../store/slices/opportunitySlice";
// import { fetchTasks } from "../store/slices/taskSlice";
// import { fetchNotes } from "../store/slices/noteSlice";
// import { fetchActivities } from "../store/slices/activitySlice";
// import { fetchReports } from "../store/slices/reportSlice";

// export default function Dashboard() {
//   const dispatch = useDispatch();
//   const stats = {
//     leads: useSelector((s) => s.leads.items.length),
//     contacts: useSelector((s) => s.contacts.items.length),
//     opps: useSelector((s) => s.opportunities.items.length),
//     tasks: useSelector((s) => s.tasks.items.length),
//     notes: useSelector((s) => s.notes.items.length),
//     activities: useSelector((s) => s.activities.items.length),
//     reports: useSelector((s) => s.reports.items.length),
//   };

//   useEffect(() => {
//     dispatch(fetchLeads());
//     dispatch(fetchContacts());
//     dispatch(fetchOpportunities());
//     dispatch(fetchTasks());
//     dispatch(fetchNotes());
//     dispatch(fetchActivities());
//     dispatch(fetchReports());
//   }, [dispatch]);

//   const statCards = [
//     { label: "Leads", value: stats.leads, colorClass: "bg-gradient-to-r from-primary to-transparent" },
//     { label: "Contacts", value: stats.contacts, colorClass: "bg-gradient-to-r from-secondary to-transparent" },
//     { label: "Opportunities", value: stats.opps, colorClass: "bg-gradient-to-r from-accent to-transparent" },
//     { label: "Tasks", value: stats.tasks, colorClass: "bg-gradient-to-r from-primary to-transparent" },
//     { label: "Notes", value: stats.notes, colorClass: "bg-gradient-to-r from-secondary to-transparent" },
//     { label: "Activities", value: stats.activities, colorClass: "bg-gradient-to-r from-accent to-transparent" },
//     { label: "Reports", value: stats.reports, colorClass: "bg-gradient-to-r from-primary to-transparent" },
//   ];

//   return (
//     <div className="p-6 bg-backdrop min-h-screen">
//       <h2 className="text-3xl font-semibold mb-8">Dashboard</h2>

//       {/* Hero Metric Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {statCards.map(({ label, value, colorClass }) => (
//           <div
//             key={label}
//             className={`glass-bg p-6 rounded-2xl shadow-lg flex flex-col justify-between relative overflow-hidden`}
//           >
//             <span className="text-lg font-medium text-gray-700">{label}</span>
//             <span className="text-4xl font-bold text-black mt-2">{value}</span>
//             {/* Gradient accent bar */}
//             <div
//               className={`absolute bottom-0 left-0 h-1 w-full ${colorClass}`}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Floating Action Button */}
//       <button
//         className="fixed bottom-8 right-8 p-4 bg-primary text-white rounded-full shadow-xl hover:scale-105 transform transition-transform"
//         aria-label="Add new record"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M12 4v16m8-8H4"
//           />
//         </svg>
//       </button>
//     </div>
//   );
// }