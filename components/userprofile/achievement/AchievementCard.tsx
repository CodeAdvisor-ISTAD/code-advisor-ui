"use client";

import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AwardCard from "./AwardCard";
import { useFetchAchievementLevel } from "@/hooks/achievement";
import { PublicAchievementComponent } from "./PublicAchievementComponent";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/hooks/api-hook/auth/use-profile";
import { User } from "lucide-react";
import UserActivityPoints from "./userActivivity";

interface AchievementLevelProps {
  userInformation: any;

  disableButton?: boolean;
}

export default function AchievementLevelComponent({
  userInformation,
  disableButton,
}: AchievementLevelProps) {
  const { data: authUser } = useQuery({
    queryKey: ["authProfile"],
    queryFn: () => fetchUserProfile(),
  });

  const { data } = useFetchAchievementLevel(userInformation?.id);
  return (
    <Card className="w-full h-fit bg-white mb-2 dark:bg-darkSecondary">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="w-full lg:h-[40px] h-[30px] relative">
            <div className="left-0 top-0 absolute text-center lg:text-2xl text-lg font-bold">
              សមិទ្ធផល
            </div>
            <div className="lg:w-[32px] w-[25px] h-[2.5px] left-[2.50px] lg:top-[27px] top-[22px] absolute bg-[#f31260]"></div>
          </div>
          {/* publish and unpublish achievement card */}
          <div className="flex items-center space-x-2 ">
            {/* <FontAwesomeIcon className="text-gray-400" icon={faCamera} />
            <Label htmlFor="show-achievement" className="font-semibold">
              បិទសមិទ្ធផល
            </Label>
            <Switch id="show-achievement" /> */}
            {!disableButton && <PublicAchievementComponent />}
          </div>
        </div>
        <p className="font-khFont text-muted-foreground lg:text-lg text-sm">
          មានរឿងជាច្រើនដែលយើងទទួលបានពីសមិទ្ធផល
        </p>
      </CardHeader>

      <CardContent>
        {authUser?.uuid === userInformation?.authorUuid ? (
          <>
            <div className="flex items-center justify-center">
              <AwardCard achievement={data} />
            </div>

            <div className="mt-6">
              <UserActivityPoints achievement={data} />
            </div>
          </>
        ) : data?.isPublish ? (
          <>
            <div className="flex items-center justify-center">
              <AwardCard achievement={data} />
            </div>

            <div className="mt-6">
              <UserActivityPoints achievement={data} />
            </div>
          </>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
}
