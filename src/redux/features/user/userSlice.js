import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUser, getUsers, updateUser } from "./userAPI";

const initialState = {
  user: {},
  users: {},
  status: "idle",
  error: null,
};

// Fetch all users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async (query) => {
  const response = await getUsers(query);
  return response;
});

// Update an existing user
export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (data) => {
    const response = await updateUser(data);
    return response;
  },
);

// Delete a user
export const deleteUserData = createAsyncThunk(
  "user/deleteUserData",
  async (id) => {
    const response = await deleteUser(id);
    return response;
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = {};
    },
    resetUsers: (state) => {
      state.users = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserData.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = {};
      })
      .addCase(deleteUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetUser, resetUsers } = userSlice.actions;

export default userSlice.reducer;
