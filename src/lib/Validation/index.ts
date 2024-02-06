import { z } from "zod";

export const writeFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, { message: "Title must be at least 10 characters long" })
    .max(30, { message: "Title must be at less than 30 characters" }),
  description: z
    .string()
    .trim()
    .min(50, { message: "Description must be at least 50 characters long" })
    .max(200, { message: "Description must be at less than 200 characters" }),
  body: z
    .string()
    .trim()
    .min(100, { message: "Body must be at least 100 characters long" })
    .max(1000, { message: "Body must be at less than 1000 characters" }),
});
export type WriteBlogForm = z.infer<typeof writeFormSchema>;
