// // src/components/Opportunities/OpportunityForm.jsx

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createOpportunity, updateOpportunity } from "../../store/slices/opportunitySlice";
// import Button from "../Shared/Button";
// import Select from "react-select";

// export default function OpportunityForm({
//   isOpen,
//   onClose,
//   editingOpportunity,
//   leads,
//   accounts,
//   opportunities,
// }) {
//   const dispatch = useDispatch();
//   const { status, error } = useSelector((state) => state.opportunities);

//   const [form, setForm] = useState({
//     name: "",
//     stage: "",
//     amount: "",
//     close_date: "",
//     lead_id: "",
//     account_id: "",
//     parent_id: "",
//   });

//   const [leadSearch, setLeadSearch] = useState("");
//   const [accountSearch, setAccountSearch] = useState("");
//   const [parentSearch, setParentSearch] = useState("");

//   const [leadMenuIsOpen, setLeadMenuIsOpen] = useState(false);
//   const [accountMenuIsOpen, setAccountMenuIsOpen] = useState(false);
//   const [parentMenuIsOpen, setParentMenuIsOpen] = useState(false);

//   useEffect(() => {
//     if (editingOpportunity) {
//       setForm({
//         name: editingOpportunity.name || "",
//         stage: editingOpportunity.stage || "",
//         amount: editingOpportunity.amount?.toString() || "",
//         close_date: editingOpportunity.close_date?.slice(0, 10) || "",
//         lead_id: editingOpportunity.lead_id || "",
//         account_id: editingOpportunity.account_id || "",
//         parent_id: editingOpportunity.parent_id || "",
//       });
//     } else {
//       setForm({
//         name: "",
//         stage: "",
//         amount: "",
//         close_date: "",
//         lead_id: "",
//         account_id: "",
//         parent_id: "",
//       });
//     }
//   }, [editingOpportunity]);

//   useEffect(() => setLeadMenuIsOpen(leadSearch.length > 0), [leadSearch]);
//   useEffect(() => setAccountMenuIsOpen(accountSearch.length > 0), [accountSearch]);
//   useEffect(() => setParentMenuIsOpen(parentSearch.length > 0), [parentSearch]);

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

//     const payload = {
//       ...form,
//       amount: parseFloat(form.amount),
//       lead_id: form.lead_id || null,
//       account_id: form.account_id || null,
//       parent_id: form.parent_id || null,
//     };

//     if (editingOpportunity) {
//       dispatch(updateOpportunity({ id: editingOpportunity.id, data: payload }));
//     } else {
//       dispatch(createOpportunity(payload));
//     }

//     onClose();
//   };

//   const leadOptions = leads
//     .filter(
//       (l) =>
//         l.source?.toLowerCase().includes(leadSearch.toLowerCase()) ||
//         l.status?.toLowerCase().includes(leadSearch.toLowerCase())
//     )
//     .map((l) => ({ value: l.id, label: l.source || l.status || l.id.slice(0, 8) }));

//   const accountOptions = accounts
//     .filter((a) => a.name?.toLowerCase().includes(accountSearch.toLowerCase()))
//     .map((a) => ({ value: a.id, label: a.name }));

//   const parentOptions = opportunities
//     .filter((o) => o.name?.toLowerCase().includes(parentSearch.toLowerCase()))
//     .map((o) => ({ value: o.id, label: o.name }));

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-cyan-900 backdrop-blur-md border border-white/20 text-white p-8 rounded-2xl shadow-xl space-y-4"
//       >
//         <h3 className="text-2xl font-extrabold text-center bg-gradient-to-r from-sky-300 via-teal-300 to-purple-300 text-transparent bg-clip-text">
//           {editingOpportunity ? "Edit Opportunity" : "Add New Opportunity"}
//         </h3>

//         {/* Basic Fields */}
//         {[
//           { label: "Name", name: "name", type: "text", placeholder: "Opportunity Name" },
//           { label: "Stage", name: "stage", type: "text", placeholder: "Sales Stage" },
//           { label: "Amount", name: "amount", type: "number", placeholder: "Opportunity Value ($)" },
//           { label: "Close Date", name: "close_date", type: "date" },
//         ].map(({ label, name, type, placeholder }) => (
//           <input
//             key={name}
//             name={name}
//             type={type}
//             placeholder={placeholder}
//             value={form[name]}
//             onChange={handleChange}
//             required={name !== "amount"}
//             className="w-full px-4 py-3 rounded-md bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-sky-300"
//           />
//         ))}

