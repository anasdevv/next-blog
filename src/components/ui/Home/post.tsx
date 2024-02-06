import Tags from "./Tags";
import type { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import Link from "next/link";
export interface PostProps {
  post: Prisma.PostGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          image: true;
        };
      };
    };
  }>;
}

export const Post = ({
  post: {
    description,
    text,
    title,
    createdAt,
    slug,
    author: { name, image },
  },
}: PostProps) => {
  return (
    <div className="group mt-4 flex flex-col space-y-4 border-b border-gray-300 py-5 last:border-none">
      <div className="flex w-full items-center space-x-2">
        {/* name and all that */}
        <div className="h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={image!} alt={name!} />
            <AvatarFallback>
              <div className="bg-gray-400"></div>
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">
            {name} &#x2022;
            <span className="pl-1">
              {dayjs(createdAt).format("DD/MM/YYYY")}
            </span>
          </p>
          <p className="text-sm">Student Developer Teacher</p>
        </div>
      </div>
      <Link href={`/post/${slug}`}>
        <div className="grid w-full cursor-pointer grid-cols-12 gap-4">
          <div className="col-span-8 w-full">
            <p className="w-full text-xl font-bold decoration-neutral-800 group-hover:underline">
              {title}
            </p>
            <p className="break-words text-sm text-gray-700">{description}</p>
          </div>
          <div className="col-span-4 min-h-32">
            <div className="h-full w-full transform rounded-xl bg-gray-300 transition hover:scale-105 hover:shadow-xl"></div>
          </div>
        </div>
      </Link>

      <Tags />
    </div>
  );
};
