"use client";
import React from "react";
import { Suggestions } from "./Suggestions";
import { Card } from "../card";
import ReadingList from "./ReadingList";
import { useSession } from "next-auth/react";
import Link from "next/link";
export const Sidebar = () => {
  const { status } = useSession();
  console.log(status);
  return (
    <aside className="sticky top-10 col-span-4 flex h-[90vh] w-full flex-col px-4">
      <Card>
        <Suggestions />
        {status === "authenticated" ? <ReadingList /> : null}
      </Card>
    </aside>
  );
};
