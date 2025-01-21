"use client";

import React from "react";
import Bio from "@/components/userprofile/user/Bio";
import UserPost from "@/components/userprofile/user/OwnerPostComponent";
import UserInformationCardComponent from "@/components/userprofile/user/UserInformationCardComponent";
import ProfileImage from "@/components/userprofile/user/ProfileImageComponent";
import SaveUserUpdateButton from "@/components/userprofile/user/SaveUserUpdateButton";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOwnUserProfile } from "@/hooks/api-hook/user/user-service";
import OwnerPost from "@/components/userprofile/user/OwnerPostComponent";
import AchievementLevelComponent from "../achievement/AchievementCard";

export default function Owner() {
  const router = useRouter();

  const handleEdit = () => {
    router.push("/edit-user-profile");
  };

  const { data: userInformation } = useQuery({
    queryKey: ["profile"],
    queryFn: getOwnUserProfile,
  }); // Fetch the user profile

  console.log("userInformation : ", userInformation);

  return (
    <div className=" max-w-7xl dark:bg-gray-900 lg:p-4 p-1 mx-auto">
      <div className="w-full bg-white pb-4 rounded-lg">
        <div className="flex justify-center mb-8">
          {/* cover */}
          <div
            className="cover w-full lg:h-[200px] h-[175px] rounded-[5px] relative"
            style={{ backgroundColor: userInformation?.coverColor }}
          >
            {/* profile image */}
            <ProfileImage disableButton profileAuth={userInformation} />

            <div className="absolute space-x-5 lg:top-[230px] lg:right-7 top-20 right-2">
              <SaveUserUpdateButton
                disabledCancel={false}
                disabledSave={false}
                onEdit={handleEdit}
                disabledEdit={true}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-2 lg:px-6 px-1">
          <div className="col-span-5 lg:mt-[98px] mt-14 gap-2 mb-2">
            {/* achievement level card */}
            <AchievementLevelComponent userInformation={userInformation} />
            {/* Bio card */}
            <Bio bio={userInformation?.bio} />
            {/* user information card */}
            <UserInformationCardComponent userInformation={userInformation} />
          </div>
          {/* user post */}
          <div className="col-span-7">
            <OwnerPost
              username={userInformation?.username}
              authorUuid={userInformation?.authorUuid}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
