import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const { data } = await api.get("/tasks");
  return data;
});

export const createTask = createAsyncThunk("tasks/create", async (form) => {
  const { data } = await api.post("/tasks", form);
  return data;
});

export const updateTask = createAsyncThunk("tasks/update", async ({ id, data: form }) => {
  const { data } = await api.put(`/tasks/${id}`, form);
  return data;
});

export const deleteTask = createAsyncThunk("tasks/delete", async (id) => {
  await api.delete(`/tasks/${id}`);
  return id;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;