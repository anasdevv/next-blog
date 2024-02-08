// "use client";
// import { Dialog, Transition } from "@headlessui/react";
// import React, { Fragment } from "react";
// import { HiXMark } from "react-icons/hi2";
// import { Textarea } from "./textarea";
// import { Button } from "./button";

// export interface DrawerProps {
//   title: string;
//   onClose: () => void;
// }

// const Drawer = ({ title, onClose }: DrawerProps) => {
//   return (
//     <Transition.Root show={true} as={Fragment}>
//       <Dialog
//         as="div"
//         className="fixed inset-0 z-10 overflow-y-auto"
//         onClose={onClose}
//       >
//         <div className="fixed right-0 top-0">
//           <Transition.Child
//             enter="transition duration-1000"
//             leave="transition duration-800"
//             enterFrom="transform translate-x-full"
//             enterTo="transform translate-x-0"
//             leaveFrom="transform translate-x-0"
//             leaveTo="transform translate-x-full"
//           >
//             <Dialog.Panel className="relative h-screen w-[200px] bg-white shadow-md sm:w-[400px]">
//               <div className="flex h-full w-full flex-col">
//                 <div className="my-5 flex items-center justify-between px-8 text-xl ">
//                   <h2 className="font-medium">{title}</h2>
//                   <div>
//                     <HiXMark />
//                   </div>
//                 </div>
//                 <div>

//                 </div>
//               </div>
//             </Dialog.Panel>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// };

// export default Drawer;
import React from "react";

const Drawer = () => {
  return <div>Drawer</div>;
};

export default Drawer;
