// src/contexts/accountSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// Async thunks for API calls
export const fetchAccounts = createAsyncThunk("accounts/fetchAll", async () => {
  const response = await API.get("/accounts");
  return response.data;
});

export const fetchAccountById = createAsyncThunk("accounts/fetchById", async (id) => {
  const response = await API.get(`/accounts/${id}`);
  return response.data;
});

export const createAccount = createAsyncThunk("accounts/create", async (accountData) => {
  const response = await API.post("/accounts", accountData);
  return response.data;
});

export const updateAccount = createAsyncThunk(
  "accounts/update",
  async ({ id, data }) => {
    const response = await API.put(`/accounts/${id}`, data);
    return response.data;
  }
);

export const deleteAccount = createAsyncThunk("accounts/delete", async (id) => {
  await API.delete(`/accounts/${id}`);
  return id;
});

const accountSlice = createSlice({
  name: "accounts",
  initialState: {
    items: [],
    currentAccount: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearCurrentAccount(state) {
      state.currentAccount = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAccounts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Fetch by id
      .addCase(fetchAccountById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAccountById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentAccount = action.payload;
      })
      .addCase(fetchAccountById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Create
      .addCase(createAccount.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Update
      .addCase(updateAccount.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex((acc) => acc.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        // If currentAccount is updated, update it too
        if (state.currentAccount?.id === action.payload.id) {
          state.currentAccount = action.payload;
        }
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Delete
      .addCase(deleteAccount.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((acc) => acc.id !== action.payload);
        if (state.currentAccount?.id === action.payload) {
          state.currentAccount = null;
        }
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentAccount } = accountSlice.actions;

export default accountSlice.reducer;