//         {/* Lead Select */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Assign to Lead</label>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Search leads..."
//               className="flex-grow px-3 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-300"
//               value={leadSearch}
//               onChange={(e) => setLeadSearch(e.target.value)}
//               style={{ maxWidth: 150 }}
//             />
//             <div style={{ flex: 1 }}>
//               <Select
//                 options={leadOptions}
//                 value={leadOptions.find((opt) => opt.value === form.lead_id) || null}
//                 onChange={(selected) =>
//                   setForm((f) => ({ ...f, lead_id: selected?.value || "", account_id: "" }))
//                 }
//                 isClearable
//                 placeholder="Select a lead"
//                 menuIsOpen={leadMenuIsOpen}
//                 onMenuClose={() => setLeadMenuIsOpen(false)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Account Select */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Assign to Account</label>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Search accounts..."
//               className="flex-grow px-3 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-300"
//               value={accountSearch}
//               onChange={(e) => setAccountSearch(e.target.value)}
//               style={{ maxWidth: 150 }}
//             />
//             <div style={{ flex: 1 }}>
//               <Select
//                 options={accountOptions}
//                 value={accountOptions.find((opt) => opt.value === form.account_id) || null}
//                 onChange={(selected) =>
//                   setForm((f) => ({ ...f, account_id: selected?.value || "", lead_id: "" }))
//                 }
//                 isClearable
//                 placeholder="Select an account"
//                 menuIsOpen={accountMenuIsOpen}
//                 onMenuClose={() => setAccountMenuIsOpen(false)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Parent Opportunity Select */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Parent Opportunity (optional)</label>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Search opportunities..."
//               className="flex-grow px-3 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-300"
//               value={parentSearch}
//               onChange={(e) => setParentSearch(e.target.value)}
//               style={{ maxWidth: 150 }}
//             />
//             <div style={{ flex: 1 }}>
//               <Select
//                 options={parentOptions}
//                 value={parentOptions.find((opt) => opt.value === form.parent_id) || null}
//                 onChange={(selected) =>
//                   setForm((f) => ({ ...f, parent_id: selected?.value || "" }))
//                 }
//                 isClearable
//                 placeholder="Select parent opportunity"
//                 menuIsOpen={parentMenuIsOpen}
//                 onMenuClose={() => setParentMenuIsOpen(false)}
//               />
//             </div>
//           </div>
//         </div>

//         {error && <p className="text-red-400">{error}</p>}

//         <div className="flex justify-end gap-3 pt-4">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={onClose}
//             className="bg-white/10 hover:bg-white/20 text-white border border-white/30"
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 text-white font-semibold py-2 px-4 rounded hover:from-cyan-500 hover:to-indigo-500 transition"
//             disabled={status === "loading"}
//           >
//             {editingOpportunity ? "Update Opportunity" : "Create Opportunity"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOpportunity,
  updateOpportunity,
} from "../../store/slices/opportunitySlice";
import Button from "../Shared/Button";
import Select from "react-select";

