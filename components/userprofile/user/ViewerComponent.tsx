"use client";
import { useEffect, useState } from "react";
import Bio from "@/components/userprofile/user/Bio";
import UserPost from "@/components/userprofile/user/OwnerPostComponent";
import UserInformationCardComponent from "@/components/userprofile/user/UserInformationCardComponent";
import ProfileImage from "@/components/userprofile/user/ProfileImageComponent";
import { useRouter } from "next/navigation";
import { getUserByUsername } from "@/hooks/api-hook/user/user-service";
import { useQuery } from "@tanstack/react-query";
// import AchievementLevelComponent from "../achievement/AchievementCard";
import AchievementLevelComponent from "@/components/userprofile/achievement/AchievementCard";
import ViewerPost from "./ViewerPostComponent";
import { log } from "console";
import OwnerPostSkeleton from "../skeleton/OwnerPostSkeleton";

export default function Viewer({ username }: { username: string }) {
  const [bgColor, setBgColor] = useState("#000040");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const { data: publicUserProfile } = useQuery({
    queryKey: ["publicUserProfile"],
    queryFn: () => getUserByUsername(username),
  });

  if (publicUserProfile === undefined) {
    return <div>Loading...</div>;
  }

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 px-6">
          <div className="col-span-5 mt-[98px] gap-2 mb-2">
            {/* achievement level card */}
            <AchievementLevelComponent
              userInformation={publicUserProfile}
              disableButton={true}
            />
            {/* Bio card */}
            <Bio bio={""} />
            {/* user information card */}
            <UserInformationCardComponent userInformation={publicUserProfile} />
          </div>
          {/* user post */}
          <div className="col-span-7">
            {loading ? (
              <OwnerPostSkeleton />
            ) : (
              <UserPost username={username} authorUuid={""} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
