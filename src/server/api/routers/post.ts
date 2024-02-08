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

  findAll: publicProcedure.query(async ({ ctx: { db, session } }) =>
    db.post.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        slug: true,
        author: {
          select: {
            name: true,
            id: true,
            image: true,
          },
        },
        bookmarks: session?.user.id
          ? {
              select: {
                id: true,
              },
            }
          : false,
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
        select: {
          id: true,
          title: true,
          description: true,
          text: true,
          createdAt: true,
        },
      }),
    ),
  isPostLiked: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx: { db, session }, input: { postId } }) => {
      const like = await db.like.findFirst({
        where: {
          userId: session.user.id,
          postId,
        },
      });
      return like?.id ? true : false;
    }),
  isBookmarked: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx: { db, session }, input: { postId } }) => {
      const like = await db.bookmark.findFirst({
        where: {
          userId: session.user.id,
          postId,
        },
      });
      return like?.id ? true : false;
    }),
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
  unlike: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx: { db, session }, input: { postId } }) =>
      db.like.delete({
        where: {
          userId_postId: {
            postId,
            userId: session.user.id,
          },
        },
      }),
    ),
  addToBookmarks: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx: { db, session }, input: { postId } }) =>
      db.bookmark.create({
        data: {
          postId,
          userId: session.user.id,
        },
      }),
    ),
  removeFromBookmarks: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx: { db, session }, input: { postId } }) => {
      const test = db.bookmark.findMany({
        where: {
          userId: session.user.id,
        },
      });
      console.log("test ", test);
      return db.bookmark.delete({
        where: {
          userId_postId: {
            postId,
            userId: session.user.id,
          },
        },
      });
    }),

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
