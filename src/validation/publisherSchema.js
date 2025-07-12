import { z } from "zod";

export const publisherSchema = z.object({
  name: z.string().trim().min(1, "Category name is required"),
  slug: z.string().optional(),
  description: z.string().optional(),
  parentId: z.string().optional(),
  sort_value: z.number().default(0),
  is_active: z.boolean().default(true),
});
