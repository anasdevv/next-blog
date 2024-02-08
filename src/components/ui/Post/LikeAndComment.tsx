"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { BsChat } from "react-icons/bs";
import { api } from "@/trpc/react";
import { toast } from "react-hot-toast";
import { useToast } from "../use-toast";
import { getFormattedDate } from "@/lib/utils";
interface LikeAndCommentProps {
  postId: string;
}
const LikeAndComment = ({ postId }: LikeAndCommentProps) => {
  const { toast: radixToast } = useToast();
  const { data: isPostLiked, refetch } = api.post.isPostLiked.useQuery(
    { postId },
    {
      enabled: !!postId,
    },
  );
  const { mutate: likePost } = api.post.like.useMutation({
    onSuccess: async () => {
      radixToast({
        title: "Post liked ",
        description: getFormattedDate(),
      });
      await refetch();
    },
    onError: (err) => {
      console.log(err);

      toast.error(
        typeof err === "string" ? err : err?.message ?? "something went wrong",
      );
    },
  });
  const { mutate: unLikePost } = api.post.unlike.useMutation({
    onSuccess: async () => {
      radixToast({
        title: "Like removed",
        description: getFormattedDate(),
      });
      await refetch();
    },
    onError: (err) => {
      console.log(err);

      toast.error(
        typeof err === "string" ? err : err?.message ?? "something went wrong",
      );
    },
  });

  console.log("isLiked ", postId);
  return (
    <div className="fixed bottom-14 flex w-full items-center justify-center">
      <div className="group  flex items-center justify-center space-x-4 rounded-full border border-gray-300 bg-white px-6  py-3 shadow-lg transition duration-300 hover:border-gray-900">
        <div className="flex w-full cursor-pointer space-x-4">
          <div className="cursor-pointer border-r pr-4 transition duration-300 group-hover:border-gray-900">
            {isPostLiked ? (
              <FcLike
                className="text-xl"
                onClick={() => {
                  console.log("unlike ");
                  unLikePost({ postId });
                }}
              />
            ) : (
              <FcLikePlaceholder
                className="text-xl"
                onClick={() => {
                  console.log("like");
                  likePost({ postId });
                }}
              />
            )}
          </div>
          <div className="cursor-pointer">
            <BsChat className="text-base text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeAndComment;
