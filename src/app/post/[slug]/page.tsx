import LikeAndComment from "@/components/ui/Post/LikeAndComment";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/trpc/server";
// import { api } from "@/trpc/react";
import React from "react";
interface PageProps {
  params: {
    slug: string;
  };
}
const page = async ({ params: { slug } }: PageProps) => {
  let post = null;
  try {
    post = await api.post.findBySlug.query({ slug });
  } catch (error) {
    console.log("error", error);
  }

  return (
    <ScrollArea className="h-screen">
      {!!post && <LikeAndComment postId={post.id} />}
      <div className="flex h-full w-full flex-col items-center justify-center p-10">
        <div className="flex w-full max-w-screen-lg flex-col space-y-4 pb-10">
          <div className="relative h-[60vh] w-full rounded-xl bg-gray-300 shadow-lg">
            <div className="absolute flex h-full w-full items-center justify-center ">
              <div className="rounded-xl bg-black bg-opacity-50 p-4 text-3xl text-white">
                {post?.title}
              </div>
            </div>
          </div>
          <div className="border-l-4 border-gray-800 pl-6">
            {post?.description}
          </div>
          <div>{post?.text}</div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default page;
