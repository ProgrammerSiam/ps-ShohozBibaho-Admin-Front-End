import { z } from "zod";

export const createAdminSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().min(1, "Email is required"),
  password: z.string().trim().min(6, "At least 6 digit password is required"),
  is_active: z.boolean().optional().default(true),
});

export const updateAdminSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().min(1, "Email is required"),
  password: z.string().trim().optional(),
  is_active: z.boolean().optional().default(true),
});
