// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAccounts, deleteAccount } from "../store/slices/accountSlice";
// import AccountForm from "../components/Accounts/AccountForm";
// import AccountList from "../components/Accounts/AccountList";
// import Button from "../components/Shared/Button";

// export default function AccountsPage() {
//   const dispatch = useDispatch();
//   const { items: accounts, status, error } = useSelector((s) => s.accounts);

//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editing, setEditing] = useState(null);

//   useEffect(() => {
//     if (status === "idle") dispatch(fetchAccounts());
//   }, [dispatch, status]);

//   const handleEdit = (acct) => {
//     setEditing(acct);
//     setIsFormOpen(true);
//   };
//   const handleDelete = (id) => {
//     if (window.confirm("Delete this account?")) {
//       dispatch(deleteAccount(id));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white p-6">
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-extrabold text-primary">Accounts</h2>
//           <Button
//             variant="primary"
//             onClick={() => { setEditing(null); setIsFormOpen(true); }}
//           >
//             + Add Account
//           </Button>
//         </div>

//         {/* List */}
//         {status === "loading" ? (
//           <p className="text-center">Loading accounts…</p>
//         ) : error ? (
//           <p className="text-red-500 text-center">Error: {error}</p>
//         ) : (
//           <AccountList
//             accounts={accounts}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         )}
//       </div>

//       {/* Modal Form */}
//       <AccountForm
//         isOpen={isFormOpen}
//         onClose={() => setIsFormOpen(false)}
//         editing={editing}
//       />
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts, deleteAccount } from "../store/slices/accountSlice";
import AccountForm from "../components/Accounts/AccountForm";
import AccountList from "../components/Accounts/AccountList";
import Button from "../components/Shared/Button";

export default function AccountsPage() {
  const dispatch = useDispatch();
  const { items: accounts, status, error } = useSelector((s) => s.accounts);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (status === "idle") dispatch(fetchAccounts());
  }, [dispatch, status]);

  const handleEdit = (acct) => {
    setEditing(acct);
    setIsFormOpen(true);
  };
  const handleDelete = (id) => {
    if (window.confirm("Delete this account?")) {
      dispatch(deleteAccount(id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f2ff] via-[#cbe2ee] to-[#edf6fa] text-black p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-cyan-600 to-indigo-500">
            Accounts
          </h2>
          <Button
            variant="primary"
            onClick={() => {
              setEditing(null);
              setIsFormOpen(true);
            }}
            className="px-6 py-2 bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition"
          >
            + Add Account
          </Button>
        </div>

        {/* List Card */}
        <div className="rounded-xl bg-white backdrop-blur-sm border border-white/40 shadow-xl ring-1 ring-sky-700/30 p-6">
          {status === "loading" ? (
            <p className="text-center text-gray-500">Loading accounts…</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : (
            <AccountList
              accounts={accounts}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {/* Modal Form */}
      <AccountForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editing={editing}
      />
    </div>
  );
}
