// // src/pages/OpportunityDetailsPage.jsx


import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OpportunityDetails from "../pages/OpportunityDetails";
import TaskList from "../components/Opportunities/Tasks/TaskList";
import TaskForm from "../components/Opportunities/Tasks/TaskForm";
import NoteList from "../components/Opportunities/Notes/NoteList";
import NoteForm from "../components/Opportunities/Notes/NoteForm";
import ActivityList from "../components/Opportunities/Activities/ActivityList";
import ActivityForm from "../components/Opportunities/Activities/ActivityForm";
import { fetchOpportunityById } from "../store/slices/opportunitySlice";
import { fetchTasksByOpportunityId } from "../store/slices/taskSlice";
import { fetchNotesByOpportunityId } from "../store/slices/noteSlice";
import { fetchActivitiesByOpportunityId } from "../store/slices/activitySlice";

const OpportunityDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Convert id to number if needed (optional)
  const idNum = Number(id);

  const opportunity = useSelector(state =>
    state.opportunities.items.find(op => op.id === idNum)
  );

  useEffect(() => {
    dispatch(fetchOpportunityById(idNum));
    dispatch(fetchTasksByOpportunityId(idNum));
    dispatch(fetchNotesByOpportunityId(idNum));
    dispatch(fetchActivitiesByOpportunityId(idNum));
  }, [dispatch, idNum]);

  if (!opportunity) {
    return <p>Loading opportunity details...</p>;
  }

  return (
    <OpportunityDetails opportunity={opportunity}>
      <h2>Tasks</h2>
      <TaskList opportunityId={idNum} />
      <TaskForm opportunityId={idNum} />

      <h2>Notes</h2>
      <NoteList opportunityId={idNum} />
      <NoteForm opportunityId={idNum} />

      <h2>Activities</h2>
      <ActivityList opportunityId={idNum} />
      <ActivityForm opportunityId={idNum} />
    </OpportunityDetails>
  );
};

export default OpportunityDetailsPage;
