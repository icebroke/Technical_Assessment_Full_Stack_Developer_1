import { z } from "zod";

export const itemSchema = z.object({
  name: z
    .string()
    .min(1, "Item's name is required")
    .max(100, "Item's name must not exceed 100 characters"),
  description: z
    .string()
    .min(1, "Item's description is required")
    .max(500, "Item's description must not exceed 500 characters"),
  price: z.number().positive().refine(
    (n) => {
      const decimalPart = n.toString().split(".")[1];
      return !decimalPart || decimalPart.length <= 2;
    },
    { message: "Max precision is 2 decimal places" }
  ),
  createdAt: z.string().transform((str) => new Date(str)).optional(),
  updatedAt: z.string().transform((str) => new Date(str)).optional(),
});

export type Item = z.infer<typeof itemSchema>;