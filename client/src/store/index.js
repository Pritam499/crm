import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import leadReducer from "./slices/leadSlice";
import contactReducer from "./slices/contactSlice";
import opportunityReducer from "./slices/opportunitySlice";
import taskReducer from "./slices/taskSlice";
import noteReducer from "./slices/noteSlice";
import activityReducer from "./slices/activitySlice";
import reportReducer from "./slices/reportSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,          // ← added auth slice
    leads: leadReducer,
    contacts: contactReducer,
    opportunities: opportunityReducer,
    tasks: taskReducer,
    notes: noteReducer,
    activities: activityReducer,
    reports: reportReducer,
  },
});

export default store;
