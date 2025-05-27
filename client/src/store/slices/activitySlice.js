import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../services/api";
import api from "../../services/apis";

export const fetchActivities = createAsyncThunk("activities/fetch", async () => {
  const { data } = await api.get("/activities");
  return data;
});

export const createActivity = createAsyncThunk("activities/create", async (form) => {
  const { data } = await api.post("/activities", form);
  return data;
});

export const updateActivity = createAsyncThunk("activities/update", async ({ id, data: form }) => {
  const { data } = await api.put(`/activities/${id}`, form);
  return data;
});

export const deleteActivity = createAsyncThunk("activities/delete", async (id) => {
  await api.delete(`/activities/${id}`);
  return id;
});

const activitySlice = createSlice({
  name: "activities",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchActivities.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      });
  },
});

export default activitySlice.reducer;
