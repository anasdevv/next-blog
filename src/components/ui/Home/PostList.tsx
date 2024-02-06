import React, { Suspense } from "react";
import { Post } from "./Post";
import { api } from "@/trpc/server";
import { AiOutlineLoading } from "react-icons/ai";
// import { api } from "@/trpc/react";

export const PostList = async () => {
  // const { data, isSuccess, isLoading } = api.post.findAll.useQuery();
  const posts = await api.post.findAll.query();
  console.log("data ", posts);
  return (
    <div className="px-10">
      <Suspense
        fallback={
          <div className="m-auto h-full w-full">
            <AiOutlineLoading className="animate-spin" />
          </div>
        }
      >
        {posts.map((post, i) => (
          <Post key={i} post={post} />
        ))}
      </Suspense>
    </div>
  );
};
