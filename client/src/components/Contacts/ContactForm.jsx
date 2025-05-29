// // src/components/Contacts/ContactForm.jsx

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createContact,
//   updateContact,
// } from "../../store/slices/contactSlice.js";
// import Button from "../Shared/Button.jsx";
// import Select from "react-select";

// export default function ContactForm({
//   isOpen,
//   onClose,
//   editingContact,
//   leads,
//   accounts,
// }) {
//   const dispatch = useDispatch();
//   const [leadMenuIsOpen, setLeadMenuIsOpen] = useState(false);
//   const { status, error } = useSelector((s) => s.contacts);
//   const [accountMenuIsOpen, setAccountMenuIsOpen] = useState(false);



//   const [form, setForm] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     lead_id: "",
//     account_id: "",
//   });

//   const [leadSearch, setLeadSearch] = useState("");
//   const [accountSearch, setAccountSearch] = useState("");

//   useEffect(() => {
//     if (editingContact) {
//       setForm({
//         first_name: editingContact.first_name || "",
//         last_name: editingContact.last_name || "",
//         email: editingContact.email || "",
//         phone: editingContact.phone || "",
//         lead_id: editingContact.lead_id || "",
//         account_id: editingContact.account_id || "",
//       });
//     } else {
//       setForm({
//         first_name: "",
//         last_name: "",
//         email: "",
//         phone: "",
//         lead_id: "",
//         account_id: "",
//       });
//     }
//   }, [editingContact]);

//   useEffect(() => {
//     if (leadSearch.length > 0) {
//       setLeadMenuIsOpen(true);
//     } else {
//       setLeadMenuIsOpen(false);
//     }
//   }, [leadSearch]);

//     useEffect(() => {
//     if (accountSearch.length > 0) {
//       setAccountMenuIsOpen(true);
//     } else {
//       setAccountMenuIsOpen(false);
//     }
//   }, [accountSearch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((f) => ({ ...f, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (form.lead_id && form.account_id) {
//       alert("Please select either a Lead or an Account, not both.");
//       return;
//     }

//     const payload = { ...form };

//     if (editingContact) {
//       dispatch(updateContact({ id: editingContact.id, payload }));
//     } else {
//       dispatch(createContact(payload));
//     }

//     onClose();
//   };

//   const filteredLeads = leads.filter(
//     (l) =>
//       (l.source && l.source.toLowerCase().includes(leadSearch.toLowerCase())) ||
//       (l.status && l.status.toLowerCase().includes(leadSearch.toLowerCase()))
//   );

//   const filteredAccounts = accounts.filter((a) =>
//     a.name?.toLowerCase().includes(accountSearch.toLowerCase())
//   );

//   const leadOptions = filteredLeads.map((l) => ({
//     value: l.id,
//     label: l.source || l.status || l.id.slice(0, 8),
//   }));

//   const accountOptions = filteredAccounts.map((a) => ({
//     value: a.id,
//     label: a.name,
//   }));

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
//       >
//         <h3 className="text-xl font-semibold">
//           {editingContact ? "Edit Contact" : "Add Contact"}
//         </h3>

//         {["first_name", "last_name", "email", "phone"].map((field) => (
//           <div key={field}>
//             <label className="block text-sm font-medium">
//               {field.replace("_", " ").toUpperCase()}
//             </label>
//             <input
//               name={field}
//               type={field === "email" ? "email" : "text"}
//               value={form[field]}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//         ))}

//         {/* Lead Search + Selector */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Assign to Lead
//           </label>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="flex-grow px-3 py-2 border rounded"
//               value={leadSearch}
//               onChange={(e) => setLeadSearch(e.target.value)}
//               style={{ maxWidth: 150 }}
//             />
//             <div style={{ flex: 1 }}>
//               <Select
//                 options={leadOptions}
//                 value={
//                   leadOptions.find((opt) => opt.value === form.lead_id) || null
//                 }
//                 onChange={(selected) => {
//                   setForm((f) => ({
//                     ...f,
//                     lead_id: selected?.value || "",
//                     account_id: "",
//                   }));
//                   setLeadMenuIsOpen(false); // Close after selection
//                   setLeadSearch(""); // Optional: clear search after select
//                 }}
//                 isClearable
//                 placeholder="Select a lead"
//                 menuIsOpen={leadMenuIsOpen}
//                 onMenuClose={() => setLeadMenuIsOpen(false)}
//               />
//             </div>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Assign to Account
//           </label>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="flex-grow px-3 py-2 border rounded"
//               value={accountSearch}
//               onChange={(e) => setAccountSearch(e.target.value)}
//               style={{ maxWidth: 150 }}
//             />
//             <div style={{ flex: 1 }}>
//               <Select
//                 options={accountOptions}
//                 value={
//                   accountOptions.find((opt) => opt.value === form.account_id) ||
//                   null
//                 }
//                 onChange={(selected) => {
//                   setForm((f) => ({
//                     ...f,
//                     account_id: selected?.value || "",
//                     lead_id: "",
//                   }));
//                   setAccountMenuIsOpen(false);
//                   setAccountSearch("");
//                 }}
//                 isClearable
//                 placeholder="Select an account"
//                 menuIsOpen={accountMenuIsOpen}
//                 onMenuClose={() => setAccountMenuIsOpen(false)}
//               />
//             </div>
//           </div>
//         </div>

//         {error && <p className="text-red-600">{error}</p>}

//         <div className="flex justify-end gap-3">
//           <Button type="button" variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button type="submit" disabled={status === "loading"}>
//             {editingContact ? "Save" : "Add"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createContact, updateContact } from "../../store/slices/contactSlice.js";
import Button from "../Shared/Button.jsx";
import Select from "react-select";

