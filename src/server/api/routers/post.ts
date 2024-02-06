import AuthError from "next-auth";
import slugify from "slugify";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { writeFormSchema } from "@/lib/Validation";
import { TRPCError } from "@trpc/server";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  findAll: publicProcedure.query(async ({ ctx: { db } }) =>
    db.post.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            id: true,
            image: true,
          },
        },
      },
    }),
  ),
  findBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input: { slug }, ctx: { db } }) =>
      db.post.findUnique({
        where: {
          slug,
        },
      }),
    ),
  like: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx: { db, session }, input: { postId } }) =>
      db.like.create({
        data: {
          postId,
          userId: session.user.id,
        },
      }),
    ),
  create: protectedProcedure
    .input(writeFormSchema)
    .mutation(
      async ({ ctx: { db, session }, input: { title, body, description } }) => {
        try {
          await db.post.create({
            data: {
              html: "<div> hello </div>",
              title,
              description,
              text: body,
              slug: slugify(title),
              authorId: session.user.id,
            },
          });
          return "success";
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create post",
          });
        }
      },
    ),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
