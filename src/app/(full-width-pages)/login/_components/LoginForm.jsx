"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AUTH_TOKEN_KEY } from "@/lib/constant";
import { loginUser } from "@/redux/features/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { z } from "zod";

// Zod schema for validation
const loginSchema = z.object({
  email: z.string().trim().min(1, "Email or Phone is required"),
  password: z.string().trim().min(1, "Password is required"),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (credentials) => {
    try {
      const response = await dispatch(loginUser(credentials));
      if (response?.payload?.success) {
        Cookies.set(AUTH_TOKEN_KEY, response.payload?.data?.token);
        // Wait until the cookie is set
        if (response.payload?.data?.token) {
          router.push("/");
          window.location.href = "/";
        }
        reset();
        toast.success(response.payload.message);
      } else {
        toast.error(
          response.payload.response?.data?.message ||
            "Failed! Please try again",
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label className="block pb-2.5">
          Email <span className="text-red-500">*</span>{" "}
        </Label>
        <Input
          type="email"
          {...register("email")}
          placeholder="Enter your email"
          className="h-10"
        />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
      </div>

      <div>
        <Label className="block pb-2.5">
          Password <span className="text-red-500">*</span>{" "}
        </Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Enter your password"
            className="h-10"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <EyeIcon className="text-gray-500" />
            ) : (
              <EyeOffIcon className="text-gray-500" />
            )}
          </span>
        </div>
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="remember_me" />
          <Label className="block" htmlFor="remember_me">
            Keep me logged in
          </Label>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Forgot password?
        </Link>
      </div>

      <div>
        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full"
          size="lg"
        >
          {isSubmitting ? "Loading..." : "Login"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
