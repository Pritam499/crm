// src/pages/ContactsPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact } from "../store/slices/contactSlice";
import { fetchLeads } from "../store/slices/leadSlice";
import { fetchAccounts } from "../store/slices/accountSlice";
import ContactForm from "../components/Contacts/ContactForm";
import Button from "../components/Shared/Button";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const { items: contacts, status } = useSelector((s) => s.contacts);
  const leads = useSelector((s) => s.leads.items);
  const accounts = useSelector((s) => s.accounts.items);

  const [filter, setFilter] = useState("all"); // all|lead|account|unassigned
  const [selectedId, setSelectedId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(fetchLeads());
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this contact?")) {
      dispatch(deleteContact(id));
    }
  };
  const openForm = (contact = null) => {
    setEditing(contact);
    setIsOpen(true);
  };

  const list = contacts.filter((c) => {
    switch (filter) {
      case "lead":
        return selectedId ? c.lead_id === selectedId : !!c.lead_id;
      case "account":
        return selectedId ? c.account_id === selectedId : !!c.account_id;
      case "unassigned":
        return !c.lead_id && !c.account_id;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f2ff] via-[#cbe2ee] to-[#edf6fa] text-black p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-cyan-600 to-indigo-500">
            Contacts
          </h2>
          <Button
            variant="primary"
            onClick={() => {
              setEditing(null);
              setIsOpen(true);
            }}
            className="px-6 py-2 bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition"
          >
            + Add Contact
          </Button>
        </div>

        {/* Filters + List Card */}
        <div className="rounded-xl bg-white backdrop-blur-sm border border-white/40 shadow-xl ring-1 ring-sky-700/30 p-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setSelectedId("");
              }}
              className="border border-sky-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="all">All Contacts</option>
              <option value="lead">By Lead</option>
              <option value="account">By Account</option>
              <option value="unassigned">Unassigned</option>
            </select>

            {filter === "lead" && (
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="border border-sky-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="">— Select Lead —</option>
                {leads.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.source || l.status || l.id.slice(0, 8)}
                  </option>
                ))}
              </select>
            )}

            {filter === "account" && (
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="border border-sky-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="">— Select Account —</option>
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* List */}
          {status === "loading" ? (
            <p className="text-center text-gray-500">Loading contacts…</p>
          ) : list.length === 0 ? (
            <p className="text-center text-gray-500 italic py-6">
              No contacts found.
            </p>
          ) : (
            <ul className="space-y-3">
              {list.map((c) => (
                <li
                  key={c.id}
                  className="bg-white p-4 rounded shadow flex justify-between items-center border border-sky-100 hover:border-sky-300 transition"
                >
                  <div>
                    <p className="font-medium text-sky-700">
                      {c.first_name} {c.last_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {c.email} | {c.phone}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {c.lead_id ? (
                        <>
                          Lead:{" "}
                          {c.lead?.source || c.lead?.status || c.lead_id.slice(0, 8)}
                        </>
                      ) : c.account_id ? (
                        <>Account: {c.account?.name || c.account_id.slice(0, 8)}</>
                      ) : (
                        "Unassigned"
                      )}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-sky-600 text-white hover:bg-sky-400"
                      onClick={() => openForm(c)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="bg-rose-700 text-white hover:bg-red-600"
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        editingContact={editing}
        leads={leads}
        accounts={accounts}
      />
    </div>
  );
}
