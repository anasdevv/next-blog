import { ImageSearchQuerySchema } from "@/lib/Validation";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createApi } from "unsplash-js";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";

const unsplash = createApi({
  accessKey: env.UNSPLASH_ACCESS_KEY,
});

export const unsplashRouter = createTRPCRouter({
  getImages: protectedProcedure
    .input(ImageSearchQuerySchema)
    .query(async ({ input: { searchQuery: query } }) => {
      try {
        const images = await unsplash.search.getPhotos({
          query,
          orientation: "landscape",
        });
        if (images.errors?.length) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: images.errors[0],
          });
        }
        return images.response;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "something went wrong",
        });
      }
    }),
});
