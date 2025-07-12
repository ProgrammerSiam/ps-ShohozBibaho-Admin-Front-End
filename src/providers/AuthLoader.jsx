"use client";

import { AUTH_TOKEN_KEY } from "@/lib/constant";
import { fetchLoggedInUser } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get(AUTH_TOKEN_KEY);
    if (token) {
      dispatch(fetchLoggedInUser());
    }
  }, [dispatch]);

  return null; // No UI, just runs auth logic
};

export default AuthLoader;
