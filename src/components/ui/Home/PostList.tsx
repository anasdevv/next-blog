"use client";
import React, { Suspense, useEffect, useMemo } from "react";
import { Post } from "./Post";
import { api } from "@/trpc/react";
import { AiOutlineLoading } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { useInView } from "react-intersection-observer";
// import { api } from "@/trpc/react";
interface PostListProps {
  username?: string;
}
const LIMIT = 5;
export const PostList = ({ username }: PostListProps) => {
  const { ref, inView } = useInView();
  const {
    data: postPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = api.post.findAll.useInfiniteQuery(
    {
      limit: LIMIT,
      ...(username ? { username } : {}),
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  const posts = useMemo(
    () => postPages?.pages.flatMap((page) => page.posts) ?? [],
    [postPages?.pages],
  );
  const { status } = useSession();
  const { data } = api.post.findAllBookmarksId.useQuery(undefined, {
    enabled: status === "authenticated" && Boolean(username),
  });
  const bookmarksPostIds = useMemo(
    () => data?.map(({ postId }) => postId) ?? [],
    [data],
  );
  console.log("has nex ", hasNextPage);
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);
  // console.log("data ", posts);
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
            innerRef={posts.length === i + 1 ? ref : undefined}
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
      {isFetchingNextPage && (
        <div className="mt-3 flex h-full w-full items-center justify-center">
          <AiOutlineLoading className="animate-spin text-3xl" />
        </div>
      )}
    </div>
  );
};
