import axiosInstance from "@/utils/axiosInstance";

// create new admin
export const createAdmin = async (data) => {
  try {
    const response = await axiosInstance.post(`/admin/management`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Get, Search, Filter & Pagination
export const getAdmins = async (query) => {
  try {
    const response = await axiosInstance.get(
      `/admin/management?currentPage=${query.currentPage || 1}&limit=${query.limit || 10}&search=${query.search || ""}&filter=${query.filter}`,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// get single admin
export const getAdmin = async (payload) => {
  const { id } = payload;
  try {
    const response = await axiosInstance.get(`/admin/management/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Update a admin
export const updateAdmin = async (payload) => {
  const { id, data } = payload;
  try {
    const response = await axiosInstance.put(`/admin/management/${id}`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Delete a admin
export const deleteAdmin = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/management/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
