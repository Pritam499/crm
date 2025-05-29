// // src/components/Contacts/ContactList.jsx
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchContacts, deleteContact } from "../../store/slices/contactSlice.js";
// import ContactForm from "./ContactForm.jsx";
// import Button from "../Shared/Button.jsx";

// export default function ContactList({ currentLeadId }) {
//   const dispatch = useDispatch();
//   const { items, status } = useSelector((s) => s.contacts);
//   const [editingContact, setEditingContact] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   // load all contacts once
//   useEffect(() => {
//     dispatch(fetchContacts());
//   }, [dispatch]);

//   // filter to this lead
//   const contactsToShow = items.filter((c) => c.lead_id === currentLeadId);

//   const openForm = (c = null) => {
//     setEditingContact(c);
//     setIsOpen(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Delete this contact?")) {
//       dispatch(deleteContact(id));
//     }
//   };

//   if (status === "loading") return <p>Loading contacts…</p>;

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold">Contacts</h2>
//         <Button onClick={() => openForm()}>+ Add Contact</Button>
//       </div>

//       {contactsToShow.length === 0 ? (
//         <p className="text-gray-500 italic">No contacts yet for this lead.</p>
//       ) : (
//         <ul className="space-y-2">
//           {contactsToShow.map((c) => (
//             <li
//               key={c.id}
//               className="bg-white p-4 rounded shadow flex justify-between items-center"
//             >
//               <div>
//                 <p className="font-medium">
//                   {c.first_name} {c.last_name}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {c.email} | {c.phone}
//                 </p>
//               </div>
//               <div className="space-x-2">
//                 <Button variant="outline" onClick={() => openForm(c)}>
//                   Edit
//                 </Button>
//                 <Button variant="danger" onClick={() => handleDelete(c.id)}>
//                   Delete
//                 </Button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       <ContactForm
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         editingContact={editingContact}
//         currentLeadId={currentLeadId}
//       />
//     </div>
//   );
// }


// // src/components/Contacts/ContactList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  deleteContact,
} from "../../store/slices/contactSlice.js";
import ContactForm from "./ContactForm.jsx";
import Button from "../Shared/Button.jsx";

export default function ContactList({ currentLeadId }) {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.contacts);
  const [editingContact, setEditingContact] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // fetch all contacts once
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // only show contacts for the current lead
  const contactsToShow = items.filter((c) => c.lead_id === currentLeadId);

  const openForm = (contact = null) => {
    setEditingContact(contact);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this contact?")) {
      dispatch(deleteContact(id));
    }
  };

  if (status === "loading") return <p>Loading contacts…</p>;
  if (status === "failed")  return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-4">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Contacts</h2>
        <Button onClick={() => openForm()}>+ Add Contact</Button>
      </div>

      {/* List */}
      {contactsToShow.length === 0 ? (
        <p className="text-gray-500 italic">No contacts for this lead.</p>
      ) : (
        <ul className="space-y-2">
          {contactsToShow.map((c) => (
            <li
              key={c.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  {c.first_name} {c.last_name}
                </p>
                <p className="text-sm text-gray-500">
                  {c.email} | {c.phone}
                </p>
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openForm(c)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal Form */}
      <ContactForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        editingContact={editingContact}
        currentLeadId={currentLeadId}
      />
    </div>
  );
}
