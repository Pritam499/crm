// // src/pages/LeadsPage.jsx

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLeads } from "../store/slices/leadSlice.js";
// import Layout from "../components/Shared/Layout.jsx";
// import DataTable from "../components/Shared/DataTable.jsx";
// import Button from "../components/Shared/Button.jsx";
// import LeadForm from "../components/Leads/LeadForm.jsx";

// export default function LeadsPage() {
//   const dispatch = useDispatch();
//   const { items: leads } = useSelector(state => state.leads);

//   useEffect(() => {
//     dispatch(fetchLeads());
//   }, [dispatch]);

//   const columns = [
//     { Header: "Source",    accessor: "source" },
//     { Header: "Status",    accessor: "status" },
//     { Header: "Value ($)", accessor: "value" },
//     {
//       actions: [
//         ({ row }) => <Button>Edit</Button>,
//         ({ row }) => <Button variant="outline">Delete</Button>,
//       ],
//     },
//   ];

//   return (
//     <Layout>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">Leads</h2>
//         <Button onClick={() => {/* open LeadForm modal */}}>Add Lead</Button>
//       </div>
//       <DataTable columns={columns} data={leads} />
//       <LeadForm />
//     </Layout>
//   );
// }


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLeads, deleteLead } from "../store/slices/leadSlice.js";
import DataTable  from "../components/Shared/DataTable.jsx";
import Button     from "../components/Shared/Button.jsx";
import LeadForm   from "../components/Leads/LeadForm.jsx";

export default function LeadsPage() {
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const { items: leads, status } = useSelector(s => s.leads);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const columns = [
    { Header: "Source", accessor: "source" },
    { Header: "Status", accessor: "status" },
    { Header: "Value ($)", accessor: "value" },
    {
      actions: [
        ({ row }) => (
          <Button size="sm" onClick={() => navigate(`/leads/${row.id}`)}>
            View
          </Button>
        ),
        ({ row }) => (
          <Button size="sm" onClick={() => { setEditingLead(row); setIsFormOpen(true); }}>
            Edit
          </Button>
        ),
        ({ row }) => (
          <Button size="sm" variant="danger" onClick={() => dispatch(deleteLead(row.id))}>
            Delete
          </Button>
        ),
      ],
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Leads</h2>
        <Button onClick={() => { setEditingLead(null); setIsFormOpen(true); }}>
          Add Lead
        </Button>
      </div>

      {status === "loading" ? (
        <p>Loading…</p>
      ) : (
        <DataTable columns={columns} data={leads} />
      )}

      <LeadForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingLead={editingLead}
        currentLeadId={null}
      />
    </>
  );
}
