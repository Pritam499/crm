// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchReports, deleteReport } from "../../store/slices/reportSlice";
// import ReportForm from "./ReportForm.jsx";
// import Button from "../Shared/Button.jsx";

// export default function ReportList() {
//   const dispatch = useDispatch();
//   const { items, status } = useSelector(state => state.reports);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingReport, setEditingReport] = useState(null);

//   useEffect(() => {
//     dispatch(fetchReports());
//   }, [dispatch]);

//   const handleEdit = (report) => {
//     setEditingReport(report);
//     setIsFormOpen(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Delete this report?")) {
//       dispatch(deleteReport(id));
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-2">
//         <h3 className="text-lg font-semibold">Reports</h3>
//         <Button onClick={() => {
//           setEditingReport(null);
//           setIsFormOpen(true);
//         }}>+ Add</Button>
//       </div>

//       {status === "loading" ? (
//         <p>Loading...</p>
//       ) : items.length === 0 ? (
//         <p>No reports found.</p>
//       ) : (
//         <ul className="space-y-3">
//           {items.map(report => (
//             <li key={report.id} className="p-4 bg-gray-50 rounded border">
//               <div className="font-semibold">{report.name} ({report.type})</div>
//               <pre className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-x-auto">
//                 Params: {JSON.stringify(report.params, null, 2)}
//               </pre>
//               <pre className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-x-auto">
//                 Result: {JSON.stringify(report.result, null, 2)}
//               </pre>
//               <div className="flex justify-end gap-2 mt-2">
//                 <Button size="sm" onClick={() => handleEdit(report)}>Edit</Button>
//                 <Button size="sm" variant="danger" onClick={() => handleDelete(report.id)}>Delete</Button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       <ReportForm
//         isOpen={isFormOpen}
//         onClose={() => setIsFormOpen(false)}
//         editingReport={editingReport}
//       />
//     </div>
//   );
// }

// src/components/Reports/ReportList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports, deleteReport } from "../../store/slices/reportSlice";
import ReportForm from "./ReportForm.jsx";
import Button from "../Shared/Button.jsx";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export default function ReportList() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.reports);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReport, setEditingReport] = useState(null);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const handleEdit = (report) => {
    setEditingReport(report);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this report?")) dispatch(deleteReport(id));
  };

  if (status === "loading") {
    return <p className="text-center py-8 text-gray-500">Loading reports…</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-primary">Reports</h3>
        <Button
          variant="primary"
          onClick={() => {
            setEditingReport(null);
            setIsFormOpen(true);
          }}
          className="px-5 py-2"
        >
          + Add Report
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 italic">No reports found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((report) => (
            <div
              key={report.id}
              className="relative rounded-2xl bg-white bg-opacity-50 backdrop-blur-md shadow-lg overflow-hidden"
            >
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3">
                <h4 className="text-lg font-semibold text-white">
                  {report.name}{" "}
                  <span className="text-sm font-normal opacity-75">
                    ({report.type})
                  </span>
                </h4>
              </div>

              {/* Details via Disclosure */}
              <div className="p-4 space-y-3">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between items-center text-left">
                        <span className="font-medium text-gray-800">Params</span>
                        <ChevronUpIcon
                          className={`h-5 w-5 transition-transform ${
                            open ? "rotate-180 text-indigo-500" : "text-gray-400"
                          }`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(report.params, null, 2)}
                        </pre>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between items-center text-left">
                        <span className="font-medium text-gray-800">Result</span>
                        <ChevronUpIcon
                          className={`h-5 w-5 transition-transform ${
                            open ? "rotate-180 text-indigo-500" : "text-gray-400"
                          }`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(report.result, null, 2)}
                        </pre>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(report)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(report.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      <ReportForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingReport={editingReport}
      />
    </div>
  );
}
