// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchNotes, deleteNote } from "../../store/slices/noteSlice";
// import NoteForm from "./NoteForm.jsx";
// import Button from "../Shared/Button.jsx";

// export default function NoteList({ currentLeadId }) {
//   const dispatch = useDispatch();
//   const { items, status } = useSelector(state => state.notes);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingNote, setEditingNote] = useState(null);

//   useEffect(() => {
//     dispatch(fetchNotes());
//   }, [dispatch]);

//   const handleEdit = note => {
//     setEditingNote(note);
//     setIsFormOpen(true);
//   };

//   const handleDelete = id => {
//     if (window.confirm("Delete this note?")) {
//       dispatch(deleteNote(id));
//     }
//   };

//   const filtered = currentLeadId
//     ? items.filter(i => i.lead_id === currentLeadId)
//     : items;

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-2">
//         <h3 className="text-lg font-semibold">Notes</h3>
//         <Button onClick={() => {
//           setEditingNote(null);
//           setIsFormOpen(true);
//         }}>+ Add</Button>
//       </div>

//       {status === "loading" ? (
//         <p>Loading...</p>
//       ) : filtered.length === 0 ? (
//         <p>No notes found.</p>
//       ) : (
//         <ul className="space-y-2">
//           {filtered.map(note => (
//             <li key={note.id} className="p-3 bg-gray-50 rounded border">
//               <div className="text-sm whitespace-pre-wrap">{note.content}</div>
//               <div className="flex justify-end gap-2 mt-2">
//                 <Button size="sm" onClick={() => handleEdit(note)}>Edit</Button>
//                 <Button size="sm" variant="danger" onClick={() => handleDelete(note.id)}>Delete</Button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       <NoteForm
//         isOpen={isFormOpen}
//         onClose={() => setIsFormOpen(false)}
//         editingNote={editingNote}
//         currentLeadId={currentLeadId}
//       />
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchNotes, deleteNote } from "../../../store/slices/noteSlice.js";
// import NoteForm from "./NoteForm.jsx";
// import Button from "../../Shared/Button.jsx";

// export default function NoteList({ currentLeadId }) {
//   const dispatch = useDispatch();

//   // Items might be an object like: { data: [...] }
//   const { items = {}, status } = useSelector((state) => state.notes);
//   const allNotes = Array.isArray(items) ? items : items.data || [];

//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingNote, setEditingNote] = useState(null);

//   useEffect(() => {
//     dispatch(fetchNotes());
//   }, [dispatch]);

//   const handleEdit = (note) => {
//     setEditingNote(note);
//     setIsFormOpen(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Delete this note?")) {
//       dispatch(deleteNote(id));
//     }
//   };

//   const filtered = currentLeadId
//     ? allNotes.filter((i) => i.lead_id === currentLeadId)
//     : allNotes;

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-2">
//         <h3 className="text-lg font-semibold">Notes</h3>
//         <Button
//           onClick={() => {
//             setEditingNote(null);
//             setIsFormOpen(true);
//           }}
//         >
//           + Add
//         </Button>
//       </div>

//       {status === "loading" ? (
//         <p>Loading...</p>
//       ) : filtered.length === 0 ? (
//         <p>No notes found.</p>
//       ) : (
//         <ul className="space-y-2">
//           {filtered.map((note) => (
//             <li key={note.id} className="p-3 bg-gray-50 rounded border">
//               <div className="text-sm whitespace-pre-wrap">{note.content}</div>
//               <div className="flex justify-end gap-2 mt-2">
//                 <Button size="sm" onClick={() => handleEdit(note)}>
//                   Edit
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="danger"
//                   onClick={() => handleDelete(note.id)}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       <NoteForm
//         isOpen={isFormOpen}
//         onClose={() => setIsFormOpen(false)}
//         editingNote={editingNote}
//         currentLeadId={currentLeadId}
//       />
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotesByOpportunityId, deleteNote } from "../../../store/slices/noteSlice.js";
import NoteForm from "./NoteForm.jsx";
import Button from "../../Shared/Button.jsx";

export default function NoteList({ opportunityId }) {
  const dispatch = useDispatch();
  const { items = [], status } = useSelector((state) => state.notes);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    if (opportunityId) {
      dispatch(fetchNotesByOpportunityId(opportunityId));
    }
  }, [dispatch, opportunityId]);

  const handleEdit = (note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this note?")) {
      dispatch(deleteNote(id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Notes</h3>
        <Button
          onClick={() => {
            setEditingNote(null);
            setIsFormOpen(true);
          }}
        >
          + Add
        </Button>
      </div>

      {status === "loading" ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((note) => (
            <li key={note.id} className="p-3 bg-gray-50 rounded border">
              <div className="text-sm whitespace-pre-wrap">{note.content}</div>
              <div className="flex justify-end gap-2 mt-2">
                <Button size="sm" onClick={() => handleEdit(note)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(note.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <NoteForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingNote={editingNote}
        opportunityId={opportunityId}
      />
    </div>
  );
}
