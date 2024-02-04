import React from "react";
import Tags from "./tags";

export const Post = () => {
  return (
    <div className="group mt-4 flex flex-col space-y-4 border-b border-gray-300 py-5 last:border-none">
      <div className="flex w-full items-center space-x-2">
        {/* name and all that */}
        <div className="h-10 w-10 rounded-full bg-gray-400"></div>
        <div className="flex flex-col">
          <p className="font-semibold">Mohammad Anas &#x2022; Jan 1 , 2024</p>
          <p className="text-sm">Student Developer Teacher</p>
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-4">
        <div className="col-span-8 w-full">
          <p className="w-full text-xl font-bold decoration-neutral-800 group-hover:underline">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            illum
          </p>
          <p className="break-words text-sm text-gray-700">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe
            accusamus vero asperiores corrupti esse accusantium magnam non.
            Consequuntur, animi harum. Quibusdam, nemo enim sint eaque, quos sit
            officia quia excepturi dolore exercitationem dolorum repellendus
            nisi ipsum ullam iure veniam inventore.
          </p>
        </div>
        <div className="col-span-4">
          <div className="h-full w-full transform rounded-xl bg-gray-300 transition hover:scale-105 hover:shadow-xl"></div>
        </div>
      </div>
      <Tags />
    </div>
  );
};
