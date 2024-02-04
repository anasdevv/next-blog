import React from "react";
import { Post } from "./post";

export const PostList = () => {
  return (
    <div className="px-10">
      {Array.from({ length: 10 }).map((_, i) => (
        <Post key={i} />
      ))}
    </div>
  );
};
