import React, { useEffect, useState } from 'react';
import CRMLayout from '../components/Shared/CRMLayout';
import api from '../services/api';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        setNotes(res.data.data);
      } catch (err) {
        console.error('Error fetching notes', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <CRMLayout title="Notes">
      {loading ? (
        <p className="text-center text-gray-400">Loading notes…</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {notes.map((n) => (
            <div
              key={n.id}
              className="bg-glass-white backdrop-blur-xs p-4 rounded-lg border border-white/20 shadow-sm"
            >
              <p className="text-gray-200 whitespace-pre-wrap">{n.content}</p>
              <p className="text-xs text-gray-400 mt-2">
                Created: {new Date(n.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </CRMLayout>
  );
};

export default NotesPage;
