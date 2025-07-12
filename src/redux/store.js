import authReducer from "@/redux/features/auth/authSlice";
import galleryReducer from "@/redux/features/gallery/gallerySlice";
import userReducer from "@/redux/features/user/userSlice";
import adminReducer from "@/redux/features/admin/adminSlice";
import dynamicPageReducer from "@/redux/features/dynamicPage/dynamicPageSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
    page: dynamicPageReducer,
  },
});

export default store;
