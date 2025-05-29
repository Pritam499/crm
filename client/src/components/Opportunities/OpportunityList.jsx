// src/components/Opportunities/OpportunityList.jsx

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOpportunity } from "../../store/slices/opportunitySlice";
import Button from "../Shared/Button";
import Loader from "../Shared/Loader";

export default function OpportunityList({ currentLeadId, onEdit, onAddNew }) {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.opportunities);

  const handleDelete = (id) => {
    if (window.confirm("Delete this opportunity?")) {
      dispatch(deleteOpportunity(id));
    }
  };

  const filtered = currentLeadId
    ? items.filter((op) => op.lead_id === currentLeadId)
    : items;

  return (
    <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-sky-700 via-cyan-800 to-blue-800 text-white rounded-t-xl">
        <h2 className="text-xl font-bold">Opportunity Management</h2>
        <Button
          onClick={onAddNew}
          className="bg-gradient-to-r from-cyan-400 to-sky-400 text-white font-medium px-4 py-2 rounded hover:from-cyan-500 hover:to-sky-500"
        >
          + Add Opportunity
        </Button>
      </div>

      {/* Body */}
      <div className="p-4 overflow-x-auto">
        {status === "loading" ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500">Error loading opportunities: {error}</p>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-100 italic py-6">
            No opportunities yet. Click “+ Add Opportunity” to begin tracking.
          </div>
        ) : (
          <table className="w-full text-sm text-white border border-white/20 rounded overflow-hidden">
            <thead className="bg-gradient-to-r from-sky-600 to-blue-800">
              <tr  >
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Stage</th>
                <th className="px-3 py-2 text-left">Amount</th>
                <th className="px-3 py-2 text-left">Close Date</th>
                <th className="px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((op) => (
                <tr
                  key={op.id}
                  className=" bg-cyan-100/5 hover:bg-cyan-100/50 text-blue-950 transition ease-in-out duration-150"
                >
                  <td className="px-3 py-2">{op.name}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        {
                          Prospecting: "bg-sky-100 text-sky-800",
                          "Proposal Sent": "bg-yellow-100 text-yellow-800",
                          Won: "bg-green-100 text-green-800",
                          Lost: "bg-red-100 text-red-800",
                        }[op.stage] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {op.stage}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(op.amount)}
                  </td>
                  <td className="px-3 py-2">{op.close_date?.slice(0, 10)}</td>
                  <td className="px-3 py-2 space-x-2 text-center">
                    <div className="inline-flex justify-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-gradient-to-r from-cyan-700 to-sky-600 text-white px-3 py-1.5 rounded shadow hover:from-cyan-600 hover:to-sky-500"
                        onClick={() => onEdit(op)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-700 border-red-700 hover:bg-red-900 px-3 py-1.5"
                        onClick={() => handleDelete(op.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
