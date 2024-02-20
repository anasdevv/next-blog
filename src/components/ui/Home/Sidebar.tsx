"use client";
import React from "react";
import { Suggestions } from "./Suggestions";
import { Card } from "../card";
import ReadingList from "./ReadingList";
import { useSession, signIn } from "next-auth/react";
import { CiLogin } from "react-icons/ci";
export const Sidebar = () => {
  const { status } = useSession();
  console.log(status);
  return status === "authenticated" ? (
    <aside className="sticky top-10 col-span-4 flex h-[90vh] w-full flex-col px-4">
      <Card>
        <Suggestions />
        <ReadingList />
      </Card>
    </aside>
  ) : (
    <div className="col-span-4 flex items-center justify-center rounded px-10 py-3">
      <div className="flex w-full flex-col items-center justify-center bg-gray-200 py-5">
        <p>Login to get started</p>
        <div
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-300"
          onClick={() => {
            signIn();
          }}
        >
          <CiLogin className="text-2xl text-gray-900" />
        </div>
      </div>
    </div>
  );
};
