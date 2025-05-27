import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/apis";

// Async Thunks
export const fetchLeads = createAsyncThunk("leads/fetchAll", async () => {
  const res = await leads.fetchAll();
  return res.data;
});

export const createLead = createAsyncThunk("leads/create", async (data) => {
  const res = await leads.create(data);
  return res.data;
});

export const updateLead = createAsyncThunk("leads/update", async ({ id, data }) => {
  const res = await leads.update(id, data);
  return res.data;
});

export const deleteLead = createAsyncThunk("leads/delete", async (id) => {
  await leads.delete(id);
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
