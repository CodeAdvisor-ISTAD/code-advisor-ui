"use client";

import React, { useEffect, useState } from "react";
import Bio from "@/components/userprofile/user/Bio";
import UserPost from "@/components/userprofile/user/userPost";
import UserInformationCardComponent from "@/components/userprofile/user/UserInformationCardComponent";
import AchievementLevel from "@/components/userprofile/user/achievement/AchievementCard";
import ProfileImage from "@/components/userprofile/user/ProfileImage";
import SaveUserUpdateButton from "@/components/userprofile/user/SaveUserUpdateButton";
import { useRouter } from "next/navigation";
import { UserRoundPen } from "lucide-react"
import { useQuery } from "@tanstack/react-query";
import { getOwnUserProfile } from "@/hooks/api-hook/user/user-service";

export default function Owner() {

  const router = useRouter();

  const handleEdit = () => {
    router.push("/edit-user-profile");
  };

  const { data: userInformation } = useQuery({
    queryKey: ["profile"],
    queryFn: getOwnUserProfile
  });// Fetch the user profile

  return (
    <div className="min-h-screen dark:bg-gray-900 p-4 flex justify-center">
      <div className="w-full xs:w-[500px] lg:w-[1252px] bg-white pb-4 rounded-lg">
        <div className="flex justify-center mb-8">
          {/* cover */}
          <div
            className="cover xs:w-[500px] lg:w-[1252px] h-[200px] rounded-[5px] flex justify-center relative"
            style={{ backgroundColor: userInformation?.coverColor }}
          >
            {/* profile image */}
            <ProfileImage disableButton profileAuth={userInformation}/>
            
            <div className="absolute space-x-5 top-[230px] right-7 ">
              <SaveUserUpdateButton
                disabledCancel={false}
                disabledSave={false}
                onEdit={handleEdit}
                disabledEdit={true}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-2 ml-6">
          <div className="flex flex-col mt-[98px] gap-2">
            {/* achievement level card */}
            <AchievementLevel userId={userInformation?.id} />
            {/* Bio card */}
            <Bio bio={userInformation?.bio} />
            {/* user information card */}
            <UserInformationCardComponent userInformation={userInformation} />
          </div>
          {/* user post */}
          <UserPost username={userInformation?.username}/>
        </div>
      </div>
    </div>
  );
}
