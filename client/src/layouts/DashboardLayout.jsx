// frontend/src/components/Layout/DashboardLayout.jsx
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
  { name: "Home", to: "/dashboard" },
  { name: "Leads", to: "/leads" },
  { name: "Accounts", to: "/accounts" },
  { name: "Contacts", to: "/contacts" },
  { name: "Opportunities", to: "/opportunities" },
  { name: "Tasks", to: "/tasks" },
  { name: "Notes", to: "/notes" },
  { name: "Activities", to: "/activities" },
  { name: "Reports", to: "/reports" },
];

export default function DashboardLayout({ onLogout }) {
  const navigate = useNavigate();

  const doLogout = () => {
    onLogout();
    navigate("/login-signup", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Disclosure
        as="header"
        // className="bg-sky-800 text-white"
        // className="bg-gradient-to-t via-sky-600 to-cyan-200 text-white"
        className="bg-gradient-to-r from-gray-900 via-sky-700 to-sky-800 text-white"
      >
        {({ open }) => (
          <>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                {/* Branding */}
                <div className="flex-shrink-0 flex items-center">
                  {/* <Link to="/dashboard" className="text-2xl font-bold">
                    SoftQubic
                    Qcrm
                  </Link> */}
                 

<Link to="/dashboard" className="flex flex-col items-center leading-tight">
  {/* Qcrm - big, icy gradient text */}
  <span 
  
  className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-sky-300 via-teal-300 to-purple-300 text-transparent bg-clip-text drop-shadow-md"
  >
    Qcrm
  </span>

  {/* Powered by SoftQubic - smaller, subtle icy gradient */}
  <span className="text-xs mt-1 font-semibold bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
    Powered by SoftQubic
  </span>
</Link>


                  {/* <Link to="/dashboard" className="flex flex-col items-start leading-tight">
                    <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-sky-300 via-teal-300 to-purple-300 text-transparent bg-clip-text drop-shadow-md">
                      Qcrm
                    </span>
                    <span className="text-xs mt-0.5 font-semibold bg-gradient-to-r from-red-400 via-green-400 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
                    Powered by SoftQubic
                    </span>
                  </Link> */}

                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 ml-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="hover:text-sky-200 transition"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Logout + Mobile Menu Button */}
                <div className="flex items-center">
                  <button
                    onClick={doLogout}
                    className="hidden sm:inline-block mr-4 text-sm underline hover:text-sky-200 transition"
                  >
                    Logout
                  </button>

                  {/* Mobile menu toggle */}
                  <Disclosure.Button className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-sky-700 focus:outline-none">
                    {open ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* Mobile Nav Panel */}
            <Disclosure.Panel className="md:hidden bg-sky-700/80">
              <div className="px-4 pt-2 pb-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-sky-600 transition"
                  >
                    {item.name}
                  </Link>
                ))}
                <Disclosure.Button
                  as="button"
                  onClick={doLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-sky-600 transition"
                >
                  Logout
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-100 p-4">
        <Outlet />
      </main>
    </div>
  );
}

// import React from "react";
// import { Outlet, Link, useNavigate } from "react-router-dom";

// export default function DashboardLayout({ onLogout }) {
//   const navigate = useNavigate();

//   const doLogout = () => {
//     onLogout();                                // dispatch(logoutUser())
//     navigate("/login-signup", { replace: true }); // redirect to login-signup
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <header className="flex justify-between p-5 bg-sky-800 text-white">
//         <nav className="space-x-16 ml-8">
//           <Link to="/dashboard">Home</Link>
//           <Link to="/leads">Leads</Link>
//           <Link to="/contacts">Contacts</Link>
//           <Link to="/opportunities">Opportunities</Link>
//           <Link to="/tasks">Tasks</Link>
//           <Link to="/notes">Notes</Link>
//           <Link to="/activities">Activities</Link>
//           <Link to="/reports">Reports</Link>
//           {/* …other links */}
//         </nav>
//         <button onClick={doLogout} className="underline mr-4">
//           Logout
//         </button>
//       </header>
//       <main className="flex-1 p-4 bg-gray-100">
//         <Outlet />
//       </main>
//     </div>
//   );
// }
