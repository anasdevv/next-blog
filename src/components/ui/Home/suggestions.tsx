import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "../button";

export const Suggestions = () => {
  return (
    <>
      <CardHeader className="py-2 lg:py-4">
        People you might be interested in
      </CardHeader>
      <CardContent>
        {Array.from({
          length: 3,
        }).map((_, i) => (
          <div
            key={i}
            className="flex items-center space-x-4 py-1 text-sm text-muted-foreground"
          >
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <div className="font-bold text-gray-900">John Doe</div>
              <div className="text-xs">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Dolore, ex.
              </div>
            </div>
            <Button className=" transition hover:scale-105 hover:shadow-xl">
              Follow
            </Button>
          </div>
        ))}
      </CardContent>
    </>
  );
};
