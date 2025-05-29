import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchOpportunities = createAsyncThunk("opportunities/fetch", async () => {
  const { data } = await api.get("/opportunities");
  return data;
});

export const createOpportunity = createAsyncThunk("opportunities/create", async (form) => {
  const { data } = await api.post("/opportunities", form);
  return data;
});

export const updateOpportunity = createAsyncThunk("opportunities/update", async ({ id, data: form }) => {
  const { data } = await api.put(`/opportunities/${id}`, form);
  return data;
});

export const deleteOpportunity = createAsyncThunk("opportunities/delete", async (id) => {
  await api.delete(`/opportunities/${id}`);
  return id;
});

const opportunitySlice = createSlice({
  name: "opportunities",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOpportunities.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchOpportunities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchOpportunities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createOpportunity.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateOpportunity.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteOpportunity.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      });
  },
});

export default opportunitySlice.reducer;
