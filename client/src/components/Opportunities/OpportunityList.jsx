import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpportunities, deleteOpportunity } from "../../store/slices/opportunitySlice.js";
import OpportunityForm from "./OpportunityForm.jsx";
import Button from "../Shared/Button.jsx";

export default function OpportunityList({ currentLeadId }) {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.opportunities);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState(null);

  useEffect(() => {
    dispatch(fetchOpportunities());
  }, [dispatch]);

  const handleEdit = opportunity => {
    setEditingOpportunity(opportunity);
    setIsFormOpen(true);
  };

  const handleDelete = id => {
    if (window.confirm("Delete this opportunity?")) {
      dispatch(deleteOpportunity(id));
    }
  };

  const filtered = currentLeadId
    ? items.filter(i => i.lead_id === currentLeadId)
    : items;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Opportunities</h3>
        <Button onClick={() => {
          setEditingOpportunity(null);
          setIsFormOpen(true);
        }}>+ Add</Button>
      </div>

      {status === "loading" ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No opportunities yet.</p>
      ) : (
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Stage</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Close Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(op => (
              <tr key={op.id}>
                <td className="p-2 border">{op.name}</td>
                <td className="p-2 border">{op.stage}</td>
                <td className="p-2 border">{op.amount}</td>
                <td className="p-2 border">{op.close_date?.slice(0,10)}</td>
                <td className="p-2 border space-x-2">
                  <Button size="sm" onClick={() => handleEdit(op)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(op.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <OpportunityForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingOpportunity={editingOpportunity}
        currentLeadId={currentLeadId}
      />
    </div>
  );
}
