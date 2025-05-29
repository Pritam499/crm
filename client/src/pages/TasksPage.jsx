import React, { useEffect, useState } from 'react';
import CRMLayout from '../components/Shared/CRMLayout';
import api from '../services/api';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        setTasks(res.data.data);
      } catch (err) {
        console.error('Error fetching tasks', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <CRMLayout title="Tasks">
      {loading ? (
        <p className="text-center text-gray-400">Loading tasks…</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="bg-glass-white backdrop-blur-xs p-4 rounded-xl shadow-md border border-white/20 transition hover:scale-[1.01]"
            >
              <div className="flex justify-between items-center">
                <p className="font-medium">{t.title}</p>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    t.completed ? 'bg-green-600' : 'bg-yellow-500'
                  }`}
                >
                  {t.completed ? 'Done' : 'Pending'}
                </span>
              </div>
              {t.due_date && (
                <p className="text-sm text-gray-300 mt-2">
                  Due: {new Date(t.due_date).toLocaleDateString()}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </CRMLayout>
  );
};

export default TasksPage;
