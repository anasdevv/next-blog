import { z } from "zod";

export const CreatePostSchema = z.object({
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
  html: z
    .string()
    .trim()
    .min(100, { message: "Body must be at least 100 characters long" })
    .max(1000, { message: "Body must be at less than 1000 characters" }),
});
export type CreateBlogPost = z.infer<typeof CreatePostSchema>;

export const CreateCommentSchema = z.object({
  text: z.string().min(2),
  postId: z.string({
    required_error: "postId is required",
  }),
});
export type CreateComment = z.infer<typeof CreateCommentSchema>;

export const CreateTagSchema = z.object({
  description: z
    .string()
    .trim()
    .min(4, { message: "Description must be at least 4 characters long" })
    .max(50, { message: "Description must be  less than 50 characters" }),
  name: z
    .string()
    .trim()
    .min(3, { message: "Tag must be at least 3 characters long" })
    .max(20, { message: "Tag must be less than 20 characters" }),
});
export type CreateTag = z.infer<typeof CreateTagSchema>;

export const ImageSearchQuerySchema = z.object({
  searchQuery: z.string(),
});
export type ImageQuery = z.infer<typeof ImageSearchQuerySchema>;
