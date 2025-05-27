import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports, deleteReport } from "../../store/slices/reportSlice";
import ReportForm from "./ReportForm.jsx";
import Button from "../Shared/Button.jsx";

export default function ReportList() {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.reports);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReport, setEditingReport] = useState(null);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const handleEdit = (report) => {
    setEditingReport(report);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this report?")) {
      dispatch(deleteReport(id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Reports</h3>
        <Button onClick={() => {
          setEditingReport(null);
          setIsFormOpen(true);
        }}>+ Add</Button>
      </div>

      {status === "loading" ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul className="space-y-3">
          {items.map(report => (
            <li key={report.id} className="p-4 bg-gray-50 rounded border">
              <div className="font-semibold">{report.name} ({report.type})</div>
              <pre className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-x-auto">
                Params: {JSON.stringify(report.params, null, 2)}
              </pre>
              <pre className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-x-auto">
                Result: {JSON.stringify(report.result, null, 2)}
              </pre>
              <div className="flex justify-end gap-2 mt-2">
                <Button size="sm" onClick={() => handleEdit(report)}>Edit</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(report.id)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ReportForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingReport={editingReport}
      />
    </div>
  );
}
