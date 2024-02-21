"use client";
import { BiImageAdd, BiLoaderAlt } from "react-icons/bi";
import LikeAndComment from "./LikeAndComment";

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";
import { ScrollArea } from "../scroll-area";
import { Suspense, useState } from "react";
import Modal from "../Modal";
import { Input } from "../input";
import { useForm } from "react-hook-form";
import { ImageQuery, ImageSearchQuerySchema } from "@/lib/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@/hooks/useDebounce";
import { api } from "@/trpc/react";
import Image from "next/image";
import { Interweave } from "interweave";
import clsx from "clsx";
import { Button } from "../button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSession } from "next-auth/react";
type RouterOutput = inferRouterOutputs<AppRouter>;

export type Post = RouterOutput["post"]["findBySlug"];
interface PostDetails {
  post: Post;
}

export const PostDetails = ({ post }: PostDetails) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: userSession } = useSession();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { register, watch } = useForm<ImageQuery>({
    resolver: zodResolver(ImageSearchQuerySchema),
  });
  const debouncedSearchQuery = useDebounce(watch("searchQuery"), 1000);
  const {
    data: images,
    isSuccess,
    isLoading,
  } = api.unsplash.getImages.useQuery(
    {
      searchQuery: debouncedSearchQuery,
    },
    {
      enabled: Boolean(debouncedSearchQuery),
    },
  );

  const { mutate: updateImage } =
    api.post.updatePostFeaturedImage.useMutation();
  console.log("deb ", debouncedSearchQuery);
  console.log("deb ", Boolean(debouncedSearchQuery));
  console.log("isLoading ", isLoading);

  return (
    <>
      {userSession?.user.id === post?.authorId ? (
        <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
          <div className="flex flex-col items-center justify-center space-y-4">
            <Input className="rounded p-5" {...register("searchQuery")} />
            <div
              className={clsx(
                "relative h-96 w-full   gap-4 overflow-y-auto",
                isSuccess && "grid grid-cols-3 place-items-center",
              )}
            >
              {isLoading && Boolean(debouncedSearchQuery) && (
                <div className="mx-auto flex h-full w-full items-center justify-center">
                  <BiLoaderAlt className="animate-spin text-3xl" />
                </div>
              )}
              {isSuccess &&
                images?.results.map((img) => (
                  <div
                    className={clsx(
                      "relative aspect-video h-full w-full cursor-pointer hover:bg-black/70",
                      selectedImage === img.urls.full
                        ? " border-[6px] border-gray-600 "
                        : "",
                    )}
                    key={img.id}
                    onClick={() => {
                      setSelectedImage(img.urls.full);
                    }}
                  >
                    <Image
                      fill
                      src={img.urls.thumb}
                      alt={img?.alt_description ?? " "}
                      sizes="(min-width: 808px) 50vw, 100vw"
                    />
                  </div>
                ))}
            </div>
            {/* button here */}
            {Boolean(selectedImage) && (
              <Button
                className="p-5"
                onClick={() => {
                  updateImage({
                    postId: post?.id!,
                    imageUrl: selectedImage,
                  });
                }}
              >
                confirm
              </Button>
            )}
          </div>
        </Modal>
      ) : null}

      <ScrollArea className="h-screen">
        {!!post && <LikeAndComment postId={post.id} />}

        <div className="flex h-full w-full flex-col items-center justify-center p-10">
          <div className="flex w-full max-w-screen-lg flex-col space-y-4 pb-10">
            <div className="relative h-[60vh] w-full rounded-xl bg-gray-300 shadow-lg">
              <Suspense
                fallback={
                  <div className="bg-gray-300">
                    <AiOutlineLoading3Quarters />
                  </div>
                }
              >
                <Image
                  src={post?.featuredImage ?? ""}
                  alt={post?.title ?? ""}
                  fill
                />
              </Suspense>

              {userSession?.user.id === post?.authorId && (
                <div
                  className="roundd-lg absolute left-2 top-2 z-10 cursor-pointer bg-black/50 p-2 text-white hover:bg-black"
                  onClick={() => setIsModalOpen(true)}
                >
                  <BiImageAdd className="text-2xl" />
                </div>
              )}
              <div className="absolute flex h-full w-full items-center justify-center ">
                <div className="rounded-xl bg-black bg-opacity-50 p-4 text-3xl text-white">
                  {post?.title}
                </div>
              </div>
            </div>
            <div className="border-l-4 border-gray-800 pl-6">
              {post?.description}
            </div>
            <div className="prose lg:prose-xl">
              <Interweave content={post?.html} />
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
};
