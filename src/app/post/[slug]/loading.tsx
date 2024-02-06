import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const loading = () => {
  return (
    <div className="mx-auto my-auto flex h-full w-full items-center justify-center space-x-4 py-20">
      <AiOutlineLoading className="h-20 w-20 animate-spin" />
    </div>
  );
};

export default loading;
