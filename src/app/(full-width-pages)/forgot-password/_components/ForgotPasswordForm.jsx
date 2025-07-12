"use client";

import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

// Zod schema for validation
const forgotPassSchema = z.object({
  email: z.string().trim().min(1, "Email is required"),
});

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPassSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/admin/auth/password/forgot",
        data,
      );
      if (response?.data?.success) {
        toast.success(response.data.message);
        reset();
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
        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full"
          size="lg"
        >
          {isSubmitting ? "Loading..." : "Send Reset Link"}
        </Button>
      </div>

      <div className="text-sm font-medium text-gray-500">
        Wait, I remember my password...
        <Link href="/login" className="text-blue-600">
          Click here
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
