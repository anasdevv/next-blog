"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import Modal from "../Modal";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { Button } from "../button";
import { useForm } from "react-hook-form";
import { WriteBlogForm, writeFormSchema } from "@/lib/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { useToast } from "../use-toast";
import { getFormattedDate } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import clsx from "clsx";
const WriteFormModal = () => {
  const { isWriteModalOpen, setIsWriteModalOpen } = useGlobalContext();
  const { toast: radixToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WriteBlogForm>({
    resolver: zodResolver(writeFormSchema),
  });
  const { post } = api.useUtils();
  const { mutate: createPost, isLoading } = api.post.create.useMutation({
    onSuccess: async () => {
      console.log("post added");
      radixToast({
        title: "Blog Added Sucessfully",
        description: getFormattedDate(),
      });
      await post.findAll.invalidate();
      setIsWriteModalOpen(false);
      reset();
    },
    onError: (err) => {
      console.log(err);

      toast.error(
        typeof err === "string" ? err : err?.message ?? "something went wrong",
      );
    },
  });
  const onSubmit = (data: WriteBlogForm) => {
    createPost(data);
  };
  return (
    <Modal isOpen={isWriteModalOpen} close={() => setIsWriteModalOpen(false)}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center space-y-4"
      >
        <div className="flex w-full flex-col space-y-1">
          <Input
            id="title"
            type="text"
            placeholder="Title of the blog"
            {...register("title")}
          />
          {errors.title?.message ? (
            <p className="w-full pl-2 text-left text-sm text-red-500">
              {errors.title.message}
            </p>
          ) : null}
        </div>
        <div className="w-full flex-col space-y-1">
          <Input
            id="description"
            type="text"
            placeholder="Short Description about the blog"
            {...register("description")}
          />
          {errors.description?.message ? (
            <p className="w-full pl-2 text-left text-sm text-red-500">
              {errors.description.message}
            </p>
          ) : null}
        </div>
        <div className="w-full flex-col space-y-1">
          <Textarea
            id="body"
            placeholder="Blog main body ..."
            cols={10}
            rows={10}
            {...register("body")}
          />
          {errors.body?.message ? (
            <p className="w-full pl-2 text-left text-sm text-red-500">
              {errors.body.message}
            </p>
          ) : null}
        </div>

        <div className="flex w-full justify-end">
          <Button
            type="submit"
            variant="ghost"
            className={clsx(
              `flex items-center 
               space-x-3 rounded border border-gray-200 transition hover:border-gray-500 hover:bg-white`,
              isLoading && "justify-between space-x-1",
            )}
          >
            <span>Publish</span>
            {isLoading ? <AiOutlineLoading className="animate-spin" /> : null}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default WriteFormModal;
