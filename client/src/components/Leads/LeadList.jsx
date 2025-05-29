import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../../store/slices/leadSlice";
import DataTable from "../Shared/DataTable";
import Button from "../Shared/Button";
import { useNavigate } from "react-router-dom";
import Loader from "../Shared/Loader";
import Alert from "../Shared/Alert";

export default function LeadList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: leadsData, status, error } = useSelector((state) => state.leads);
  const leads = leadsData || [];

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLeads());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      dispatch(deleteLead(id));
    }
  };

  // Create a new lead with simple prompt dialog (for demo purposes)
  const handleCreate = () => {
    const name = window.prompt("Enter new lead's name:");
    if (!name) return;
    // You can expand this with more fields if needed
    const newLead = {
      source: "Website",
      status: "new",
      value: 0,
    };
    dispatch(createLead(newLead));
  };

  // Update lead value with prompt (demo purposes)
  const handleUpdateValue = async (leadId) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    const newValue = window.prompt("Enter new value:", lead.value);
    if (newValue === null || newValue.trim() === "" || isNaN(newValue)) return;

    try {
      await dispatch(
        updateLead({ id: lead.id, value: Number(newValue) })
      ).unwrap();
      // Success handling here if needed
    } catch (error) {
      alert("Failed to update lead");
    }
  };

  const columns = [
    { Header: "Source", accessor: "source", width: "w-[20%]" },
    { Header: "Status", accessor: "status", width: "w-[15%]" },
    { Header: "Value ($)", accessor: "value", width: "w-[15%]" },
    {
      Header: "Actions",
      accessor: "id",
      width: "w-[30%]",
      align: "text-center",
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            onClick={() => navigate(`/leads/${row.original.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md px-3 py-1.5"
          >
            View
          </Button>
          <Button
            onClick={() => handleUpdateValue(row.original.id)}
            variant="outline"
            className="text-yellow-700 border-yellow-700 hover:bg-yellow-100 px-3 py-1.5"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(row.original.id)}
            variant="outline"
            className="text-red-700 border-red-700 hover:bg-red-100 px-3 py-1.5"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (status === "loading") return <Loader className="mt-8" />;

  if (error)
    return (
      <Alert variant="error" className="mt-4">
        Error loading leads: {error}
      </Alert>
    );

  return (
    <div className="mt-4 rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="flex justify-end p-4">
        <Button
          onClick={handleCreate}
          className="bg-green-600 hover:bg-green-700 text-white shadow-md px-4 py-2"
        >
          + Add New Lead
        </Button>
      </div>
      <DataTable
        data={leads}
        columns={columns}
        headerClassName="bg-gradient-to-r from-blue-700 to-blue-500 text-white"
        rowClassName="hover:bg-blue-50 transition-colors"
        emptyState={
          <div className="text-center py-8 text-gray-500">
            No leads found. Start by creating a new lead.
          </div>
        }
      />
    </div>
  );
}
