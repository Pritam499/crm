// src/pages/LeadDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import NoteList from "../components/Opportunities/Notes/NoteList.jsx";
import TaskList from "../components/Opportunities/Tasks/TaskList.jsx";
import ActivityList from "../components/Opportunities/Activities/ActivityList.jsx";
import ReportList from "../components/Reports/ReportList.jsx";
import ContactList from "../components/Contacts/ContactList.jsx";

const tabNames = ["Contacts", "Notes", "Tasks", "Activities", "Reports"];

export default function LeadDetails() {
  const { id: leadId } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-b from-[#e0f2ff] via-[#cbe2ee] to-[#edf6fa] text-black">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-sm border border-white/40 shadow-xl ring-1 ring-sky-100/30 rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-cyan-600 to-indigo-500">
          Lead Details&nbsp;
          <span className="text-gray-600 font-medium">#{leadId}</span>
        </h1>

        {/* Tabs */}
        <Tab.Group>
          <Tab.List className="flex space-x-2 sm:space-x-4 overflow-x-auto border-b border-gray-200 pb-1 mb-6">
            {tabNames.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    "px-4 sm:px-6 py-2.5 text-sm sm:text-base font-medium rounded-t-md transition",
                    selected
                      ? "bg-gradient-to-r from-sky-400 to-indigo-500 text-white shadow"
                      : "text-gray-700 hover:text-sky-600 hover:bg-sky-50"
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-4">
            <Tab.Panel>
              {/* Pass leadId into contacts */}
              <ContactList currentLeadId={leadId} />
            </Tab.Panel>
            <Tab.Panel>
              <NoteList leadId={leadId} />
            </Tab.Panel>
            <Tab.Panel>
              <TaskList leadId={leadId} />
            </Tab.Panel>
            <Tab.Panel>
              <ActivityList leadId={leadId} />
            </Tab.Panel>
            <Tab.Panel>
              <ReportList leadId={leadId} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}



// src/pages/LeadDetails.jsx
// import React from "react";
// import { useParams } from "react-router-dom";
// import { Tab } from "@headlessui/react";
// import classNames from "classnames";
// import NoteList from "../components/Notes/NoteList.jsx";
// import TaskList from "../components/Tasks/TaskList.jsx";
// import ActivityList from "../components/Activities/ActivityList.jsx";
// import ReportList from "../components/Reports/ReportList.jsx";

// const tabNames = ["Notes", "Tasks", "Activities", "Reports"];

// export default function LeadDetails() {
//   const { id: leadId } = useParams();

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-b from-[#e0f2ff] via-[#cbe2ee] to-[#edf6fa] text-black">

//       <div className="w-full max-w-5xl bg-white/80 backdrop-blur-sm border border-white/40 shadow-xl ring-1 ring-sky-100/30 rounded-2xl p-8">
        
//         {/* Title */}
//         <h1 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-cyan-600 to-indigo-500">
//           Lead Details <span className="text-gray-600 font-medium">— #{leadId}</span>
//         </h1>

//         {/* Tabs */}
//         <Tab.Group>
//           <Tab.List className="flex space-x-2 sm:space-x-4 overflow-x-auto border-b border-gray-200 pb-1 mb-6">
//             {tabNames.map(tab => (
//               <Tab
//                 key={tab}
//                 className={({ selected }) =>
//                   classNames(
//                     "px-4 sm:px-6 py-2.5 text-sm sm:text-base font-medium rounded-t-md transition",
//                     selected
//                       ? "bg-gradient-to-r from-sky-400 to-indigo-500 text-white shadow"
//                       : "text-gray-700 hover:text-sky-600 hover:bg-sky-50"
//                   )
//                 }
//               >
//                 {tab}
//               </Tab>
//             ))}
//           </Tab.List>

//           <Tab.Panels className="mt-4">
//             <Tab.Panel>
//               <NoteList leadId={leadId} />
//             </Tab.Panel>
//             <Tab.Panel>
//               <TaskList leadId={leadId} />
//             </Tab.Panel>
//             <Tab.Panel>
//               <ActivityList leadId={leadId} />
//             </Tab.Panel>
//             <Tab.Panel>
//               <ReportList leadId={leadId} />
//             </Tab.Panel>
//           </Tab.Panels>
//         </Tab.Group>
//       </div>
//     </div>
//   );
// }



// // src/pages/LeadDetails.jsx
// import React from "react";
// import { useParams } from "react-router-dom";
// import { Tab } from "@headlessui/react";
// import classNames from "classnames";
// import NoteList from "../components/Notes/NoteList.jsx";
// import TaskList from "../components/Tasks/TaskList.jsx";
// import ActivityList from "../components/Activities/ActivityList.jsx";
// import ReportList from "../components/Reports/ReportList.jsx";

// const tabNames = ["Notes", "Tasks", "Activities", "Reports"];

// export default function LeadDetails() {
//   const { id: leadId } = useParams();

//   return (
//     // <div className="min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-tr from-gray-900 via-sky-700 to-cyan-500 text-white">
//     <div className="min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#045174] text-white">

//       <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8">
//         {/* Title */}
//         <h1 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-teal-300 to-purple-300">
//           Lead Details <span className="text-white/70 font-normal">— #{leadId}</span>
//         </h1>

//         {/* Tabs */}
//         <Tab.Group>
//           <Tab.List className="flex space-x-2 sm:space-x-4 overflow-x-auto border-b border-white/30 pb-1 mb-6">
//             {tabNames.map(tab => (
//               <Tab
//                 key={tab}
//                 className={({ selected }) =>
//                   classNames(
//                     "px-4 sm:px-6 py-2.5 text-sm sm:text-base font-medium rounded-t-md transition",
//                     selected
//                       ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow"
//                       : "text-white/70 hover:text-white hover:bg-white/10"
//                   )
//                 }
//               >
//                 {tab}
//               </Tab>
//             ))}
//           </Tab.List>

//           <Tab.Panels className="mt-4">
//             <Tab.Panel>
//               <NoteList leadId={leadId} />
//             </Tab.Panel>
//             <Tab.Panel>
//               <TaskList leadId={leadId} />
//             </Tab.Panel>
//             <Tab.Panel>
//               <ActivityList leadId={leadId} />
//             </Tab.Panel>
//             <Tab.Panel>
//               <ReportList leadId={leadId} />
//             </Tab.Panel>
//           </Tab.Panels>
//         </Tab.Group>
//       </div>
//     </div>
//   );
// }



// // src/pages/LeadDetails.jsx
// import React from "react";
// import { useParams } from "react-router-dom";
// import { Tab } from "@headlessui/react";
// import classNames from "classnames";
// import NoteList from "../components/Notes/NoteList.jsx";
// import TaskList from "../components/Tasks/TaskList.jsx";
// import ActivityList from "../components/Activities/ActivityList.jsx";
// import ReportList from "../components/Reports/ReportList.jsx";

// const tabNames = ["Notes", "Tasks", "Activities", "Reports"];

// export default function LeadDetails() {
//   const { id: leadId } = useParams();

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-8 bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-lg">
//       <h1 className="text-3xl font-bold text-primary mb-6">Lead Details — #{leadId}</h1>

//       <Tab.Group>
//         <Tab.List className="flex space-x-6 border-b border-gray-300 mb-6">
//           {tabNames.map(tab => (
//             <Tab
//               key={tab}
//               className={({ selected }) =>
//                 classNames(
//                   "py-3 px-5 text-lg font-medium rounded-t-lg",
//                   selected
//                     ? "border-b-4 border-primary text-primary"
//                     : "text-gray-600 hover:text-primary"
//                 )
//               }
//             >
//               {tab}
//             </Tab>
//           ))}
//         </Tab.List>

//         <Tab.Panels>
//           <Tab.Panel><NoteList leadId={leadId} /></Tab.Panel>
//           <Tab.Panel><TaskList leadId={leadId} /></Tab.Panel>
//           <Tab.Panel><ActivityList leadId={leadId} /></Tab.Panel>
//           <Tab.Panel><ReportList leadId={leadId} /></Tab.Panel>
//         </Tab.Panels>
//       </Tab.Group>
//     </div>
//   );
// }
