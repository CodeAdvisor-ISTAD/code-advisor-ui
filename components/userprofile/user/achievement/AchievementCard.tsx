"use client";

import React, { useEffect, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserActivity from "@/components/userprofile/user/achievement/userActivivity";
import AwardCard from "./AwardCard";
import { useFetchAchievementLevel } from "@/hooks/achievement";

export default function AchievementLevelComponent(userId) {
  const [achievement, setAchievement] = useState(null);
  // const [error, setError] = useState(null);
  console.log("AchievementLevelComponent", userId.userId);
  const { data, isLoading, error } = useFetchAchievementLevel(userId.userId);
  console.log("useFetchAchievementLevel", data);
  return (
    <Card className="xs:w-[450px] lg:w-full h-fit bg-white">
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
          <AwardCard achievement={data} />
        </div>

        <div className="mt-6">
          <UserActivity achievement={data} />
        </div>
      </CardContent>
    </Card>
  );
}
