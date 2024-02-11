"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiXMark } from "react-icons/hi2";
import AddComment from "./AddComment";
import React from "react";
import Comments from "./Comments";
// import Comments from "./Comments";
interface CommentsSectionProps {
  postId: string;
}
const CommentSection = ({ postId }: CommentsSectionProps) => {
  const { setisCommentDrawerOpen, isCommentDrawerOpen } = useGlobalContext();

  return (
    <Transition.Root show={isCommentDrawerOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          setisCommentDrawerOpen(false);
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
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setisCommentDrawerOpen(false);
                    }}
                  >
                    <HiXMark />
                  </div>
                </div>
                <AddComment postId={postId} />
                <Comments postId={postId} />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CommentSection;
