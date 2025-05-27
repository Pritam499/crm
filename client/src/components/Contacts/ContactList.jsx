import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact } from "../../store/slices/contactSlice";
import ContactForm from "./ContactForm";
import Button from "../Shared/Button";

export default function ContactList({ currentLeadId }) {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.contacts);
  const [editingContact, setEditingContact] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const openForm = (contact = null) => {
    setEditingContact(contact);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this contact?")) {
      dispatch(deleteContact(id));
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => openForm()}>Add Contact</Button>
      <ul className="space-y-2">
        {items.map(c => (
          <li key={c.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-medium">{c.first_name} {c.last_name}</p>
              <p className="text-sm text-gray-500">{c.email} | {c.phone}</p>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => openForm(c)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(c.id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
      <ContactForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        editingContact={editingContact}
        currentLeadId={currentLeadId}
      />
    </div>
  );
}
