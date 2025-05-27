import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createContact, updateContact } from "../../store/slices/contactSlice.js";
import Button from "../Shared/Button.jsx";

export default function ContactForm({ isOpen, onClose, editingContact, currentLeadId }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.contacts);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    if (editingContact) {
      setForm({
        first_name: editingContact.first_name,
        last_name:  editingContact.last_name,
        email:      editingContact.email,
        phone:      editingContact.phone
      });
    }
  }, [editingContact]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = { lead_id: currentLeadId, ...form };
    if (editingContact) {
      dispatch(updateContact({ id: editingContact.id, data: payload }));
    } else {
      dispatch(createContact(payload));
    }
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
        <h3 className="text-xl font-semibold">
          {editingContact ? "Edit Contact" : "Add Contact"}
        </h3>

        {["first_name","last_name","email","phone"].map(field => (
          <div key={field}>
            <label className="block text-sm font-medium">{field.replace("_"," ").toUpperCase()}</label>
            <input
              name={field}
              type={field==="email"?"email":"text"}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ))}

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">{status==="loading"?"Saving...":"Save"}</Button>
        </div>
      </form>
    </div>
  );
}
