import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAccount, updateAccount } from "../../store/slices/accountSlice";
import Button from "../Shared/Button";

export default function AccountForm({ isOpen, onClose, editing }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((s) => s.accounts);

  const [form, setForm] = useState({
    name: "",
    industry: "",
    website: "",
  });

  // preload on edit
  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        industry: editing.industry || "",
        website: editing.website || "",
      });
    } else {
      setForm({ name: "", industry: "", website: "" });
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      dispatch(updateAccount({ id: editing.id, payload: form }));
    } else {
      dispatch(createAccount(form));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h3 className="text-xl font-bold">
          {editing ? "Edit Account" : "Add Account"}
        </h3>

        <div>
          <label className="block text-sm font-medium">Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Industry</label>
          <input
            name="industry"
            value={form.industry}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Website</label>
          <input
            name="website"
            type="url"
            value={form.website}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end space-x-2 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {status === "loading" ? "Saving..." : editing ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
