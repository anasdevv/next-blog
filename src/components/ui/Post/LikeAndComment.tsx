"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FcLike } from "react-icons/fc";
import { BsChat } from "react-icons/bs";
import { api } from "@/trpc/react";
import { toast } from "react-hot-toast";
import { useToast } from "../use-toast";
import { getFormattedDate } from "@/lib/utils";
import { CiHeart } from "react-icons/ci";
const LikeAndComment = ({ postId }: { postId: string }) => {
  const { toast: radixToast } = useToast();
  const { mutate: likePost } = api.post.like.useMutation({
    onSuccess: () => {
      radixToast({
        title: "Post liked ",
        description: getFormattedDate(),
      });
    },
    onError: (err) => {
      console.log(err);

      toast.error(
        typeof err === "string" ? err : err?.message ?? "something went wrong",
      );
    },
  });
  return (
    <div className="fixed bottom-14 flex w-full items-center justify-center">
      <div className="group  flex items-center justify-center space-x-4 rounded-full border border-gray-300 bg-white px-6  py-3 shadow-lg transition duration-300 hover:border-gray-900">
        <div className="flex w-full cursor-pointer space-x-4">
          <div
            className="cursor-pointer border-r pr-4 transition duration-300 group-hover:border-gray-900"
            onClick={() => {
              console.log("like");
              likePost({ postId });
            }}
          >
            <CiHeart className="text-xl" />
          </div>
          <div className="cursor-pointer">
            <BsChat className="text-xl text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeAndComment;
