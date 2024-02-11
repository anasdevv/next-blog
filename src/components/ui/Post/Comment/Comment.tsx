import type { AppRouter } from "@/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Image from "next/image";
type RouterOutput = inferRouterOutputs<AppRouter>;

type CommentProps = RouterOutput["post"]["getCommentsByPostId"][number];

const Comment = ({ text, user: { name, image }, createdAt }: CommentProps) => {
  dayjs.extend(relativeTime);

  return (
    <div className="flex h-full w-full flex-col space-y-2 border-b pb-2 last:border-none">
      <div className="flex w-full items-center justify-start space-x-4 text-xs">
        <div className="relative h-7 w-7 rounded-full bg-gray-400">
          <Image
            src={image!}
            alt="profile-picture"
            fill
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">
            {name} &#x2022;
            <span className="pl-1 font-normal">
              {dayjs(createdAt).fromNow()}
            </span>
          </p>
          <p className="text-sm">Student Developer Teacher</p>
        </div>
      </div>
      <div className="truncate text-sm text-gray-600">{text}</div>
    </div>
  );
};

export default Comment;
