"use client";

import React, { useEffect, useState } from "react";
import Bio from "@/components/userprofile/user/Bio";
import UserInformationCardComponent from "@/components/userprofile/user/UserInformationCardComponent";
import ProfileImage from "@/components/userprofile/user/ProfileImageComponent";
import SaveUserUpdateButton from "@/components/userprofile/user/SaveUserUpdateButton";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOwnUserProfile } from "@/hooks/api-hook/user/user-service";
import OwnerPost from "@/components/userprofile/user/OwnerPostComponent";
// import AchievementLevelComponent from "../achievement/AchievementCard";
import AchievementLevelComponent from "@/components/userprofile/achievement/AchievementCard";
import LoadingPage from "@/app/loading";
import ProfileImageSkeleton from "../skeleton/ProfileImageSkeletonComponent";
import { Skeleton } from "@/components/ui/skeleton";
import AchievementLevelSkeleton from "../skeleton/AchievementCardSkeleton";
import OwnerPostSkeleton from "../skeleton/OwnerPostSkeleton";

interface UserInformation {
  coverColor?: string;
  bio?: string;
  username?: string;
  authorUuid?: string;
}

export default function Owner() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const handleEdit = () => {
    router.push("/edit-user-profile");
  };
  const [userInformation, setUserInformation] =
    useState<UserInformation | null>(null);
  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const data = await getOwnUserProfile();
      setUserInformation(data);
    };

    fetchUserProfile();
  }, [userInformation]);

  return (
    <div className=" max-w-7xl p-1 mx-auto ">
      <div className="w-full bg-white pb-4 rounded-lg dark:bg-darkPrimary">
        <div className="flex justify-center mb-8">
          {/* cover */}
          {!loading ? (
            <div
              className="cover w-full lg:h-[170px] h-[150px] rounded-[5px] relative"
              style={{
                backgroundColor: userInformation?.coverColor,
              }}
            >
              {/* {loading ? (
              <ProfileImageSkeleton />
            ) : (
              <ProfileImage disableButton profileAuth={userInformation} />
            )} */}
              <ProfileImage disableButton profileAuth={userInformation} />

              <div className="absolute space-x-5 lg:top-[185px] lg:right-7 md:top-[165px] top-2 right-2">
                <SaveUserUpdateButton
                  disabledCancel={false}
                  disabledSave={false}
                  onEdit={handleEdit}
                  disabledEdit={true}
                />
              </div>
            </div>
          ) : (
            <Skeleton className="cover w-full lg:h-[200px] md:h-[170px] h-[100px] rounded-[5px] relative">
              <ProfileImageSkeleton />
            </Skeleton>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-2 lg:px-6 px-1">
          <div className="col-span-5 lg:mt-[98px] mt-14 gap-2 mb-2">
            {/* achievement level card */}
            {loading ? (
              <AchievementLevelSkeleton />
            ) : (
              <AchievementLevelComponent userInformation={userInformation} />
            )}
            {/* Bio card */}
            {loading ? (
              <Skeleton className="h-[150px] mb-2"></Skeleton>
            ) : (
              <Bio bio={userInformation?.bio || ""} />
            )}
            {/* user post card */}

            {/* user information card */}
            {loading ? (
              <Skeleton className="h-[518.6px] mb-2"></Skeleton>
            ) : (
              <UserInformationCardComponent userInformation={userInformation} />
            )}
          </div>
          {/* user post */}
          <div className="col-span-7">
            {loading ? (
              <OwnerPostSkeleton />
            ) : (
              <OwnerPost
                username={userInformation?.username || ""}
                authorUuid={userInformation?.authorUuid || ""}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
