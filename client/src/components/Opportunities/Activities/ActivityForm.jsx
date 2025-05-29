// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createActivity,
//   updateActivity,
// } from "../../../store/slices/activitySlice.js";
// import Button from "../../Shared/Button.jsx";

// export default function ActivityForm({
//   isOpen,
//   onClose,
//   editingActivity,
//   currentLeadId,
// }) {
//   const dispatch = useDispatch();
//   const { status, error } = useSelector((state) => state.activities);
//   const [form, setForm] = useState({ type: "", details: "{}" });

//   useEffect(() => {
//     if (editingActivity) {
//       setForm({
//         type: editingActivity.type,
//         details: JSON.stringify(editingActivity.details, null, 2),
//       });
//     }
//   }, [editingActivity]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((f) => ({ ...f, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let detailsObj = {};
//     try {
//       detailsObj = JSON.parse(form.details);
//     } catch {
//       return; // ideally show JSON parse error
//     }
//     const payload = {
//       lead_id: currentLeadId,
//       type: form.type,
//       details: detailsObj,
//     };
//     if (editingActivity) {
//       dispatch(updateActivity({ id: editingActivity.id, data: payload }));
//     } else {
//       dispatch(createActivity(payload));
//     }
//     onClose();
//   };

//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow w-full max-w-lg space-y-4"
//       >
//         <h3 className="text-xl font-semibold">
//           {editingActivity ? "Edit Activity" : "Add Activity"}
//         </h3>

//         <div>
//           <label className="block text-sm font-medium">Type</label>
//           <input
//             name="type"
//             type="text"
//             value={form.type}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Details (JSON)</label>
//           <textarea
//             name="details"
//             rows={6}
//             value={form.details}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border rounded font-mono"
//           />
//         </div>

//         {error && <p className="text-red-500">{error}</p>}

//         <div className="flex justify-end space-x-2">
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button type="submit">
//             {status === "loading" ? "Saving..." : "Save"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createActivity,
  updateActivity,
} from "../../../store/slices/activitySlice.js";
import Button from "../../Shared/Button.jsx";

export default function ActivityForm({
  isOpen,
  onClose,
  editingActivity,
  opportunityId,
}) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.activities);
  const [form, setForm] = useState({ type: "", details: "{}" });

  useEffect(() => {
    if (editingActivity) {
      setForm({
        type: editingActivity.type,
        details: JSON.stringify(editingActivity.details, null, 2),
      });
    }
  }, [editingActivity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let detailsObj = {};
    try {
      detailsObj = JSON.parse(form.details);
    } catch {
      alert("Details must be valid JSON.");
      return;
    }

    const payload = {
      opportunity_id: opportunityId,
      type: form.type,
      details: detailsObj,
    };

    if (editingActivity) {
      dispatch(updateActivity({ id: editingActivity.id, data: payload }));
    } else {
      dispatch(createActivity(payload));
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-lg space-y-4"
      >
        <h3 className="text-xl font-semibold">
          {editingActivity ? "Edit Activity" : "Add Activity"}
        </h3>

        <div>
          <label className="block text-sm font-medium">Type</label>
          <input
            name="type"
            type="text"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Details (JSON)</label>
          <textarea
            name="details"
            rows={6}
            value={form.details}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded font-mono"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {status === "loading" ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
