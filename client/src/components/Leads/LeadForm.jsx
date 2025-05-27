import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLead, updateLead } from "../../store/slices/leadSlice.js";
import Button from "../Shared/Button.jsx";

export default function LeadForm({ isOpen, onClose, editingLead }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.leads);
  const [form, setForm] = useState({ source: "", status: "", value: "" });

  // When editing, populate fields
  useEffect(() => {
    if (editingLead) {
      setForm({
        source: editingLead.source,
        status: editingLead.status,
        value: editingLead.value,
      });
    }
  }, [editingLead]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = { ...form, value: parseFloat(form.value) };
    if (editingLead) {
      dispatch(updateLead({ id: editingLead.id, data: payload }));
    } else {
      dispatch(createLead(payload));
    }
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h3 className="text-xl font-semibold">
          {editingLead ? "Edit Lead" : "Add Lead"}
        </h3>

        <div>
          <label className="block text-sm font-medium">Source</label>
          <input
            name="source"
            value={form.source}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <input
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Value</label>
          <input
            name="value"
            type="number"
            value={form.value}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">
            {status === "loading" ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
