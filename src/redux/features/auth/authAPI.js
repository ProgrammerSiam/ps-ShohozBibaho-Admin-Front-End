import axiosInstance from "@/utils/axiosInstance";

// User Login
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/admin/auth/login", credentials);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Fetch Logged-in User
export const fetchUser = async () => {
  try {
    const response = await axiosInstance.get("/admin/auth/profile");
    return response.data;
  } catch (error) {
    return error;
  }
};
