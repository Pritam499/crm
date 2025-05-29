// src/components/Leads/LeadForm.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createLead, updateLead } from "../../store/slices/leadSlice";
import Button from "../Shared/Button";

export default function LeadForm({ isOpen, onClose, editingLead }) {
  const dispatch = useDispatch();

  const initial = {
    name: "",
    company: "",
    email: "",
    source: "",
    status: "New",
    value: 0,
  };
  const [formData, setFormData] = useState(initial);

  useEffect(() => {
    if (editingLead) setFormData(editingLead);
    else setFormData(initial);
  }, [editingLead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "value" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingLead) {
      dispatch(updateLead({ id: editingLead.id, data: formData }));
    } else {
      dispatch(createLead(formData));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-md"
      >
        <h3 className="text-xl font-bold">
          {editingLead ? "Edit Lead" : "Add Lead"}
        </h3>

        {/* NEW: Name, Company, Email inputs */}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
        />

        {/* Existing fields */}
        <input
          name="source"
          value={formData.source}
          onChange={handleChange}
          placeholder="Source"
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>
        <input
          name="value"
          type="number"
          value={formData.value}
          onChange={handleChange}
          placeholder="Value"
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {editingLead ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
