import React from "react";
import { Badge } from "../badge";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";
import clsx from "clsx";
import { HiXMark } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type Tag = RouterOutput["tag"]["fetchAll"][number];
export interface TagsProps {
  title?: string;
  tags: Tag[];
  cancel?: boolean;
  onCancel?: (tagId: string) => void;
}
const Tags = ({ title, tags, cancel, onCancel }: TagsProps) => {
  return (
    <div className="mb-3 flex w-full flex-wrap items-center space-x-4 space-y-1">
      {title ? <span className="font-semibold">{title}</span> : null}
      {tags?.map(({ id, name }) => (
        <Badge
          key={id}
          className={clsx(
            " text-sm hover:bg-primary",
            cancel ? "flex space-x-2 px-2 py-1" : "p-2",
          )}
        >
          <span>{name}</span>
          {cancel && (
            <div
              className="flex cursor-pointer items-center justify-center rounded bg-gray-700 p-1 transition-transform"
              onClick={() => {
                onCancel?.(id);
                console.log("id", id);
              }}
            >
              <FaXmark className="pl" />
            </div>
          )}
        </Badge>
      ))}
    </div>
  );
};

export default Tags;
