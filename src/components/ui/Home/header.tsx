"use client";
import React, { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { IoReorderFourOutline } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FaSignInAlt } from "react-icons/fa";
import { Button } from "../button";
import { signIn, signOut, useSession } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";
import { useGlobalContext } from "@/context/GlobalContext";

export const Header = () => {
  const { data: sessionData, status, update } = useSession();
  const { setIsWriteModalOpen } = useGlobalContext();
  console.log("session data ", sessionData, " status ", status);
  return (
    <header className="sticky flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-8">
      <div>
        {/* slider */}

        <IoReorderFourOutline className="text-2xl text-gray-600" />
      </div>
      {/* title */}
      <h1 className="text-xl font-thin">Next Blog</h1>
      <div className="flex items-center space-x-4">
        {status === "authenticated" ? (
          <>
            <BsBell className="text-2xl text-gray-600" />
            {/* <Avatar /> */}
            <Avatar>
              <Suspense fallback={<AvatarFallback />}>
                <Avatar>
                  <AvatarImage src="www.notfound.com" alt="user avatar" />
                </Avatar>
              </Suspense>
            </Avatar>
            <Button
              onClick={() => setIsWriteModalOpen(true)}
              className="flex items-center space-x-3 rounded border border-gray-900 transition hover:border-gray-200"
            >
              <span>Write</span>
              <FiEdit />
            </Button>
            <Button
              onClick={() => signOut()}
              variant="ghost"
              className="flex items-center space-x-3 rounded border border-gray-900 transition hover:border-gray-200"
            >
              <span>Logout</span>
              <IoIosLogOut />
            </Button>
          </>
        ) : (
          <Button
            onClick={() => signIn()}
            className="flex items-center space-x-3 rounded border border-gray-900 transition hover:border-gray-200"
          >
            <span>Signin</span>
            <FaSignInAlt />
          </Button>
        )}

        {/* options */}
      </div>
    </header>
  );
};
