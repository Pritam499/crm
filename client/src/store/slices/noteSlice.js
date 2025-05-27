import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/apis";

export const fetchNotes = createAsyncThunk("notes/fetch", async () => {
  const { data } = await api.get("/notes");
  return data;
});

export const createNote = createAsyncThunk("notes/create", async (form) => {
  const { data } = await api.post("/notes", form);
  return data;
});

export const updateNote = createAsyncThunk("notes/update", async ({ id, data: form }) => {
  const { data } = await api.put(`/notes/${id}`, form);
  return data;
});

export const deleteNote = createAsyncThunk("notes/delete", async (id) => {
  await api.delete(`/notes/${id}`);
  return id;
});

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNotes.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      });
  },
});

export default noteSlice.reducer;
