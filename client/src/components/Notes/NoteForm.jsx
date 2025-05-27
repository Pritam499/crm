import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote, updateNote } from "../../store/slices/noteSlice.js";
import Button from "../Shared/Button.jsx";

export default function NoteForm({ isOpen, onClose, editingNote, currentLeadId }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.notes);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) setContent(editingNote.content);
  }, [editingNote]);

  const handleSubmit = e => {
    e.preventDefault();
    const payload = { lead_id: currentLeadId, content };
    if (editingNote) {
      dispatch(updateNote({ id: editingNote.id, data: payload }));
    } else {
      dispatch(createNote(payload));
    }
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
        <h3 className="text-xl font-semibold">
          {editingNote ? "Edit Note" : "Add Note"}
        </h3>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          rows={4}
          className="w-full px-3 py-2 border rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">{status==="loading"?"Saving...":"Save"}</Button>
        </div>
      </form>
    </div>
  );
}