export default function OpportunityForm({
  isOpen,
  onClose,
  editingOpportunity,
  leads,
  accounts,
  opportunities,
}) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.opportunities);

  const [form, setForm] = useState({
    name: "",
    stage: "",
    amount: "",
    close_date: "",
    lead_id: "",
    account_id: "",
    parent_id: "",
  });

  const [leadSearch, setLeadSearch] = useState("");
  const [accountSearch, setAccountSearch] = useState("");
  const [parentSearch, setParentSearch] = useState("");

  // Control react-select menus opening based on search inputs
  const [leadMenuIsOpen, setLeadMenuIsOpen] = useState(false);
  const [accountMenuIsOpen, setAccountMenuIsOpen] = useState(false);
  const [parentMenuIsOpen, setParentMenuIsOpen] = useState(false);

  // Initialize form when editingOpportunity changes
  useEffect(() => {
    if (editingOpportunity) {
      setForm({
        name: editingOpportunity.name || "",
        stage: editingOpportunity.stage || "",
        amount: editingOpportunity.amount?.toString() || "",
        close_date: editingOpportunity.close_date?.slice(0, 10) || "",
        lead_id: editingOpportunity.lead_id || "",
        account_id: editingOpportunity.account_id || "",
        parent_id: editingOpportunity.parent_id || "",
      });
    } else {
      setForm({
        name: "",
        stage: "",
        amount: "",
        close_date: "",
        lead_id: "",
        account_id: "",
        parent_id: "",
      });
    }
  }, [editingOpportunity]);

  // Functions to open one menu and close the others
  const openLeadMenu = () => {
    setLeadMenuIsOpen(true);
    setAccountMenuIsOpen(false);
    setParentMenuIsOpen(false);
  };

  const openAccountMenu = () => {
    setLeadMenuIsOpen(false);
    setAccountMenuIsOpen(true);
    setParentMenuIsOpen(false);
  };

  const openParentMenu = () => {
    setLeadMenuIsOpen(false);
    setAccountMenuIsOpen(false);
    setParentMenuIsOpen(true);
  };

  // Handlers for search inputs to open relevant menus and set search state
  const handleLeadSearchChange = (e) => {
    setLeadSearch(e.target.value);
    openLeadMenu();
  };

  const handleAccountSearchChange = (e) => {
    setAccountSearch(e.target.value);
    openAccountMenu();
  };

  const handleParentSearchChange = (e) => {
    setParentSearch(e.target.value);
    openParentMenu();
  };

  // Basic input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Submit handler with validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that only one of lead_id or account_id is selected
    if (form.lead_id && form.account_id) {
      alert("Please select either a Lead or an Account, not both.");
      return;
    }

    const payload = {
      ...form,
      amount: form.amount ? parseFloat(form.amount) : null,
      lead_id: form.lead_id || null,
      account_id: form.account_id || null,
      parent_id: form.parent_id || null,
    };

    if (editingOpportunity) {
      dispatch(updateOpportunity({ id: editingOpportunity.id, data: payload }));
    } else {
      dispatch(createOpportunity(payload));
    }

    onClose();
  };

  // Filter and map options for react-select
  const leadOptions = leads
    .filter(
      (l) =>
        l.source?.toLowerCase().includes(leadSearch.toLowerCase()) ||
        l.status?.toLowerCase().includes(leadSearch.toLowerCase())
    )
    .map((l) => ({
      value: l.id,
      label: l.source || l.status || l.id.slice(0, 8),
    }));

  const accountOptions = accounts
    .filter((a) => a.name?.toLowerCase().includes(accountSearch.toLowerCase()))
    .map((a) => ({ value: a.id, label: a.name }));

  const parentOptions = opportunities
    .filter((o) => o.name?.toLowerCase().includes(parentSearch.toLowerCase()))
    .map((o) => ({ value: o.id, label: o.name }));

  if (!isOpen) return null;

  // Shared input style for search fields
  const searchInputStyle =
    "flex-grow px-3 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-300";

  // Common react-select styles for consistency
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
          {editingOpportunity ? "Edit Opportunity" : "Add New Opportunity"}
        </h3>

        {/* Basic Inputs */}
        {[
          { label: "Name", name: "name", type: "text", placeholder: "Opportunity Name" },
          { label: "Stage", name: "stage", type: "text", placeholder: "Sales Stage" },
          { label: "Amount", name: "amount", type: "number", placeholder: "Opportunity Value ($)" },
          { label: "Close Date", name: "close_date", type: "date" },
        ].map(({ label, name, type, placeholder }) => (
          <input
            key={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={form[name]}
            onChange={handleChange}
            required={name !== "amount"}
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

        {/* Parent Opportunity Select */}
        <div>
          <label className="block text-sm font-medium mb-1">Parent Opportunity (optional)</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search opportunities..."
              className={searchInputStyle}
              value={parentSearch}
              onChange={handleParentSearchChange}
              onFocus={openParentMenu}
              style={{ maxWidth: 150 }}
            />
            <div style={{ flex: 1 }}>
              <Select
                styles={commonSelectStyles}
                options={parentOptions}
                value={parentOptions.find((opt) => opt.value === form.parent_id) || null}
                onChange={(selected) =>
                  setForm((f) => ({ ...f, parent_id: selected?.value || "" }))
                }
                isClearable
                placeholder="Select parent opportunity"
                menuIsOpen={parentMenuIsOpen}
                onMenuClose={() => setParentMenuIsOpen(false)}
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
            {editingOpportunity ? "Update Opportunity" : "Create Opportunity"}
          </Button>
        </div>
      </form>
    </div>
  );
}



// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createOpportunity,
//   updateOpportunity,
// } from "../../store/slices/opportunitySlice";
// import Button from "../Shared/Button";
// import Select from "react-select";

// export default function OpportunityForm({
//   isOpen,
//   onClose,
//   editingOpportunity,
//   leads,
//   accounts,
//   opportunities,
// }) {
//   const dispatch = useDispatch();
//   const { status, error } = useSelector((state) => state.opportunities);

//   const [form, setForm] = useState({
//     name: "",
//     stage: "",
//     amount: "",
//     close_date: "",
//     lead_id: "",
//     account_id: "",
//     parent_id: "",
//   });

//   const [leadSearch, setLeadSearch] = useState("");
//   const [accountSearch, setAccountSearch] = useState("");
//   const [parentSearch, setParentSearch] = useState("");

//   const [leadMenuIsOpen, setLeadMenuIsOpen] = useState(false);
//   const [accountMenuIsOpen, setAccountMenuIsOpen] = useState(false);
//   const [parentMenuIsOpen, setParentMenuIsOpen] = useState(false);

//   useEffect(() => {
//     if (editingOpportunity) {
//       setForm({
//         name: editingOpportunity.name || "",
//         stage: editingOpportunity.stage || "",
//         amount: editingOpportunity.amount?.toString() || "",
//         close_date: editingOpportunity.close_date?.slice(0, 10) || "",
//         lead_id: editingOpportunity.lead_id || "",
//         account_id: editingOpportunity.account_id || "",
//         parent_id: editingOpportunity.parent_id || "",
//       });
//     } else {
//       setForm({
//         name: "",
//         stage: "",
//         amount: "",
//         close_date: "",
//         lead_id: "",
//         account_id: "",
//         parent_id: "",
//       });
//     }
//   }, [editingOpportunity]);

//   useEffect(() => setLeadMenuIsOpen(leadSearch.length > 0), [leadSearch]);
//   useEffect(
//     () => setAccountMenuIsOpen(accountSearch.length > 0),
//     [accountSearch]
//   );
//   useEffect(() => setParentMenuIsOpen(parentSearch.length > 0), [parentSearch]);

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

//     const payload = {
//       ...form,
//       amount: parseFloat(form.amount),
//       lead_id: form.lead_id || null,
//       account_id: form.account_id || null,
//       parent_id: form.parent_id || null,
//     };

//     if (editingOpportunity) {
//       dispatch(updateOpportunity({ id: editingOpportunity.id, data: payload }));
//     } else {
//       dispatch(createOpportunity(payload));
//     }

//     onClose();
//   };

//   const leadOptions = leads
//     .filter(
//       (l) =>
//         l.source?.toLowerCase().includes(leadSearch.toLowerCase()) ||
//         l.status?.toLowerCase().includes(leadSearch.toLowerCase())
//     )
//     .map((l) => ({
//       value: l.id,
//       label: l.source || l.status || l.id.slice(0, 8),
//     }));

//   const accountOptions = accounts
//     .filter((a) => a.name?.toLowerCase().includes(accountSearch.toLowerCase()))
//     .map((a) => ({ value: a.id, label: a.name }));

//   const parentOptions = opportunities
//     .filter((o) => o.name?.toLowerCase().includes(parentSearch.toLowerCase()))
//     .map((o) => ({ value: o.id, label: o.name }));

//   if (!isOpen) return null;

//   // Common style for search inputs (same for all)
//   const searchInputStyle =
//     "flex-grow px-3 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-300";

//   // Custom react-select styles per Select component:

//   const commonSelectStyles = {
//     control: (provided, state) => ({
//       ...provided,
//       backgroundColor: "rgba(255, 255, 255, 0.1)",
//       border: "none",
//       borderRadius: "0.375rem",
//       minHeight: "42px",
//       boxShadow: state.isFocused
//         ? "0 0 0 2px rgba(255, 255, 255, 0.5)"
//         : "none",
//       color: "black",
//       transition: "all 0.2s ease",
//     }),
//     singleValue: (provided) => ({
//       ...provided,
//       color: "black",
//     }),
//     placeholder: (provided) => ({
//       ...provided,
//       color: "rgba(255, 255, 255, 0.6)",
//     }),
//     menu: (provided) => ({
//       ...provided,
//       backgroundColor: "rgba(10, 10, 65, 0.9)",
//       color: "black",
//       borderRadius: "0.375rem",
//     }),
//     menuList: (provided) => ({
//       ...provided,
//       maxHeight: "200px", // max height for scrollable dropdown
//       overflowY: "auto",
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isFocused
//         ? "rgba(255, 255, 255, 0.25)"
//         : "transparent",
//       color: state.isSelected ? "rgba(20, 100, 200, 1)" : "white",
//       cursor: "pointer",
//     }),
//     input: (provided) => ({
//       ...provided,
//       color: "white",
//     }),
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-cyan-900 backdrop-blur-md border border-white/20 text-white p-8 rounded-2xl shadow-xl space-y-4"
//       >
//         <h3 className="text-2xl font-extrabold text-center bg-gradient-to-r from-sky-300 via-teal-300 to-purple-300 text-transparent bg-clip-text">
//           {editingOpportunity ? "Edit Opportunity" : "Add New Opportunity"}
//         </h3>

//         {/* Basic Fields */}
//         {[
//           {
//             label: "Name",
//             name: "name",
//             type: "text",
//             placeholder: "Opportunity Name",
//           },
//           {
//             label: "Stage",
//             name: "stage",
//             type: "text",
//             placeholder: "Sales Stage",
//           },
//           {
//             label: "Amount",
//             name: "amount",
//             type: "number",
//             placeholder: "Opportunity Value ($)",
//           },
//           { label: "Close Date", name: "close_date", type: "date" },
//         ].map(({ label, name, type, placeholder }) => (
//           <input
//             key={name}
//             name={name}
//             type={type}
//             placeholder={placeholder}
//             value={form[name]}
//             onChange={handleChange}
//             required={name !== "amount"}
//             className="w-full px-4 py-3 rounded-md bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-sky-300"
//           />
//         ))}

//         {/* Lead Select */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Assign to Lead
//           </label>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Search leads..."
//               className={searchInputStyle}
//               value={leadSearch}
//               onChange={(e) => setLeadSearch(e.target.value)}
//               style={{ maxWidth: 150 }}
//             />
//             <div style={{ flex: 1 }}>
//               <Select
//                 styles={commonSelectStyles}
//                 options={leadOptions}
//                 value={
//                   leadOptions.find((opt) => opt.value === form.lead_id) || null
//                 }
//                 onChange={(selected) =>
//                   setForm((f) => ({
//                     ...f,
//                     lead_id: selected?.value || "",
//                     account_id: "",
//                   }))
//                 }
//                 isClearable
//                 placeholder="Select a lead"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Account Select */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Assign to Account
//           </label>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Search accounts..."
//               className={searchInputStyle}
//               value={accountSearch}
//               onChange={(e) => setAccountSearch(e.target.value)}
//               style={{ maxWidth: 150 }}
//             />
//             <div style={{ flex: 1 }}>
//               <Select
//                 styles={commonSelectStyles}
//                 options={accountOptions}
//                 value={
//                   accountOptions.find((opt) => opt.value === form.account_id) ||
//                   null
//                 }
//                 onChange={(selected) =>
//                   setForm((f) => ({
//                     ...f,
//                     account_id: selected?.value || "",
//                     lead_id: "",
//                   }))
//                 }
//                 isClearable
//                 placeholder="Select an account"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Parent Opportunity Select */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Parent Opportunity (optional)
//           </label>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Search opportunities..."
//               className={searchInputStyle}
//               value={parentSearch}
//               onChange={(e) => setParentSearch(e.target.value)}
//               style={{ maxWidth: 150 }}
//             />
//             <div style={{ flex: 1 }}>
//               <Select
//                 styles={commonSelectStyles}
//                 options={parentOptions}
//                 value={
//                   parentOptions.find((opt) => opt.value === form.parent_id) ||
//                   null
//                 }
//                 onChange={(selected) =>
//                   setForm((f) => ({ ...f, parent_id: selected?.value || "" }))
//                 }
//                 isClearable
//                 placeholder="Select parent opportunity"
//               />
//             </div>
//           </div>
//         </div>

//         {error && <p className="text-red-400">{error}</p>}

//         <div className="flex justify-end gap-3 pt-4">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={onClose}
//             className="bg-white/10 hover:bg-white/20 text-white border border-white/30"
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 text-white font-semibold py-2 px-4 rounded hover:from-cyan-500 hover:to-indigo-500 transition"
//             disabled={status === "loading"}
//           >
//             {editingOpportunity ? "Update Opportunity" : "Create Opportunity"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
