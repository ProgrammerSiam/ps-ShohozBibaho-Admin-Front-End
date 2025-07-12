import axiosInstance from "@/utils/axiosInstance";

// Get, Search, Filter & Pagination
export const getUsers = async (query) => {
  try {
    let url = `/admin/users?currentPage=${query.currentPage || 1}&limit=${query.limit || 10}&search=${query.search || ""}`;

    if (query?.is_active) {
      url += `&is_active=${query.is_active}`;
    }

    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Update a user
export const updateUser = async (data) => {
  try {
    const response = await axiosInstance.put(`/admin/users/${data.id}`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
