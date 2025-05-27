import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, deleteLead } from "../../store/slices/leadSlice";
import DataTable from "../Shared/DataTable";
import Button from "../Shared/Button";
import { useNavigate } from "react-router-dom";

export default function LeadList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: leads, status } = useSelector(state => state.leads);

  useEffect(() => {
    if (status === "idle") dispatch(fetchLeads());
  }, [dispatch, status]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      dispatch(deleteLead(id));
    }
  };

  const columns = [
    { Header: "Source",    accessor: "source" },
    { Header: "Status",    accessor: "status" },
    { Header: "Value ($)", accessor: "value" },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button onClick={() => navigate(`/leads/${row.original.id}`)}>View</Button>
          <Button onClick={() => handleDelete(row.original.id)} variant="outline">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4">
      <DataTable columns={columns} data={leads} />
    </div>
  );
}
