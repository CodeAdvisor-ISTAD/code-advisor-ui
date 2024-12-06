"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, CheckIcon } from "lucide-react";
import UserActivity from "@/components/userprofile/userActivivity";
import AwardCard from "./AwardCard";

export default function AchievementProgress() {
  return (
    <Card className="w-full h-[344px] bg-white">
      <CardHeader>
        <CardTitle className="font-khFont text-2xl">សមិទ្ធផល</CardTitle>
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
      </CardContent>
      <UserActivity />
    </Card>
  );
}
