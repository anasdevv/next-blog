"use client";

import { PostList } from "@/components/ui/Home/PostList";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSession } from "next-auth/react";
import { BiEdit } from "react-icons/bi";
import { CiShare1 } from "react-icons/ci";

interface PageProps {
  params: {
    username: string;
  };
}
const UserProfilePage = ({ params: { username } }: PageProps) => {
  console.log("slug ", username);
  const { toast } = useToast();
  const { data: loggedInState } = useSession();
  const { data: user } = api.user.getProfile.useQuery(
    {
      username,
    },
    {
      enabled: Boolean(username),
    },
  );
  const { data: count } = api.user.getFollowersAndFollowingCount.useQuery(
    { username },
    {
      enabled: Boolean(username),
    },
  );
  return (
    <div className="flex h-full w-full items-center justify-center ">
      <div className="lg:max-w-screen my-10 flex w-full flex-col items-center justify-center  xl:max-w-screen-lg">
        <div className="flex w-full flex-col rounded-3xl bg-white shadow-lg">
          <div className="bg-gradient h-44 w-full rounded-t-3xl bg-gradient-to-r from-rose-100 to-teal-100 ">
            <div className="absolute left-[17rem] top-[13.6rem] cursor-pointer">
              <Avatar className="group relative h-28 w-28 cursor-default rounded-full border-2 border-white bg-gray-100">
                {loggedInState?.user.id === user?.id && (
                  <label
                    htmlFor="avatar"
                    className={
                      "absolute z-10 flex h-full w-full cursor-pointer items-center justify-center rounded-full transition group-hover:bg-black/40"
                    }
                  >
                    <BiEdit className="hidden text-3xl text-white group-hover:block" />

                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      className="sr-only"
                      accept="image/*"
                    />
                  </label>
                )}

                {user?.image && <AvatarImage src={user.image} />}
              </Avatar>
            </div>
          </div>
          <div className="ml-10 mt-14 flex flex-col space-y-0.5 rounded-b-3xl pb-7 pt-3">
            <div className="text-2xl font-semibold text-gray-800">
              {user?.name}
            </div>
            <div className="text-gray-600">@{user?.username}</div>
            <div className="text-gray-600">{user?._count.posts ?? 0} Posts</div>
            <div className="flex items-center space-x-4 text-gray-600">
              <span>{count?._count.followedBy ?? 0} Followers </span>
              <span>{count?._count.followings ?? 0} Following </span>
            </div>
            <div>
              <Button
                onClick={async () => {
                  await navigator.clipboard.writeText(window.location.href);
                  toast({
                    description: "URL copied to clipboard ✅",
                  });
                }}
                variant="ghost"
                className=" mt-2 flex transform items-center space-x-3 rounded border border-gray-300 transition hover:border-gray-900 hover:bg-white active:scale-95"
              >
                <span>Share</span>
                <CiShare1 />
              </Button>
            </div>
          </div>
        </div>

        <div className=" w-full ">
          <PostList username={username} />
        </div>
      </div>
    </div>
  );
};
export default UserProfilePage;
