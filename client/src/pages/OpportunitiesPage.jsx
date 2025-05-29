


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpportunities } from "../store/slices/opportunitySlice";
import { fetchLeads } from "../store/slices/leadSlice";
import { fetchAccounts } from "../store/slices/accountSlice";
import OpportunityForm from "../components/Opportunities/OpportunityForm";
import OpportunityList from "../components/Opportunities/OpportunityList";

export default function OpportunitiesPage() {
  const dispatch = useDispatch();
  const { items: opportunities } = useSelector((state) => state.opportunities);
  const { items: leads } = useSelector((state) => state.leads);
  const { items: accounts } = useSelector((state) => state.accounts);

  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchOpportunities());
    dispatch(fetchLeads());
    dispatch(fetchAccounts());
  }, [dispatch]);

  return (
    <div className="p-4">
      <OpportunityList
        currentLeadId={null}
        onEdit={(op) => {
          setEditingOpportunity(op);
          setIsFormOpen(true);
        }}
        onAddNew={() => {
          setEditingOpportunity(null);
          setIsFormOpen(true);
        }}
      />

      <OpportunityForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingOpportunity={editingOpportunity}
        leads={leads}
        accounts={accounts}
        opportunities={opportunities}
      />
    </div>
  );
}
