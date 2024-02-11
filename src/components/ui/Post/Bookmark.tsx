"use client";
import { getFormattedDate } from "@/lib/utils";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { CiBookmarkPlus, CiBookmarkCheck } from "react-icons/ci";
import { useToast } from "../use-toast";
import { Suspense } from "react";
import { AiOutlineLoading } from "react-icons/ai";
interface BookmarkProps {
  postId: string;
  isPostBookmarked?: boolean;
}
const Bookmark = ({ postId, isPostBookmarked }: BookmarkProps) => {
  const { toast: radixToast } = useToast();
  const { post } = api.useUtils();
  const { mutate: addToBookmarks } = api.post.addToBookmarks.useMutation({
    onSuccess: async () => {
      radixToast({
        title: "Added To Bookmarks ",
        description: getFormattedDate(),
        duration: 3000,
      });
      await Promise.all([
        post.findAllBookmarksId.invalidate(),
        post.findAllBookmarks.invalidate(),
      ]);
    },
    onError: (err) => {
      console.log(err);

      toast.error(
        typeof err === "string" ? err : err?.message ?? "something went wrong",
      );
    },
  });
  const { mutate: removeFromBookmarks } =
    api.post.removeFromBookmarks.useMutation({
      onSuccess: async () => {
        radixToast({
          title: "Removed from bookmarks",
          description: getFormattedDate(),
        });
        await Promise.all([
          post.findAllBookmarksId.invalidate(),
          post.findAllBookmarks.invalidate(),
        ]);
      },
      onError: (err) => {
        console.log(err);

        toast.error(
          typeof err === "string"
            ? err
            : err?.message ?? "something went wrong",
        );
      },
    });
  return (
    <Suspense
      fallback={
        <div className="px-auto m-auto flex items-center justify-center">
          <AiOutlineLoading className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      {isPostBookmarked ? (
        <CiBookmarkCheck
          className="mr-4 cursor-pointer  text-2xl font-bold text-gray-500 shadow-md"
          onClick={() => {
            console.log("remove from bookmarks");
            removeFromBookmarks({ postId });
          }}
        />
      ) : (
        <CiBookmarkPlus
          className="mr-4 cursor-pointer  text-2xl font-bold text-gray-500 shadow-md"
          onClick={() => {
            console.log("added to bookmarks");
            addToBookmarks({ postId });
          }}
        />
      )}
    </Suspense>
  );
};

export default Bookmark;
