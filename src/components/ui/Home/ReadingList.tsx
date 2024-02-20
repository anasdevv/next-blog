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
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";

const ReadingList = () => {
  const { data: bookmarks } = api.post.findAllBookmarks.useQuery();
  return (
    <>
      <CardHeader className="py-1 font-bold lg:py-2">
        Your reading list
      </CardHeader>
      <ScrollArea className="h-screen pb-8">
        <CardContent className="flex flex-col space-y-4 pb-16">
          {bookmarks && bookmarks.length > 0 ? (
            bookmarks?.map(
              ({
                post: {
                  slug,
                  text,
                  title,
                  author: { image, name },
                  createdAt,
                  featuredImage,
                },
              }) => (
                <Link href={`/post/${slug}`} key={slug}>
                  <div className="group flex cursor-pointer items-start space-x-2">
                    <div className="aspect-square w-2/4 rounded-xl bg-gray-300">
                      {/* <Image src={featuredImage ?? ""} alt={slug} fill /> */}
                    </div>
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
            )
          ) : (
            <div className="flex  h-[70vh] justify-center rounded bg-gray-100 py-5 text-muted-foreground">
              <div className="h-45 w-45 flex flex-col ">
                <Image
                  className="rounded"
                  objectFit="square"
                  src={"/bookmark.jpeg"}
                  alt="bookmark-picture"
                  aria-hidden
                  width={"300"}
                  height={"300"}
                  // sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 33vw"
                />
                <div className="flex items-center justify-center py-4">
                  <span className="text-sm text-muted-foreground">
                    Bookmarked posts will appear here
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </>
  );
};

export default ReadingList;
