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
import OwnerPostSkeleton from "../skeleton/OwnerPostSkeleton";
import AchievementLevelSkeleton from "../skeleton/AchievementCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileImageSkeleton from "../skeleton/ProfileImageSkeletonComponent";

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

  // if (publicUserProfile === undefined) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="max-w-7xl dark:bg-gray-900 rounded-lg mx-auto">
      <div className="w-full bg-white dark:bg-darkPrimary pb-4 rounded-lg">
        <div className="flex justify-center mb-8">
          {/* cover */}
          {!loading ? (
            <div
              className="cover w-full lg:h-[170px] h-[150px] rounded-[5px] relative"
              style={{ backgroundColor: bgColor }}
            >
              {/* profile image */}
              <ProfileImage disableButton profileAuth={publicUserProfile} />
            </div>
          ) : (
            <Skeleton className="cover w-full lg:h-[200px] h-[175px] rounded-[5px] relative">
              <ProfileImageSkeleton />
            </Skeleton>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-2 lg:px-6 px-2">
          <div className="col-span-5 mt-[98px] gap-2 mb-2">
            {/* achievement level card */}
            {loading ? (
              <AchievementLevelSkeleton />
            ) : (
              <AchievementLevelComponent
                userInformation={publicUserProfile}
                disableButton={true}
              />
            )}
            {/* Bio card */}
            {loading ? (
              <Skeleton className="h-[150px] mb-2"></Skeleton>
            ) : (
              <Bio bio={""} />
            )}
            {/* user information card */}
            {loading ? (
              <Skeleton className="h-[518.6px] mb-2"></Skeleton>
            ) : (
              <UserInformationCardComponent
                userInformation={publicUserProfile}
              />
            )}
          </div>
          {/* user post */}
          <div className="col-span-7">
            {loading ? (
              <OwnerPostSkeleton />
            ) : (
              <ViewerPost username={username} authorUuid={""} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
