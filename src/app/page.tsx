import { PostList } from "@/components/ui/Home/PostList";
import SelectContext from "@/components/ui/Home/SelectContext";
import { Sidebar } from "@/components/ui/Home/Sidebar";
import Tags from "@/components/ui/Home/Tags";
import WriteFormModal from "@/components/ui/Home/WriteFormModal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "@/components/ui/search";

export default async function Home() {
  // await helpers.post.findAll.prefetch();
  // await helpers.post.findAllBookmarksId.prefetch();
  return (
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
        </div>
        <ScrollArea className="h-[70vh]">
          <PostList />
          <div className="sticky h-10 w-full"></div>
        </ScrollArea>
      </main>
      <Sidebar />
      <WriteFormModal />
    </section>
  );
}
