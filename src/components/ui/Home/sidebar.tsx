import React from "react";
import { Suggestions } from "./Suggestions";
import { Card } from "../card";
import ReadingList from "./ReadingList";
export const Sidebar = () => {
  return (
    <aside className="sticky top-10 col-span-4 flex h-[90vh] w-full flex-col px-4">
      <Card>
        <Suggestions />
        <ReadingList />
      </Card>
    </aside>
  );
};
