"use client";

import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

// Zod schema for validation
const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password cannot exceed 12 characters"),
    confirmNewPassword: z
      .string()
      .trim()
      .min(1, "Confirm Password is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

const ResetPasswordForm = ({ resetToken }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/admin/auth/password/reset", {
        password: data.newPassword,
        token: resetToken,
      });
      if (response?.data?.success) {
        toast.success(response.data.message);
        reset();
        router.push("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred!",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label className="block pb-2.5">
          Password <span className="text-red-500">*</span>{" "}
        </Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            {...register("newPassword")}
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
        <ErrorMessage>{errors.newPassword?.message}</ErrorMessage>
      </div>

      <div>
        <Label className="block pb-2.5">
          Confirm Password <span className="text-red-500">*</span>{" "}
        </Label>
        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmNewPassword")}
            placeholder="Re-type password"
            className="h-10"
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer"
          >
            {showConfirmPassword ? (
              <EyeIcon className="text-gray-500" />
            ) : (
              <EyeOffIcon className="text-gray-500" />
            )}
          </span>
        </div>
        <ErrorMessage>{errors.confirmNewPassword?.message}</ErrorMessage>
      </div>

      <div>
        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full"
          size="lg"
        >
          {isSubmitting ? "Loading..." : "Save New Password"}
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
