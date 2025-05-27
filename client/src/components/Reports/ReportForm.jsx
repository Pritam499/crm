import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReport, updateReport } from "../../store/slices/reportSlice.js";
import Button from "../Shared/Button.jsx";

export default function ReportForm({ isOpen, onClose, editingReport, currentLeadId }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.reports);
  const [form, setForm] = useState({
    name: "",
    type: "",
    params: "{}",
    result: "{}"
  });

  useEffect(() => {
    if (editingReport) {
      setForm({
        name: editingReport.name,
        type: editingReport.type,
        params: JSON.stringify(editingReport.params, null, 2),
        result: JSON.stringify(editingReport.result, null, 2),
      });
    }
  }, [editingReport]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    let paramsObj = {}, resultObj = {};
    try {
      paramsObj = JSON.parse(form.params);
      resultObj = JSON.parse(form.result);
    } catch {
      return; // ideally show JSON parse error
    }
    const payload = {
      name: form.name,
      type: form.type,
      params: paramsObj,
      result: resultObj
    };
    if (editingReport) {
      dispatch(updateReport({ id: editingReport.id, data: payload }));
    } else {
      dispatch(createReport(payload));
    }
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-xl space-y-4">
        <h3 className="text-xl font-semibold">
          {editingReport ? "Edit Report" : "Add Report"}
        </h3>

        {["name","type"].map(field=>(
          <div key={field}>
            <label className="block text-sm font-medium">{field.charAt(0).toUpperCase()+field.slice(1)}</label>
            <input
              name={field}
              type="text"
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ))}

        {[
          {label:"Params (JSON)", name:"params"},
          {label:"Result (JSON)", name:"result"}
        ].map(({label,name})=>(
          <div key={name}>
            <label className="block text-sm font-medium">{label}</label>
            <textarea
              name={name}
              rows={6}
              value={form[name]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded font-mono"
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