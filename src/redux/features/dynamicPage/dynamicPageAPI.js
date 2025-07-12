import axiosInstance from "@/utils/axiosInstance";

// create new admin
export const createDynamicPage = async (data) => {
  try {
    const response = await axiosInstance.post(`/admin/dynamic-pages`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Get, Search, Filter & Pagination
export const getDynamicPages = async (query) => {
  try {
    const response = await axiosInstance.get(
      `/admin/dynamic-pages?currentPage=${query.currentPage || 1}&limit=${query.limit || 10}&search=${query.search || ""}&filter=${query.filter}`,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// get single admin
export const getDynamicPage = async (slug) => {
  try {
    const response = await axiosInstance.get(`/admin/dynamic-pages/${slug}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Update a admin
export const updateDynamicPage = async (payload) => {
  const { id, data } = payload;
  try {
    const response = await axiosInstance.put(
      `/admin/dynamic-pages/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Delete a admin
export const deleteDynamicPage = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/dynamic-pages/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
