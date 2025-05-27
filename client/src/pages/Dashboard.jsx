// // src/pages/LeadsPage.jsx

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Layout from "../components/Shared/Layout.jsx";
// import { fetchLeads } from "../store/slices/leadSlice.js";
// import { fetchContacts } from "../store/slices/contactSlice.js";
// import { fetchOpportunities } from "../store/slices/opportunitySlice.js";
// import { fetchTasks } from "../store/slices/taskSlice.js";
// import { fetchNotes } from "../store/slices/noteSlice.js";
// import { fetchActivities } from "../store/slices/activitySlice.js";
// import { fetchReports } from "../store/slices/reportSlice.js";

// export default function Dashboard() {
//   const dispatch = useDispatch();
//   const { items: leads } = useSelector(s => s.leads);
//   const { items: contacts } = useSelector(s => s.contacts);
//   const { items: opps } = useSelector(s => s.opportunities);
//   const { items: tasks } = useSelector(s => s.tasks);
//   const { items: notes } = useSelector(s => s.notes);
//   const { items: activities } = useSelector(s => s.activities);
//   const { items: reports } = useSelector(s => s.reports);

//   useEffect(() => {
//     dispatch(fetchLeads());
//     dispatch(fetchContacts());
//     dispatch(fetchOpportunities());
//     dispatch(fetchTasks());
//     dispatch(fetchNotes());
//     dispatch(fetchActivities());
//     dispatch(fetchReports());
//   }, [dispatch]);

//   const stats = [
//     { label: "Leads",      value: leads.length },
//     { label: "Contacts",   value: contacts.length },
//     { label: "Opportunities", value: opps.length },
//     { label: "Tasks",      value: tasks.length },
//     { label: "Notes",      value: notes.length },
//     { label: "Activities", value: activities.length },
//     { label: "Reports",    value: reports.length },
//   ];

//   return (
//     <Layout>
//       <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map(({label, value}) => (
//           <div key={label} className="bg-white p-4 rounded shadow flex items-center justify-between">
//             <span className="text-lg font-medium">{label}</span>
//             <span className="text-3xl font-bold">{value}</span>
//           </div>
//         ))}
//       </div>
//       {/* Future: add charts or quick-actions here */}
//     </Layout>
//   );
// }

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../store/slices/leadSlice";
import { fetchContacts } from "../store/slices/contactSlice";
import { fetchOpportunities } from "../store/slices/opportunitySlice";
import { fetchTasks } from "../store/slices/taskSlice";
import { fetchNotes } from "../store/slices/noteSlice";
import { fetchActivities } from "../store/slices/activitySlice";
import { fetchReports } from "../store/slices/reportSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const stats = {
    leads:       useSelector(s => s.leads.items.length),
    contacts:    useSelector(s => s.contacts.items.length),
    opps:        useSelector(s => s.opportunities.items.length),
    tasks:       useSelector(s => s.tasks.items.length),
    notes:       useSelector(s => s.notes.items.length),
    activities:  useSelector(s => s.activities.items.length),
    reports:     useSelector(s => s.reports.items.length),
  };

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchContacts());
    dispatch(fetchOpportunities());
    dispatch(fetchTasks());
    dispatch(fetchNotes());
    dispatch(fetchActivities());
    dispatch(fetchReports());
  }, [dispatch]);

  const statCards = [
    { label: "Leads", value: stats.leads },
    { label: "Contacts", value: stats.contacts },
    { label: "Opportunities", value: stats.opps },
    { label: "Tasks", value: stats.tasks },
    { label: "Notes", value: stats.notes },
    { label: "Activities", value: stats.activities },
    { label: "Reports", value: stats.reports },
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(({ label, value }) => (
          <div key={label} className="bg-white p-4 rounded shadow flex justify-between">
            <span>{label}</span>
            <span className="text-3xl font-bold">{value}</span>
          </div>
        ))}
      </div>
    </>
  );
}
