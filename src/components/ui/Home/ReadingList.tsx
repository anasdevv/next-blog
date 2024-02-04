import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "../scroll-area";
const ReadingList = () => {
  return (
    <>
      <CardHeader className="py-1 font-bold lg:py-2">
        Your reading list
      </CardHeader>
      <ScrollArea className="h-[50vh]">
        <CardContent className="flex flex-col space-y-4">
          {Array.from({
            length: 4,
          }).map((_, i) => (
            <div
              key={i}
              className="group flex cursor-pointer items-start space-x-2"
            >
              <div className="aspect-square h-full w-2/5 rounded-xl bg-gray-300"></div>
              <div className="flex w-3/5 flex-col space-y-1 ">
                <CardTitle className="decoration-gray-600 group-hover:underline">
                  Lorem ipsum dolor sit amet.
                </CardTitle>
                <CardDescription className=" text-xs leading-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolore, ex. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Autem fugit possimus, quod deserunt molestias pariatur
                </CardDescription>
                <div className=" mt-2 flex w-full items-center justify-between space-x-4 pt-2">
                  <div className="flex items-center space-x-1">
                    <div className="h-7 w-7 rounded-full bg-gray-300"></div>
                    <span className="text-xs">Anas &#x2022;</span>
                  </div>
                  <div className="text-xs"> Dec 22 , 2023</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </>
  );
};

export default ReadingList;
