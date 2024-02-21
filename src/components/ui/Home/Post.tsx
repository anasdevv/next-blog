import Tags from "./Tags";
import type { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import Link from "next/link";
import Bookmark from "../Post/Bookmark";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";
import { useSession } from "next-auth/react";
import Image from "next/image";
type RouterOutput = inferRouterOutputs<AppRouter>;

type Post = RouterOutput["post"]["findAll"]["posts"][number] & {
  isBookmarked: boolean;
};
export interface PostProps {
  post: Post;
  showBookmark: boolean;
  innerRef?: (node?: Element | null | undefined) => void;
}

export const Post = ({
  showBookmark = true,
  post: {
    id,
    description,
    title,
    createdAt,
    slug,
    author: { name, image, username },
    isBookmarked,
    tags,
    featuredImage,
  },
  innerRef,
}: PostProps) => {
  const { status } = useSession();
  return (
    <div
      ref={innerRef}
      className=" last:border-nones relative mt-4 flex flex-col space-y-4 border-b border-gray-300 py-5"
    >
      <Link className="flex justify-between" href={`/user/${username}`}>
        <div className="group flex w-full cursor-pointer items-center space-x-2">
          {/* name and all that */}
          <div className="h-10 w-10 rounded-full">
            <Avatar>
              <AvatarImage src={image!} alt={name!} />
              <AvatarFallback>
                <div className="bg-gray-400"></div>
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold ">
              <span className="group-hover:underline">{name}</span>
              &#x2022;
              <span className="pl-1">
                {dayjs(createdAt).format("DD/MM/YYYY")}
              </span>
            </p>
            <p className="text-sm">Student Developer Teacher</p>
          </div>
        </div>
        {status === "authenticated" && showBookmark && (
          <Bookmark postId={id} isPostBookmarked={isBookmarked} />
        )}
      </Link>
      <Link href={`/post/${slug}`}>
        <div
          className="group grid w-full cursor-pointer grid-cols-12 gap-4"
          onClick={() => {
            console.log("clicked");
          }}
        >
          <div className="col-span-8 w-full">
            <p className="w-full text-xl font-bold decoration-neutral-800 group-hover:underline">
              {title}
            </p>
            <p className=" break-words text-sm text-gray-700">{description}</p>
          </div>
          <div className="col-span-4 min-h-36">
            <div className="h-full w-full transform rounded-xl bg-gray-300 transition hover:scale-105 hover:shadow-xl">
              <Image src={featuredImage ?? ""} alt={slug} fill />
            </div>
          </div>
        </div>
      </Link>
      <div className="flex justify-between">
        <Tags tags={tags ?? []} />
      </div>
    </div>
  );
};
