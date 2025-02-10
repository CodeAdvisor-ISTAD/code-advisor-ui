"use client";
import React from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

interface BioProps {
  bio: string;
  // userInformation: UserInformation;
}

export default function Bio(userInformation: BioProps) {
  const user = userInformation;
  return (
    <div>
      <Card className="w-full mb-2 h-full lg:p-6 p-3 rounded-lg bg-white dark:bg-darkSecondary">
        <div className="w-full lg:h-[55px] h-[35px] relative">
          <CardTitle className="left-0 top-0 absolute lg:text-2xl text-lg">
            ប្រវត្តិរូប
          </CardTitle>
          <div className="lg:w-[16px] w-[12px] h-[2.5px] lg:left-[13px] left-[10px] lg:top-[27px] top-[22px] absolute dark:[#FB0A5D]  bg-[#f31260]"></div>
        </div>
        <CardDescription>
          <p className="lg:text-lg text-sm">
            {user?.bio ? user.bio : "មិនមានទិន្នន័យ"}
          </p>
        </CardDescription>
      </Card>
    </div>
  );
}
