"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { HiXMark } from "react-icons/hi2";
import { Textarea } from "../textarea";
import { Button } from "../button";
import dayjs from "dayjs";
import { ScrollArea } from "@radix-ui/react-scroll-area";
const Comment = () => {
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          console.log("closed");
        }}
      >
        <div className="fixed right-0 top-0">
          <Transition.Child
            enter="transition duration-1000"
            leave="transition duration-800"
            enterFrom="transform translate-x-full"
            enterTo="transform translate-x-0"
            leaveFrom="transform translate-x-0"
            leaveTo="transform translate-x-full"
          >
            <Dialog.Panel className="relative h-screen w-[200px] bg-white shadow-md sm:w-[400px]">
              <div className="flex h-full w-full flex-col">
                <div className="my-5 flex items-center justify-between px-8 text-xl ">
                  <h2 className="font-medium">Responses (4)</h2>
                  <div>
                    <HiXMark />
                  </div>
                </div>
                <form className="flex w-full flex-col  space-y-4 p-5">
                  <div className="px-6">
                    <Textarea
                      rows={4}
                      id="comment"
                      className="shadow-md"
                      placeholder="Share your thoughts ..."
                    />
                  </div>
                  <div className="flex w-full flex-col items-end  pr-8">
                    <Button
                      variant="secondary"
                      className="bg-gray-100 hover:border-gray-800 hover:bg-gray-200"
                    >
                      Comment
                    </Button>
                  </div>
                </form>
                {/* <ScrollArea className="h-[2rem]"> */}
                <div className="scrollbar-thumb-gray-700 flex flex-col space-y-5 overflow-y-auto px-5 py-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      className="flex h-full w-full flex-col space-y-2 border-b pb-2 last:border-none"
                      key={i}
                    >
                      <div className="flex w-full items-center justify-start space-x-4 text-xs">
                        <div className="relative h-7 w-7 rounded-full bg-gray-400"></div>
                        <div className="flex flex-col">
                          <p className="font-semibold">
                            Anas &#x2022;
                            <span className="pl-1">
                              {dayjs(Date.now()).format("DD/MM/YYYY")}
                            </span>
                          </p>
                          <p className="text-sm">Student Developer Teacher</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Tenetur ratione sint possimus corporis placeat,
                        adipisci hic non animi fuga? Ea!
                      </div>
                    </div>
                  ))}
                </div>
                {/* </ScrollArea> */}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Comment;
