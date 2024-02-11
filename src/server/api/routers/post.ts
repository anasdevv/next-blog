import AuthError from "next-auth";
import slugify from "slugify";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { CreateCommentSchema, CreatePostSchema } from "@/lib/Validation";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

export const postRouter = createTRPCRouter({
  findAll: publicProcedure
    .input(
      z.object({
        username: z.string().optional(),
      }),
    )
    .query(async ({ ctx: { db, session }, input: { username } }) =>
      db.post.findMany({
        take: 10,
        where: {
          ...((username
            ? { author: { username } }
            : {}) as Prisma.PostWhereInput),
        },
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
              username: true,
            },
          },
        },
      }),
    ),
  findAllBookmarksId: protectedProcedure.query(async ({ ctx: { db } }) =>
    db.bookmark.findMany({
      take: 10,
      orderBy: {
        post: {
          createdAt: "desc",
        },
      },
      select: {
        postId: true,
      },
    }),
  ),
  findAllBookmarks: protectedProcedure.query(async ({ ctx: { db } }) =>
    db.bookmark.findMany({
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        postId: true,
        post: {
          select: {
            slug: true,
            author: {
              select: {
                image: true,
                name: true,
              },
            },
            createdAt: true,
            title: true,
            text: true,
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
    .input(CreatePostSchema)
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

  addComment: protectedProcedure
    .input(CreateCommentSchema)
    .mutation(async ({ ctx: { db, session }, input: { text, postId } }) =>
      db.comment.create({
        data: {
          text,
          user: {
            connect: {
              id: session.user.id,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        },
      }),
    ),
  getCommentsByPostId: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
    )
    .query(async ({ ctx: { db }, input: { postId } }) =>
      db.comment.findMany({
        where: {
          postId,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          text: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      }),
    ),
});
