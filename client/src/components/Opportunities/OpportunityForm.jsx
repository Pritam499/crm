import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOpportunity, updateOpportunity } from "../../store/slices/opportunitySlice.js";
import Button from "../Shared/Button.jsx";

export default function OpportunityForm({ isOpen, onClose, editingOpportunity, currentLeadId }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.opportunities);
  const [form, setForm] = useState({
    name: "",
    stage: "",
    amount: "",
    close_date: ""
  });

  useEffect(() => {
    if (editingOpportunity) {
      setForm({
        name:        editingOpportunity.name,
        stage:       editingOpportunity.stage,
        amount:      editingOpportunity.amount,
        close_date:  editingOpportunity.close_date.slice(0,10)
      });
    }
  }, [editingOpportunity]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      lead_id:    currentLeadId,
      name:       form.name,
      stage:      form.stage,
      amount:     parseFloat(form.amount),
      close_date: form.close_date
    };
    if (editingOpportunity) {
      dispatch(updateOpportunity({ id: editingOpportunity.id, data: payload }));
    } else {
      dispatch(createOpportunity(payload));
    }
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
        <h3 className="text-xl font-semibold">
          {editingOpportunity ? "Edit Opportunity" : "Add Opportunity"}
        </h3>

        {[
          {label:"Name", name:"name", type:"text"},
          {label:"Stage",name:"stage",type:"text"},
          {label:"Amount",name:"amount",type:"number"},
          {label:"Close Date",name:"close_date",type:"date"},
        ].map(({label,name,type})=>(
          <div key={name}>
            <label className="block text-sm font-medium">{label}</label>
            <input
              name={name}
              type={type}
              value={form[name]}
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
