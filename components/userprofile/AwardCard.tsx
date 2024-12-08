import { Card } from "@/components/ui/card";
import { ArrowUp, BadgeCheck } from "lucide-react";

export default function AwardCard() {
  return (
    <Card className="p-6 flex items-center justify-between w-[450px]">
      <div className="flex flex-col items-center gap-1">
        <span className="text-5xl font-bold">១៦៨</span>
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-red-500 text-base font-bold">ពិន្ទុសរុប</span>
            <ArrowUp className="h-12 w-9 text-green-500" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BadgeCheck className="h-6 w-6 text-white" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <img
          className="h-[100px] w-[100px]"
          src="/user-profile-image/badge.png"
          alt="achievement award"
        />
        <span className="text-navy font-semibold">Senior</span>
        </div>
    </Card>
  );
}
