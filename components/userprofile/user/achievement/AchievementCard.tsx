"use client";

import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserActivity from "@/components/userprofile/user/achievement/userActivivity";
import AwardCard from "./AwardCard";
import { useFetchAchievementLevel } from "@/hooks/achievement";
import { PublicAchievementComponent } from "./PublicAchievementComponent";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/hooks/api-hook/auth/use-profile";

interface AchievementLevelProps {

  userInformation: any;

  disableButton?: boolean;

}

export default function AchievementLevelComponent({ userInformation, disableButton }: AchievementLevelProps) {
  const { data: authUser } = useQuery({
    queryKey: ["authProfile"],
    queryFn: () => fetchUserProfile(),
  });

  console.log("userInformation : ", userInformation);

  const { data } = useFetchAchievementLevel(userInformation?.id);
  return (
    <Card className="w-full h-fit bg-white mb-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="w-full h-[40px] relative">
            <div className="left-0 top-0 absolute text-center text-2xl font-bold">
              សមិទ្ធផល
            </div>
            <div className="w-[32px] h-[2.5px] left-[2.50px] top-[27px] absolute bg-[#f31260]"></div>
          </div>
          {/* publish and unpublish achievement card */}
          <div className="flex items-center space-x-2">
            {/* <FontAwesomeIcon className="text-gray-400" icon={faCamera} />
            <Label htmlFor="show-achievement" className="font-semibold">
              បិទសមិទ្ធផល
            </Label>
            <Switch id="show-achievement" /> */}
            {!disableButton && <PublicAchievementComponent />}
          </div>
        </div>
        <p className="font-khFont text-muted-foreground">
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
              <UserActivity achievement={data} />
            </div>
          </>
        ) : data?.isPublish ? (
          <>
            <div className="flex items-center justify-center">
              <AwardCard achievement={data} />
            </div>

            <div className="mt-6">
              <UserActivity achievement={data} />
            </div>
          </>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
}
