import axiosInstance from "@/utils/axiosInstance";

// Get, Search & Pagination
export const getGalleries = async (query) => {
  try {
    const response = await axiosInstance.get(
      `/gallery?currentPage=${query.currentPage || 1}&limit=${query.limit || 10}&search=${query.search || ""}`,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Create a new gallery
export const createGallery = async (data) => {
  try {
    const response = await axiosInstance.post("/gallery", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Update a gallery
export const updateGallery = async (data) => {
  try {
    const response = await axiosInstance.put(`/gallery/${data.id}`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Delete a gallery
export const deleteGallery = async (id) => {
  try {
    const response = await axiosInstance.delete(`/gallery/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Get a single gallery by ID
export const getGalleryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/gallery/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
