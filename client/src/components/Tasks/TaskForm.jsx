import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../../store/slices/taskSlice.js";
import Button from "../Shared/Button.jsx";

export default function TaskForm({ isOpen, onClose, editingTask, currentLeadId }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.tasks);
  const [form, setForm] = useState({
    title: "",
    due_date: "",
    completed: false
  });

  useEffect(() => {
    if (editingTask) {
      setForm({
        title:      editingTask.title,
        due_date:   editingTask.due_date.slice(0,10),
        completed:  editingTask.completed
      });
    }
  }, [editingTask]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type==="checkbox"?checked:value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      lead_id:   currentLeadId,
      title:     form.title,
      due_date:  form.due_date,
      completed: form.completed
    };
    if (editingTask) {
      dispatch(updateTask({ id: editingTask.id, data: payload }));
    } else {
      dispatch(createTask(payload));
    }
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
        <h3 className="text-xl font-semibold">
          {editingTask ? "Edit Task" : "Add Task"}
        </h3>

        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <input
            name="due_date"
            type="date"
            value={form.due_date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="flex items-center">
          <input
            id="completed"
            name="completed"
            type="checkbox"
            checked={form.completed}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <label htmlFor="completed" className="ml-2 text-sm">Completed</label>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">{status==="loading"?"Saving...":"Save"}</Button>
        </div>
      </form>
    </div>
  );
}
