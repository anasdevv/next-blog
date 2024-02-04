import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Home";
import { Sidebar } from "@/components/ui/Home/sidebar";
import { Search } from "@/components/ui/search";
import Tags from "@/components/ui/Home/tags";
import SelectContext from "@/components/ui/Home/select.context";
import { PostList } from "@/components/ui/Home";
import { ScrollArea } from "@/components/ui/scroll-area";
import Modal from "@/components/ui/Modal";
import WriteModal from "@/components/ui/Home/WriteModal";

export default async function Home() {
  return (
    <div className="flex w-full flex-col">
      {/* header */}
      <Header />
      {/* content */}
      <section className="grid w-full grid-cols-12 px-4 pt-2">
        <main className="col-span-8 h-full w-full border-r border-gray-300 ">
          <div className=" flex w-full flex-col space-y-4 border-b border-gray-300 pb-4 pt-2">
            <div className="flex w-full items-center space-x-4">
              <div className="flex w-full items-center">
                <Search />
                <div className="flex  w-full justify-end pr-4">
                  <SelectContext />
                </div>
              </div>
            </div>
            <Tags title="My Topics" />
          </div>
          <ScrollArea className="h-[70vh]">
            <PostList />
            <div className="sticky h-10 w-full"></div>
          </ScrollArea>
        </main>
        <Sidebar />
        <WriteModal />
      </section>
    </div>
  );
}
