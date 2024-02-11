import { useController, useForm } from "react-hook-form";
import Modal, { ModalProps } from "../Modal";
import { CreateTag, CreateTagSchema } from "@/lib/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../input";
import { api } from "@/trpc/react";
import { useState } from "react";
import { Button } from "../button";
import clsx from "clsx";
import { AiOutlineLoading } from "react-icons/ai";
import { debounce, getFormattedDate } from "@/lib/utils";
import { useToast } from "../use-toast";
import { TRPCError } from "@trpc/server";
import toast from "react-hot-toast";
import { TRPCClientError } from "@trpc/client";

export const CreateTagModel = ({
  isOpen,
  close,
}: Omit<ModalProps, "children">) => {
  const { toast: radixToast } = useToast();

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateTag>({
    resolver: zodResolver(CreateTagSchema),
  });
  const { mutate: createTag, isLoading } = api.tag.create.useMutation({
    onSuccess: async () => {
      console.log("Tag added");
      radixToast({
        title: "Tag Added Sucessfully",
        description: getFormattedDate(),
      });
      // await post.findAllBookmarksId.invalidate();
      close();
      reset();
    },
    onError: (err: any) => {
      if (err instanceof TRPCClientError) {
        if (err.data.code === "CONFLICT")
          setError("name", {
            message: "A tag with this name already exists",
          });
        else toast.error(err.message);
      }
      console.log(err);
    },
  });
  console.log("errors ", errors);
  return (
    <Modal isOpen={isOpen} close={close} title="Create a tag">
      <form
        onSubmit={handleSubmit((formData) => {
          createTag(formData);
        })}
      >
        <div className="flex w-full flex-col space-y-1">
          <Input
            id="name"
            type="text"
            placeholder="Name for tag ..."
            {...register("name")}
          />
          {errors.name?.message ? (
            <p className="w-full pl-2 text-left text-sm text-red-500">
              {errors.name.message}
            </p>
          ) : null}
        </div>
        <div className="flex w-full flex-col space-y-1">
          <Input
            id="description"
            type="text"
            placeholder="Description for tag"
            {...register("description")}
          />
          {errors.description?.message ? (
            <p className="w-full pl-2 text-left text-sm text-red-500">
              {errors.description.message}
            </p>
          ) : null}
        </div>
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
      </form>
    </Modal>
  );
};
