// src/pages/LeadsPage.jsx

import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import NoteList from "../components/Notes/NoteList.jsx";
import TaskList from "../components/Tasks/TaskList.jsx";
import ActivityList from "../components/Activities/ActivityList.jsx";
import ReportList from "../components/Reports/ReportList.jsx";

const tabNames = ["Notes", "Tasks", "Activities", "Reports"];

export default function LeadDetails() {
  const { id: leadId } = useParams();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Lead Details — #{leadId}</h1>

      <Tab.Group>
        <Tab.List className="flex space-x-4 border-b mb-4">
          {tabNames.map(tab => (
            <Tab key={tab} className={({ selected }) =>
              classNames(
                "py-2 px-4 text-sm font-medium",
                selected
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-black"
              )
            }>
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <NoteList leadId={leadId} />
          </Tab.Panel>
          <Tab.Panel>
            <TaskList leadId={leadId} />
          </Tab.Panel>
          <Tab.Panel>
            <ActivityList leadId={leadId} />
          </Tab.Panel>
          <Tab.Panel>
            <ReportList leadId={leadId} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
