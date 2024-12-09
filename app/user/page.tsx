"use client";
import { useState } from "react";
import Bio from "@/components/userprofile/Bio";
import UserInfoTable from "@/components/userprofile/UserInformation";
import UserPost from "@/components/userprofile/userPost";
import AchievementProgress from "@/components/userprofile/AchievementCard";
import ProfileImageView from "@/components/userprofile/ProfileImageView";
export default function User() {
  const [bgColor, setBgColor] = useState("#D9D9D9");

  return (
    <div className=" dark:bg-gray-900 p-4">
      <div className="flex justify-center items-center">
        <div className="flex flex-col bg-white w-[1224px] min-h-screen pb-6">
          <div className="flex justify-center items-center mb-8">
            {/* cover */}
            <div
              className="cover w-[1224px] h-[200px] rounded-[5px] flex justify-center items-center relative"
              style={{ backgroundColor: bgColor }}
            >
              <ProfileImageView icon='hello' />
            </div>
          </div>
          <div className="flex space-x-5 ">
            <div className="flex flex-col mt-[90px] gap-4">
              <AchievementProgress />
              <Bio />
              <UserInfoTable />
            </div>
            <UserPost />
          </div>
        </div>
      </div>
    </div>
  );
}
