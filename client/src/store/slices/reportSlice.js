import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchReports = createAsyncThunk("reports/fetch", async () => {
  const { data } = await api.get("/reports");
  return data;
});

export const createReport = createAsyncThunk("reports/create", async (form) => {
  const { data } = await api.post("/reports", form);
  return data;
});

export const updateReport = createAsyncThunk("reports/update", async ({ id, data: form }) => {
  const { data } = await api.put(`/reports/${id}`, form);
  return data;
});

export const deleteReport = createAsyncThunk("reports/delete", async (id) => {
  await api.delete(`/reports/${id}`);
  return id;
});

const reportSlice = createSlice({
  name: "reports",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchReports.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateReport.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      });
  },
});

export default reportSlice.reducer;
