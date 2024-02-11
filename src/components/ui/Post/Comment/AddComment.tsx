"use client";
import type { CreateComment } from "@/lib/Validation";
import { CreateCommentSchema } from "@/lib/Validation";
import { getFormattedDate } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { Button } from "../../button";
import { Textarea } from "../../textarea";
import { useToast } from "../../use-toast";
interface AddCommentProps {
  postId: string;
}
const AddComment = ({ postId }: AddCommentProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CreateComment>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: useMemo(
      () => ({
        postId,
      }),
      [postId],
    ),
  });
  const { toast: radixToast } = useToast();
  const { post } = api.useUtils();
  const { mutate: addComment, isLoading } = api.post.addComment.useMutation({
    onSuccess: async () => {
      radixToast({
        title: "Comment Added",
        description: getFormattedDate(),
      });
      await post.getCommentsByPostId.invalidate();
      reset();
      // await refetch();
    },
    onError: (err) => {
      console.log(err);

      toast.error(
        typeof err === "string" ? err : err?.message ?? "something went wrong",
      );
    },
  });
  const onSubmit = (data: CreateComment) => {
    addComment({
      ...data,
    });
    console.log(data);
  };
  return (
    <>
      <form
        className="flex w-full flex-col  space-y-4 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-6">
          <Textarea
            rows={4}
            id="comment"
            className="shadow-md"
            placeholder="Share your thoughts ..."
            {...register("text")}
          />
        </div>
        {isValid && (
          <div className="flex w-full flex-col items-end  pr-8">
            <Button
              type="submit"
              variant="secondary"
              className={clsx(
                " bg-gray-100 px-2 hover:border-gray-800 hover:bg-gray-200",
                isLoading && "flex items-center justify-center space-x-6",
              )}
            >
              <span>Comment</span>
              {isLoading && (
                <AiOutlineLoading className="h-4 w-4 animate-spin text-gray-500" />
              )}
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default AddComment;
