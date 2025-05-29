import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Async Thunks
export const fetchLeads = createAsyncThunk("leads/fetchAll", async () => {
  const res = await api.get("/leads");
  return res.data;
});

export const createLead = createAsyncThunk("leads/create", async (data) => {
  const res = await api.post("/leads", data);
  return res.data;
});

export const updateLead = createAsyncThunk("leads/update", async ({ id, data }) => {
  const res = await api.put(`/leads/${id}`, data);
  return res.data;
});

export const deleteLead = createAsyncThunk("leads/delete", async (id) => {
  await api.delete(`/leads/${id}`);
  return id;
});

// Slice
const leadSlice = createSlice({
  name: "leads",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        const index = state.items.findIndex(lead => lead.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.items = state.items.filter(lead => lead.id !== action.payload);
      });
  },
});

export default leadSlice.reducer;
