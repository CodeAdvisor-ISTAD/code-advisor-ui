import { Card } from "@/components/ui/card";
import { ArrowUp, BadgeCheck } from "lucide-react";

export default function AwardCard() {
  return (
    <Card className="p-6 flex items-center justify-between w-[450px]">
      <div className="flex flex-col items-center gap-2">
        <span className="text-5xl font-bold">168</span>
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-red-500 text-sm">ពិន្ទុសរុប</span>
            <ArrowUp className="h-6 w-8 mb-2 text-green-500" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full bg-navy p-2">
          <BadgeCheck className="h-6 w-6 text-white" />
        </div>
        <span className="text-navy font-semibold">Senior</span>
      </div>
    </Card>
  );
}
