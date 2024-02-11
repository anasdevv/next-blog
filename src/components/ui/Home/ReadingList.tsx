"use client";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "../scroll-area";
import { api } from "@/trpc/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { getRelativeTime } from "@/lib/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";

const ReadingList = () => {
  const { data: bookmarks } = api.post.findAllBookmarks.useQuery();
  return (
    <>
      <CardHeader className="py-1 font-bold lg:py-2">
        Your reading list
      </CardHeader>
      <ScrollArea className="h-[50vh] pb-8">
        <CardContent className="flex flex-col space-y-4 pb-16">
          {bookmarks?.map(
            ({
              post: {
                slug,
                text,
                title,
                author: { image, name },
                createdAt,
              },
            }) => (
              <Link href={`/post/${slug}`} key={slug}>
                <div className="group flex cursor-pointer items-start space-x-2">
                  <div className="aspect-square h-full w-2/5 rounded-xl bg-gray-300"></div>
                  <div className="flex w-3/5 flex-col space-y-1 ">
                    <CardTitle className="decoration-gray-600 group-hover:underline">
                      {title}
                    </CardTitle>
                    <CardDescription className=" leading-2 line-clamp-4 text-xs">
                      {text}
                    </CardDescription>
                    <div className=" mt-2 flex w-full items-center justify-between space-x-4 pt-2">
                      <div className="flex items-center space-x-1">
                        <div className="h-7 w-7 rounded-full ">
                          <Avatar className="h-7 w-7">
                            <AvatarImage
                              src={image!}
                              alt={name?.split(" ")[0]}
                            />
                            <AvatarFallback>
                              <div className="bg-gray-400"></div>
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <span className="text-xs">
                          {name?.split(" ")[0]} &#x2022;
                        </span>
                      </div>
                      <div className="text-xs">
                        {" "}
                        {getRelativeTime(createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ),
          )}
        </CardContent>
      </ScrollArea>
    </>
  );
};

export default ReadingList;
