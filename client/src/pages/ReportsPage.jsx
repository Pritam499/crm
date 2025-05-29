import React, { useEffect, useState } from 'react';
import CRMLayout from '../components/Shared/CRMLayout';
import api from '../services/api';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get('/reports');
        setReports(res.data.data);
      } catch (err) {
        console.error('Error fetching reports', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <CRMLayout title="Reports">
      {loading ? (
        <p className="text-center text-gray-400">Loading reports…</p>
      ) : (
        <ul className="space-y-4">
          {reports.map((r) => (
            <li
              key={r.id}
              className="bg-glass-white backdrop-blur-xs p-4 rounded-xl shadow-md border border-white/20"
            >
              <p className="font-semibold">{r.name}</p>
              <p className="text-xs text-gray-300">
                Type: {r.type || '—'}
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-indigo-300">
                  View Result
                </summary>
                <pre className="text-xs text-gray-100 mt-1 overflow-auto max-h-32">
                  {JSON.stringify(r.result, null, 2)}
                </pre>
              </details>
            </li>
          ))}
        </ul>
      )}
    </CRMLayout>
  );
};

export default ReportsPage;
