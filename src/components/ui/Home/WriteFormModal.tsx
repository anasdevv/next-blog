"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { CreateBlogPost, CreatePostSchema } from "@/lib/Validation";
import { getFormattedDate } from "@/lib/utils";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import Modal from "../Modal";
import { Option, SearchableSelect } from "../SearchableSelect";
import { Button } from "../button";
import { Input } from "../input";
import dynamic from "next/dynamic";

import { Textarea } from "../textarea";
import { useToast } from "../use-toast";
import { CreateTagModel } from "./CreateTagModel";
import Tags from "./Tags";
import { useSession } from "next-auth/react";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const WriteFormModal = () => {
  const [isTagModalOpen, setIsTagModalOpen] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const { isWriteModalOpen, setIsWriteModalOpen } = useGlobalContext();
  const { toast: radixToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateBlogPost>({
    resolver: zodResolver(CreatePostSchema),
  });
  const { status } = useSession();
  const { data: tags, isLoading: fetchTagsLoading } = api.tag.fetchAll.useQuery(
    undefined,
    {
      enabled: status === "authenticated",
    },
  );
  const { post } = api.useUtils();
  const { mutate: createPost, isLoading } = api.post.create.useMutation({
    onSuccess: async () => {
      console.log("post added");
      radixToast({
        title: "Blog Added Sucessfully",
        description: getFormattedDate(),
      });
      await post.findAllBookmarksId.invalidate();
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
  const closeTagModal = useCallback(
    () => setIsTagModalOpen(false),
    [isTagModalOpen],
  );
  const onSubmit = (data: CreateBlogPost) => {
    createPost({
      ...data,
      tags: selectedTags?.map(({ value }) => ({ id: value })),
    });
    // revalidatePath("/");
  };
  const imageHandler = () => {
    console.log("image handler");
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );
  return (
    <Modal isOpen={isWriteModalOpen} close={() => setIsWriteModalOpen(false)}>
      <CreateTagModel isOpen={isTagModalOpen} close={closeTagModal} />
      <div className="flex flex-col">
        <div className="flex w-full items-center justify-between pb-4">
          <div className="w-full">
            <SearchableSelect
              options={tags?.map((t) => ({
                label: t.name,
                value: t.id,
              }))}
              isLoading={fetchTagsLoading}
              selected={selectedTags}
              setSelected={setSelectedTags}
            />
          </div>
          <div className="flex w-full justify-end">
            {/* button */}

            <Button
              onClick={() => setIsTagModalOpen(() => true)}
              variant="ghost"
              className="mt-1 flex transform items-center space-x-3 rounded border border-gray-300 text-muted-foreground shadow transition hover:border-gray-900 hover:bg-white active:scale-95"
            >
              New Tag
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap">
          <Tags
            cancel
            tags={selectedTags.map(({ value, label }) => ({
              name: label,
              id: value,
            }))}
            onCancel={(tagId: string) => {
              setSelectedTags((prev) => prev.filter((o) => o.value !== tagId));
            }}
          />
        </div>

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
            {/* <Textarea
              id="body"
              placeholder="Blog main body ..."
              cols={10}
              rows={10}
              {...register("body")}
            /> */}
            <Controller
              control={control}
              name="html"
              render={({ field }) => (
                <ReactQuill
                  modules={modules}
                  {...field}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder="Blog Post ..."
                />
              )}
            />
            {/* <ReactQuill theme="snow" value={"hi"} /> */}
            {errors.html?.message ? (
              <p className="w-full pl-2 text-left text-sm text-red-500">
                {errors.html.message}
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
      </div>
    </Modal>
  );
};

export default WriteFormModal;
