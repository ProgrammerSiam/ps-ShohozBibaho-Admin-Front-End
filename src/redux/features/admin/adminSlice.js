import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdmins,
  updateAdmin,
} from "./adminAPI";

const initialState = {
  admin: {},
  admins: {},
  status: "idle",
  error: null,
};

// Create new admin
export const createNewAdmin = createAsyncThunk(
  "admin/createNewAdmin",
  async (data) => {
    const response = await createAdmin(data);
    return response;
  },
);

// Fetch all users
export const fetchAdmins = createAsyncThunk(
  "admin/fetchAdmins",
  async (query) => {
    const response = await getAdmins(query);
    return response;
  },
);

// get single admin
export const fetchSingleData = createAsyncThunk(
  "admin/fetchSingleData",
  async (data) => {
    const response = await getAdmin(data);
    return response;
  },
);

// Update an existing admin
export const updateAdminData = createAsyncThunk(
  "admin/updateAdminData",
  async (data) => {
    const response = await updateAdmin(data);
    return response;
  },
);

// Delete a Admin
export const deleteAdminData = createAsyncThunk(
  "admin/deleteAdminData",
  async (id) => {
    const response = await deleteAdmin(id);
    return response;
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdmin: (state) => {
      state.admin = {};
    },
    resetAdmins: (state) => {
      state.admins = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admin = action.payload;
      })
      .addCase(createNewAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchAdmins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchSingleData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admin = action.payload;
      })
      .addCase(fetchSingleData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateAdminData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAdminData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateAdminData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteAdminData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAdminData.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = {};
      })
      .addCase(deleteAdminData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetAdmin, resetAdmins } = adminSlice.actions;

export default adminSlice.reducer;