export default function ContactForm({ isOpen, onClose, editingContact, leads, accounts }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((s) => s.contacts);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    lead_id: "",
    account_id: "",
  });

  const [leadSearch, setLeadSearch] = useState("");
  const [accountSearch, setAccountSearch] = useState("");

  const [leadMenuIsOpen, setLeadMenuIsOpen] = useState(false);
  const [accountMenuIsOpen, setAccountMenuIsOpen] = useState(false);

  // Only one menu open at a time helpers
  const openLeadMenu = () => {
    setLeadMenuIsOpen(true);
    setAccountMenuIsOpen(false);
  };
  const openAccountMenu = () => {
    setLeadMenuIsOpen(false);
    setAccountMenuIsOpen(true);
  };

  useEffect(() => {
    if (editingContact) {
      setForm({
        first_name: editingContact.first_name || "",
        last_name: editingContact.last_name || "",
        email: editingContact.email || "",
        phone: editingContact.phone || "",
        lead_id: editingContact.lead_id || "",
        account_id: editingContact.account_id || "",
      });
    } else {
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        lead_id: "",
        account_id: "",
      });
    }
  }, [editingContact]);

  // Open menus on typing or focus, close the other menu
  const handleLeadSearchChange = (e) => {
    setLeadSearch(e.target.value);
    openLeadMenu();
  };
  const handleAccountSearchChange = (e) => {
    setAccountSearch(e.target.value);
    openAccountMenu();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.lead_id && form.account_id) {
      alert("Please select either a Lead or an Account, not both.");
      return;
    }

    const payload = { ...form };

    if (editingContact) {
      dispatch(updateContact({ id: editingContact.id, payload }));
    } else {
      dispatch(createContact(payload));
    }

    onClose();
  };

  const leadOptions = leads
    .filter(
      (l) =>
        (l.source && l.source.toLowerCase().includes(leadSearch.toLowerCase())) ||
        (l.status && l.status.toLowerCase().includes(leadSearch.toLowerCase()))
    )
    .map((l) => ({
      value: l.id,
      label: l.source || l.status || l.id.slice(0, 8),
    }));

  const accountOptions = accounts
    .filter((a) => a.name?.toLowerCase().includes(accountSearch.toLowerCase()))
    .map((a) => ({ value: a.id, label: a.name }));

  if (!isOpen) return null;

  // Shared styles from OpportunityForm style approach
  const searchInputStyle =
    "flex-grow px-3 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-300";

  const commonSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "none",
      borderRadius: "0.375rem",
      minHeight: "42px",
      boxShadow: state.isFocused
        ? "0 0 0 2px rgba(255, 255, 255, 0.5)"
        : "none",
      color: "black",
      transition: "all 0.2s ease",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "rgba(255, 255, 255, 0.6)",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgba(10, 10, 65, 0.9)",
      color: "black",
      borderRadius: "0.375rem",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "200px",
      overflowY: "auto",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgba(255, 255, 255, 0.25)"
        : "transparent",
      color: state.isSelected ? "rgba(20, 100, 200, 1)" : "white",
      cursor: "pointer",
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-cyan-900 backdrop-blur-md border border-white/20 text-white p-8 rounded-2xl shadow-xl space-y-4"
      >
        <h3 className="text-2xl font-extrabold text-center bg-gradient-to-r from-sky-300 via-teal-300 to-purple-300 text-transparent bg-clip-text">
          {editingContact ? "Edit Contact" : "Add New Contact"}
        </h3>

        {["first_name", "last_name", "email", "phone"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "email" ? "email" : "text"}
            placeholder={field.replace("_", " ").toUpperCase()}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        ))}

        {/* Lead Select */}
        <div>
          <label className="block text-sm font-medium mb-1">Assign to Lead</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search leads..."
              className={searchInputStyle}
              value={leadSearch}
              onChange={handleLeadSearchChange}
              onFocus={openLeadMenu}
              style={{ maxWidth: 150 }}
            />
            <div style={{ flex: 1 }}>
              <Select
                styles={commonSelectStyles}
                options={leadOptions}
                value={leadOptions.find((opt) => opt.value === form.lead_id) || null}
                onChange={(selected) =>
                  setForm((f) => ({
                    ...f,
                    lead_id: selected?.value || "",
                    account_id: "",
                  }))
                }
                isClearable
                placeholder="Select a lead"
                menuIsOpen={leadMenuIsOpen}
                onMenuClose={() => setLeadMenuIsOpen(false)}
              />
            </div>
          </div>
        </div>

        {/* Account Select */}
        <div>
          <label className="block text-sm font-medium mb-1">Assign to Account</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search accounts..."
              className={searchInputStyle}
              value={accountSearch}
              onChange={handleAccountSearchChange}
              onFocus={openAccountMenu}
              style={{ maxWidth: 150 }}
            />
            <div style={{ flex: 1 }}>
              <Select
                styles={commonSelectStyles}
                options={accountOptions}
                value={accountOptions.find((opt) => opt.value === form.account_id) || null}
                onChange={(selected) =>
                  setForm((f) => ({
                    ...f,
                    account_id: selected?.value || "",
                    lead_id: "",
                  }))
                }
                isClearable
                placeholder="Select an account"
                menuIsOpen={accountMenuIsOpen}
                onMenuClose={() => setAccountMenuIsOpen(false)}
              />
            </div>
          </div>
        </div>

        {error && <p className="text-red-400">{error}</p>}

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 text-white font-semibold py-2 px-4 rounded hover:from-cyan-500 hover:to-indigo-500 transition"
            disabled={status === "loading"}
          >
            {editingContact ? "Save Contact" : "Add Contact"}
          </Button>
        </div>
      </form>
    </div>
  );
}
