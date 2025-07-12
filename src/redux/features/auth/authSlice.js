import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser, login } from "./authAPI";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

// User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    const response = await login(credentials);
    return response;
  },
);

// Fetch Logged-in User
export const fetchLoggedInUser = createAsyncThunk(
  "auth/fetchLoggedInUser",
  async () => {
    const response = await fetchUser();
    return response;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Fetch Logged-in User
      .addCase(fetchLoggedInUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchLoggedInUser.rejected, (state) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;
