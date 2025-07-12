import { z } from "zod";

export const dynamicPageSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  is_active: z.boolean().default(true),
});
