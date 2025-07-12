import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createDynamicPage,
  deleteDynamicPage,
  getDynamicPage,
  getDynamicPages,
  updateDynamicPage,
} from "./dynamicPageAPI";

const initialState = {
  page: {},
  pages: {},
  status: "idle",
  error: null,
};

// Create new page
export const createNewDynamicPage = createAsyncThunk(
  "page/createNewDynamicPage",
  async (data) => {
    const response = await createDynamicPage(data);
    return response;
  },
);

// Fetch all users
export const fetchDynamicPages = createAsyncThunk(
  "page/fetchDynamicPages",
  async (query) => {
    const response = await getDynamicPages(query);
    return response;
  },
);

// get single page
export const fetchDynamicPage = createAsyncThunk(
  "page/fetchDynamicPage",
  async (slug) => {
    const response = await getDynamicPage(slug);
    return response;
  },
);

// Update an existing page
export const updateDynamicPageById = createAsyncThunk(
  "page/updateDynamicPageById",
  async (id) => {
    const response = await updateDynamicPage(id);
    return response;
  },
);

// Delete a Page
export const deleteDynamicPageById = createAsyncThunk(
  "page/deleteDynamicPageById",
  async (id) => {
    const response = await deleteDynamicPage(id);
    return response;
  },
);

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    resetPage: (state) => {
      state.page = {};
    },
    resetPages: (state) => {
      state.pages = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewDynamicPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewDynamicPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.page = action.payload;
      })
      .addCase(createNewDynamicPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchDynamicPages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDynamicPages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pages = action.payload;
      })
      .addCase(fetchDynamicPages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchDynamicPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDynamicPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.page = action.payload;
      })
      .addCase(fetchDynamicPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateDynamicPageById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDynamicPageById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.page = action.payload;
      })
      .addCase(updateDynamicPageById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteDynamicPageById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDynamicPageById.fulfilled, (state) => {
        state.status = "succeeded";
        state.page = {};
      })
      .addCase(deleteDynamicPageById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetPage, resetPages } = pageSlice.actions;

export default pageSlice.reducer;
