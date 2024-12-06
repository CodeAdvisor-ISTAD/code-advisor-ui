"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/userprofile/avatar";
import lyzhia from "@/public/user-profile-image/lyzhia-profile.jpg";

export default function ProfileName() {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="flex justify-center items-center mb-8">
          {/* avatar */}
          <Avatar className="w-[200px] h-[200px] absolute bottom-[-115px] left-[25px]">
            <AvatarImage src={lyzhia.src} />
            {/* place holder */}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="absolute top-[227.5px] ml-[400px] left-[7.5px]">
        <div className="flex ">
          <h1 className="text-[2rem] font-bold font-roboto">Eung lyzhia</h1>
          <h1>✨</h1>
        </div>
        <p className="text-[1rem] pb-1 text-gray-600">@lyzhia</p>
        <p className="text-[1rem] font-khFont">គាត់គឺជា Senior</p>
      </div>
    </div>
  );
}
