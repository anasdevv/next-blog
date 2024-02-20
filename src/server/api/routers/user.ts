import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const getTagIds = (
  likedPostTags: {
    post: {
      tags: {
        id: string;
      }[];
    };
  }[],
) => likedPostTags.map((p) => p.post.tags.map((t) => t.id)).flat();

export const userRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ ctx: { db }, input: { username } }) =>
      db.user.findUnique({
        where: {
          username,
        },
        select: {
          name: true,
          image: true,
          id: true,
          username: true,
          _count: {
            select: {
              posts: true,
              followings: true,
              followedBy: true,
            },
          },
        },
      }),
    ),
  getAllFollwers: protectedProcedure.query(
    async ({
      ctx: {
        db,
        session: {
          user: { id },
        },
      },
    }) =>
      db.user.findMany({
        where: {
          id,
        },
        select: {
          followedBy: {
            select: {
              name: true,
              username: true,
              id: true,
              image: true,
            },
          },
        },
      }),
  ),
  getAllFollowing: protectedProcedure.query(
    async ({
      ctx: {
        db,
        session: {
          user: { id },
        },
      },
    }) =>
      db.user.findMany({
        where: {
          id,
        },
        select: {
          followings: {
            select: {
              name: true,
              username: true,
              id: true,
              image: true,
            },
          },
        },
      }),
  ),
  getFollowersAndFollowingCount: publicProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ ctx: { db }, input: { username } }) =>
      db.user.findUnique({
        where: {
          username,
        },
        select: {
          _count: {
            select: {
              followedBy: true,
              followings: true,
            },
          },
        },
      }),
    ),
  follow: protectedProcedure
    .input(
      z.object({
        followingUserId: z.string(),
      }),
    )
    .mutation(
      async ({
        ctx: {
          db,
          session: {
            user: { id },
          },
        },
        input: { followingUserId },
      }) =>
        db.user.update({
          where: {
            id,
          },
          data: {
            followings: {
              connect: {
                id: followingUserId,
              },
            },
          },
        }),
    ),
  unfollow: protectedProcedure
    .input(
      z.object({
        unFollowingUserId: z.string(),
      }),
    )
    .mutation(
      async ({
        ctx: {
          db,
          session: {
            user: { id },
          },
        },
        input: { unFollowingUserId },
      }) =>
        db.user.update({
          where: {
            id,
          },
          data: {
            followings: {
              disconnect: {
                id: unFollowingUserId,
              },
            },
          },
        }),
    ),
  getSuggestions: protectedProcedure.query(
    async ({
      ctx: {
        db,
        session: { user },
      },
    }) => {
      // suggestions are based on user that have liked or bookmarked same posts that the current  user did
      // one approach can be find the posts and extract tags and find other users based on that
      // we can aslo add those
      const fetchTagsQuery = {
        where: {
          userId: user.id,
        },
        select: {
          post: {
            select: {
              tags: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
        take: 10,
      };
      const [likedPostTags, bookmarkedPostTags, userIds] = await Promise.all([
        db.like.findMany(fetchTagsQuery),
        db.bookmark.findMany(fetchTagsQuery),
        db.user.findUnique({
          where: {
            id: user.id,
          },
          select: {
            followings: {
              select: {
                id: true,
              },
            },
          },
        }),
      ]);
      const likedTags = getTagIds(likedPostTags);
      const bookmarkedTags = getTagIds(bookmarkedPostTags);
      console.log(userIds);
      console.log("like tags ", likedTags);
      return db.user.findMany({
        where: {
          OR: [
            {
              likes: {
                some: {
                  post: {
                    tags: {
                      some: {
                        id: {
                          in: likedTags,
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              bookmarks: {
                some: {
                  post: {
                    tags: {
                      some: {
                        id: {
                          in: bookmarkedTags,
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
          NOT: [
            {
              id: user.id,
            },
            {
              id: {
                in: userIds?.followings.map((f) => f.id),
              },
            },
          ],
        },
        select: {
          name: true,
          username: true,
          image: true,
          id: true,
        },
        take: 4,
      });
    },
  ),
});
