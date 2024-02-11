"use client";
import React, { Suspense, useMemo } from "react";
import { Post } from "./Post";
import { api } from "@/trpc/react";
import { AiOutlineLoading } from "react-icons/ai";
import { useSession } from "next-auth/react";
// import { api } from "@/trpc/react";
interface PostListProps {
  username?: string;
}

export const PostList = ({ username }: PostListProps) => {
  const { data: posts } = api.post.findAll.useQuery({
    ...(username ? { username } : {}),
  });
  const { status } = useSession();
  const { data } = api.post.findAllBookmarksId.useQuery(undefined, {
    enabled: status === "authenticated" && Boolean(username),
  });
  const bookmarksPostIds = useMemo(
    () => data?.map(({ postId }) => postId) ?? [],
    [data],
  );
  console.log("data ", posts);
  console.log(bookmarksPostIds);
  return (
    <div className="px-10">
      <Suspense
        fallback={
          <div className="m-auto h-full w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        }
      >
        {posts?.map((post, i) => (
          <Post
            key={i}
            showBookmark={!Boolean(username)}
            post={{
              ...post,
              isBookmarked: Boolean(
                bookmarksPostIds.find((b) => b === post.id),
              ),
            }}
          />
        ))}
      </Suspense>
    </div>
  );
};
