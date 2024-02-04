import React from "react";
import { Badge } from "../badge";
export interface TagsProps {
  title?: string;
}
const Tags = ({ title }: TagsProps) => {
  return (
    <div className="mb-3 flex h-6 w-full items-center space-x-4 ">
      {title ? <span className="font-semibold">{title}</span> : null}
      {Array.from({ length: 4 }).map((_, i) => (
        <Badge key={i} className="text-sm">
          {`Tag ${i + 1}`}
        </Badge>
      ))}
    </div>
  );
};

export default Tags;
