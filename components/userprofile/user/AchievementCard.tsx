"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, CheckIcon } from "lucide-react";
import UserActivity from "@/components/userprofile/user/userActivivity";
import AwardCard from "./AwardCard";

export default function AchievementLevel() {
  return (
    <Card className="w-full h-full pb-6 bg-white">
      <CardHeader>
        <div className="w-[73px] h-[40px] relative">
          <div className="left-0 top-0 absolute text-center text-2xl font-bold">
            សមិទ្ធផល
          </div>
          <div className="w-[32px] h-[2.5px] left-[2.50px] top-[27px] absolute bg-[#f31260]"></div>
        </div>
        <p className="font-khFont text-muted-foreground">
          មានរឿងជាច្រើនដែលយើងទទួលបានពីសមិទ្ធផល
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <AwardCard />
          {/* <div className="space-y-1">
            <span className="font-khFont text-6xl font-bold">១៦៨</span>
            <p className="font-khFont text-sm text-muted-foreground">
              ពិន្ទុសរុប
            </p>
          </div> */}
          {/* <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy p-3">
            <div className="flex items-center justify-center rounded-full bg-white/10 p-2">
              <CheckIcon className="h-6 w-6 text-white" />
            </div>
          </div> */}
        </div>
        <div className="mt-8">
          <UserActivity />
        </div>
      </CardContent>
    </Card>
  );
}
