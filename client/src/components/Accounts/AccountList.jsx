import React from "react";
import Button from "../Shared/Button";

export default function AccountList({ accounts, onEdit, onDelete }) {
  if (!accounts.length) {
    return (
      <div className="text-center text-gray-500 italic py-6">
        No accounts yet.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {accounts.map((a) => (
        <li
          key={a.id}
          className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold">{a.name}</h3>
            {a.industry && (
              <p className="text-sm text-gray-600">Industry: {a.industry}</p>
            )}
            {a.website && (
              <p className="text-sm text-gray-600">
                Website: <a href={a.website} className="underline">{a.website}</a>
              </p>
            )}
          </div>
          <div className="space-x-2">
            <Button className="bg-sky-600 text-white hover:bg-sky-400" variant="outline" size="sm" onClick={() => onEdit(a)}>
              Edit
            </Button>
            <Button className="bg-rose-700 text-white hover:bg-red-600" variant="danger" size="sm" onClick={() => onDelete(a.id)}>
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
