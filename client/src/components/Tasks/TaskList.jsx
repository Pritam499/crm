import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../../store/slices/taskSlice";
import TaskForm from "./TaskForm.jsx";
import Button from "../Shared/Button.jsx";

export default function TaskList({ currentLeadId }) {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.tasks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleEdit = task => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDelete = id => {
    if (window.confirm("Delete this task?")) {
      dispatch(deleteTask(id));
    }
  };

  const filtered = currentLeadId
    ? items.filter(i => i.lead_id === currentLeadId)
    : items;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Tasks</h3>
        <Button onClick={() => {
          setEditingTask(null);
          setIsFormOpen(true);
        }}>+ Add</Button>
      </div>

      {status === "loading" ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Due Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(task => (
              <tr key={task.id}>
                <td className="p-2 border">{task.title}</td>
                <td className="p-2 border">{task.due_date?.slice(0, 10)}</td>
                <td className="p-2 border">{task.status}</td>
                <td className="p-2 border space-x-2">
                  <Button size="sm" onClick={() => handleEdit(task)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(task.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingTask={editingTask}
        currentLeadId={currentLeadId}
      />
    </div>
  );
}
