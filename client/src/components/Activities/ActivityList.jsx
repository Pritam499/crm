import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities, deleteActivity } from "../../store/slices/activitySlice";
import ActivityForm from "./ActivityForm.jsx";
import Button from "../Shared/Button.jsx";

export default function ActivityList({ currentLeadId }) {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.activities);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this activity?")) {
      dispatch(deleteActivity(id));
    }
  };

  const filtered = currentLeadId
    ? items.filter(i => i.lead_id === currentLeadId)
    : items;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Activities</h3>
        <Button onClick={() => {
          setEditingActivity(null);
          setIsFormOpen(true);
        }}>+ Add</Button>
      </div>

      {status === "loading" ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <ul className="space-y-2">
          {filtered.map(activity => (
            <li key={activity.id} className="p-3 bg-gray-50 rounded border">
              <div className="text-sm font-semibold">Type: {activity.type}</div>
              <pre className="text-xs bg-gray-100 p-2 mt-1 rounded overflow-x-auto">
                {JSON.stringify(activity.details, null, 2)}
              </pre>
              <div className="flex justify-end gap-2 mt-2">
                <Button size="sm" onClick={() => handleEdit(activity)}>Edit</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(activity.id)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ActivityForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingActivity={editingActivity}
        currentLeadId={currentLeadId}
      />
    </div>
  );
}
