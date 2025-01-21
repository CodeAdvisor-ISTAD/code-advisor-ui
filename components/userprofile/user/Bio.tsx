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
      <Card className="w-full mb-2 h-[151px] p-6 rounded-lg bg-white">
        <div className="w-full h-[55px] relative">
          <CardTitle className="left-0 top-0 absolute text-[#000040] text-2xl">
            ប្រវត្តិរូប
          </CardTitle>
          <div className="w-[16px] h-[2.5px] left-[13px] top-[27px] absolute bg-[#f31260]"></div>
        </div>
        <CardDescription>
          <p>{user?.bio ? user.bio : "មិនមានទិន្នន័យ"}</p>
        </CardDescription>
      </Card>
    </div>
  );
}
