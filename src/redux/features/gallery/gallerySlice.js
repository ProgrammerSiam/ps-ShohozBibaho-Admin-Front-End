import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createGallery,
  deleteGallery,
  getGalleries,
  getGalleryById,
  updateGallery,
} from "./galleryAPI";

const initialState = {
  gallery: {},
  galleries: {},
  status: "idle",
  error: null,
};

// Fetch all galleries
export const fetchGalleries = createAsyncThunk(
  "gallery/fetchGalleries",
  async (query) => {
    const response = await getGalleries(query);
    return response;
  },
);

// Fetch a single gallery by ID
export const fetchGalleryById = createAsyncThunk(
  "gallery/fetchGalleryById",
  async (id) => {
    const response = await getGalleryById(id);
    return response;
  },
);

// Add a new gallery
export const addGallery = createAsyncThunk(
  "gallery/addGallery",
  async (data) => {
    const response = await createGallery(data);
    return response;
  },
);

// Update an existing gallery
export const editGallery = createAsyncThunk(
  "gallery/editGallery",
  async (data) => {
    const response = await updateGallery(data);
    return response;
  },
);

// Delete a gallery
export const deleteGalleryData = createAsyncThunk(
  "gallery/deleteGalleryData",
  async (id) => {
    const response = await deleteGallery(id);
    return response;
  },
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    resetGallery: (state) => {
      state.gallery = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Galleries
      .addCase(fetchGalleries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGalleries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.galleries = action.payload;
      })
      .addCase(fetchGalleries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Fetch Single Gallery
      .addCase(fetchGalleryById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGalleryById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.gallery = action.payload;
      })
      .addCase(fetchGalleryById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Add Gallery
      .addCase(addGallery.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addGallery.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.gallery = action.payload;
      })
      .addCase(addGallery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Update Gallery
      .addCase(editGallery.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editGallery.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.gallery = action.payload;
      })
      .addCase(editGallery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Delete Gallery
      .addCase(deleteGalleryData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteGalleryData.fulfilled, (state) => {
        state.status = "succeeded";
        state.gallery = {};
      })
      .addCase(deleteGalleryData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetGallery } = gallerySlice.actions;
export default gallerySlice.reducer;
