import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),

  //   type: z.enum(["book", "other"]).default("book"),
  type: z.string().min(1, "type is required"),

  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be positive"),

  sale_price: z
    .number({ invalid_type_error: "Sale price must be a number" })
    .optional(),

  stock_quantity: z
    .number({ invalid_type_error: "Stock quantity must be a number" })
    .min(0, "Stock quantity must be 0 or more")
    .optional(),

  sku: z.string().optional(),

  publisher: z.string().optional(),

  category: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    )
    .nonempty("At least one category must be selected"),

  attributes: z.object({
    author: z.string().optional(),
    isbn: z.string().optional(),
    pages: z
      .number({ invalid_type_error: "Pages must be a number" })
      .min(1, "Must be at least 1 page")
      .optional(),
    language: z.string().optional(),
    binding: z.string().optional(),
  }),

  is_active: z.boolean().default(true),

  sort_value: z
    .number({ invalid_type_error: "Sort value must be a number" })
    .min(0)
    .optional(),

  //   // 📸 Thumbnail: required single File
  //   thumbnail: z
  //     .instanceof(File)
  //     .refine((file) => file.size > 0, { message: "Thumbnail is required" }),

  //   // 📷 Sample Images: max 5, all must be valid File
  //   sampleImages: z
  //     .array(z.instanceof(File))
  //     .max(5, "Maximum of 5 sample images")
  //     .optional(),
});
