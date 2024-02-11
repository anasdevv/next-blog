import { api } from "@/trpc/react";
import { Suspense } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Comment from "./Comment";
import { FaCommentSlash } from "react-icons/fa6";

interface CommentsProps {
  postId: string;
}
const Comments = ({ postId }: CommentsProps) => {
  const { data: comments, isLoading } = api.post.getCommentsByPostId.useQuery({
    postId,
  });
  return (
    <div className="scrollbar-thumb-gray-700 flex flex-col space-y-5 overflow-y-auto px-5 py-2">
      <Suspense
        fallback={
          <div className="mx-auto my-auto flex h-full w-full items-center justify-center space-x-4 py-20">
            <AiOutlineLoading className="h-20 w-20 animate-spin" />
          </div>
        }
      >
        {comments?.length ? (
          comments?.map((comment, i) => <Comment key={i} {...comment} />)
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center space-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
              <FaCommentSlash className="h-8 w-8 text-gray-500" />
            </div>
            <div className="flex w-full items-center justify-center">
              <span className="text-sm text-muted-foreground ">
                No comments yet.
              </span>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Comments;
