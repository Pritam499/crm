// src/pages/ActivitiesPage.jsx
import React, { useState } from "react";
import CRMLayout from "../components/Shared/CRMLayout";
import ActivityList from "../components/Opportunities/Activities/ActivityList";
import ActivityForm from "../components/Opportunities/Activities/ActivityForm";

const ActivitiesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  // Called by ActivityList on edit
  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setIsFormOpen(true);
  };

  // Called by "Add New" button or elsewhere
  const handleAddNew = () => {
    setEditingActivity(null);
    setIsFormOpen(true);
  };

  return (
    <CRMLayout title="Activities">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ActivityList onEdit={handleEdit} onAddNew={handleAddNew} />
        </div>

        {/* Sidebar with Add New button */}
        <div className="bg-gray-800 bg-opacity-30 rounded-lg p-4 backdrop-blur-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Add New Activity</h2>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + New Activity
          </button>
        </div>
      </div>

      {/* Modal form */}
      <ActivityForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingActivity={editingActivity}
      />
    </CRMLayout>
  );
};

export default ActivitiesPage;
