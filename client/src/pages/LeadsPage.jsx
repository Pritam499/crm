import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLeads, deleteLead } from "../store/slices/leadSlice.js";
import DataTable from "../components/Shared/DataTable.jsx";
import Button from "../components/Shared/Button.jsx";
import LeadForm from "../components/Leads/LeadForm.jsx";

export default function LeadsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: leads, status } = useSelector((s) => s.leads);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      dispatch(deleteLead(id));
    }
  };

  const columns = [
    {
      Header: "Source",
      accessor: "source",
      width: "w-[20%]",
      Cell: ({ value }) => (
        <span className="px-2 py-1 rounded bg-sky-100/30 text-sky-800 text-sm font-medium">
          {value}
        </span>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      width: "w-[15%]",
      Cell: ({ value }) => {
        const statusColors = {
          New: "bg-blue-100/40 text-blue-800",
          Contacted: "bg-green-100/40 text-green-800",
          Qualified: "bg-yellow-100/40 text-yellow-800",
          Lost: "bg-red-100/40 text-red-800",
        };
        const colorClass = statusColors[value] || "bg-gray-100/40 text-gray-800";
        return (
          <span className={`px-2 py-1 rounded text-sm font-semibold ${colorClass}`}>
            {value}
          </span>
        );
      },
    },
    {
      Header: "Value ($)",
      accessor: "value",
      width: "w-[15%]",
      Cell: ({ value }) => (
        <span className="text-gray-800 font-semibold">
          ${value?.toLocaleString() ?? "0"}
        </span>
      ),
    },
    {
      Header: "Actions",
      accessor: "id",
      width: "w-[30%]",
      align: "text-center",
      Cell: ({ row }) => {
        const lead = row.original;
        return (
          <div className="flex justify-center items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-sky-400 text-sky-600 bg-teal-700 hover:bg-teal-600"
              onClick={() => navigate(`/leads/${lead.id}`)}
            >
              View
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-sky-600 text-white hover:bg-sky-400"
              onClick={() => handleEdit(lead)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="danger"
              className="bg-rose-700 text-white hover:bg-red-600"
              onClick={() => handleDelete(lead.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f2ff] via-[#cbe2ee] to-[#edf6fa] text-black p-6">
      <div className="mx-auto max-w-7xl ">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-cyan-600 to-indigo-500">
            Leads
          </h2>
          <Button
            variant="primary"
            onClick={() => {
              setEditingLead(null);
              setIsFormOpen(true);
            }}
            className="px-6 py-2 bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition"
          >
            + Add Lead
          </Button>
        </div>

        {/* Table Card */}
        <div className="rounded-xl bg-white backdrop-blur-sm border border-white/40 shadow-xl ring-1 ring-sky-700/30 p-6">
          {status === "loading" ? (
            <p className="text-center text-gray-500">Loading leads…</p>
          ) : (
            <DataTable
              columns={columns}
              data={leads}
              className="rounded-md overflow-hidden"
              headerClassName="bg-sky-100 text-white-700 font-semibold"
              rowClassName="hover:bg-sky-50 transition"
              emptyState={
                <div className="text-center text-gray-500 italic py-6">
                  No leads yet. Click “+ Add Lead” to create your first opportunity.
                </div>
              }
            />
          )}
        </div>
      </div>

      {/* Lead Form Modal */}
      <LeadForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingLead={editingLead}
      />
    </div>
  );
}