import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../services/api";

export const fetchContacts = createAsyncThunk('contacts/fetch', async () => {
  const res = await api.get('/contacts');
  return res.data;
});

export const createContact = createAsyncThunk('contacts/create', async (data) => {
  const res = await api.post('/contacts', data);
  return res.data;
});

export const updateContact = createAsyncThunk('contacts/update', async ({ id, data }) => {
  const res = await api.put(`/contacts/${id}`, data);
  return res.data;
});

export const deleteContact = createAsyncThunk('contacts/delete', async (id) => {
  await api.delete(`/contacts/${id}`);
  return id;
});

const contactSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const i = state.items.findIndex(c => c.id === action.payload.id);
        if (i !== -1) state.items[i] = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  }
});

export default contactSlice.reducer;
