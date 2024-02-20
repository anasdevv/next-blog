"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "../button";
import { api } from "@/trpc/react";
import Image from "next/image";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";

export const Suggestions = () => {
  const { data: users } = api.user.getSuggestions.useQuery();
  const { mutate: followUser } = api.user.follow.useMutation();
  return (
    <>
      <CardHeader className="py-2 lg:py-4">
        People you might be interested in
      </CardHeader>
      <CardContent>
        {users && users?.length > 0 ? (
          users.map(({ name, id, image }) => (
            <div
              key={id}
              className="flex items-center space-x-4 py-1 text-sm text-muted-foreground"
            >
              <div className="h-12 w-12 rounded ">
                <Image
                  className="rounded-full"
                  src={image ?? ""}
                  alt="user-profile-pic"
                  // fill
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <div className="font-bold text-gray-900">{name}</div>
                <div className="text-xs">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dolore, ex.
                </div>
              </div>
              <Button
                className=" transition hover:scale-105 hover:shadow-xl"
                onClick={() =>
                  followUser({
                    followingUserId: id,
                  })
                }
              >
                Follow
              </Button>
            </div>
          ))
        ) : (
          <div className="flex  justify-center rounded bg-gray-200 py-5 text-muted-foreground">
            <div className="flex flex-col ">
              <span> Nothing at the moment</span>
              <div className="flex items-center justify-center">
                <MdOutlineDoNotDisturbAlt className="text-gray-700" />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </>
  );
};
