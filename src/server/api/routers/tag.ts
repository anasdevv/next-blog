import slugify from "slugify";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { CreateTagSchema } from "@/lib/Validation";
import { devNull } from "os";
import { TRPCError } from "@trpc/server";

export const tagRouter = createTRPCRouter({
  isValid: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ ctx: { db }, input: { name } }) => {
      try {
        await db.tag.findFirstOrThrow({
          where: {
            name,
          },
        });
        return false;
      } catch (error) {
        return true;
      }
    }),
  fetchAll: protectedProcedure.query(({ ctx: { db } }) =>
    db.tag.findMany({
      select: {
        id: true,
        name: true,
      },
    }),
  ),
  create: protectedProcedure
    .input(CreateTagSchema)
    .mutation(async ({ ctx: { db }, input: { description, name } }) => {
      const tag = await db.tag.findFirst({
        where: {
          name,
        },
      });
      console.log("server tag ", tag);
      if (Boolean(tag)) {
        throw new TRPCError({
          code: "CONFLICT",
          cause: {
            name: "Tag with this name already exists",
          },
        });
      }

      return db.tag.create({
        data: {
          name,
          description,
          slug: slugify(name),
        },
      });
    }),
});
