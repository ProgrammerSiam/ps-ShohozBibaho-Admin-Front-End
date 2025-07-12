import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().min(1, "Email is required"),
  password: z.string().trim().optional(),
  is_active: z.boolean().optional().default(true),
});
