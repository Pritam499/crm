
import React from "react";

const OpportunityDetails = ({ children, opportunity }) => {
  if (!opportunity) return <p>Loading opportunity details...</p>;

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-2">{opportunity.name || "Opportunity Details"}</h1>
      <p><strong>Stage:</strong> {opportunity.stage || "N/A"}</p>
      <p><strong>Amount:</strong> ${opportunity.amount?.toLocaleString() || "0"}</p>
      <p><strong>Close Date:</strong> {opportunity.close_date ? opportunity.close_date.slice(0, 10) : "N/A"}</p>
      <hr className="my-4" />
      {children}
    </div>
  );
};

export default OpportunityDetails;
