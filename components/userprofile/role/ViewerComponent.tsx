"use client";
import { useEffect, useState } from "react";
import Bio from "@/components/userprofile/user/Bio";
import UserPost from "@/components/userprofile/user/userPost";
import UserInformationCardComponent from "@/components/userprofile/user/UserInformationCardComponent";
import AchievementLevel from "@/components/userprofile/user/achievement/AchievementCard";
import ProfileImage from "@/components/userprofile/user/ProfileImage";
import { useRouter } from "next/navigation";
import { getUserByUsername } from "@/hooks/api-hook/user/user-service";
import { useQuery } from "@tanstack/react-query";

export default function Viewer({username} : {username: string}) {
  const [bgColor, setBgColor] = useState("#000040");
  const router = useRouter();

  const { data : publicUserProfile} = useQuery({
    queryKey: ["publicUserProfile"],
    queryFn: () => getUserByUsername(username)
  });

  return (
    <div className="min-h-screen dark:bg-gray-900 p-4 flex justify-center">
      <div className="w-full xs:w-[500px] lg:w-[1252px] bg-white pb-4 rounded-lg">
        <div className="flex justify-center mb-8">
          {/* cover */}
          <div
            className="cover xs:w-[500px] lg:w-[1252px] h-[200px] rounded-[5px] flex justify-center relative"
            style={{ backgroundColor: bgColor }}
          >
            {/* profile image */}
            <ProfileImage disableButton profileAuth={publicUserProfile} />
          </div>
        </div>
        <div className="flex flex-row space-x-2 ml-6">
          <div className="flex flex-col mt-[98px] gap-2">
            {/* achievement level card */}
            <AchievementLevel />
            {/* Bio card */}
            <Bio bio={""} />
            {/* user information card */}
            <UserInformationCardComponent userInformation={publicUserProfile} />
          </div>
          {/* user post */}
          <UserPost username={username}/>
        </div>
      </div>
    </div>
  );
}
