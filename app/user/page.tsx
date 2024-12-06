"use client";
import { useState } from "react";
import Bio from "@/components/userprofile/Bio";
import UserInfoTable from "@/components/userprofile/userPersonalData";
import UserPost from "@/components/userprofile/userPost";
import AchievementProgress from "@/components/userprofile/AchievementCard";
import ProfileImageView from "@/components/userprofile/ProfileImageView";
export default function User() {
    const [bgColor, setBgColor] = useState("#D9D9D9");

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="flex justify-center items-center mb-8">
                {/* cover */}
                <div
                    className="cover w-[1224px] h-[200px] rounded-[5px] flex justify-center items-center relative"
                    style={{ backgroundColor: bgColor }}
                >
                    <ProfileImageView />
                    {/* avatar */}
                </div>
            </div>

            {/* color picker */}
            {/* <div className="flex justify-center mb-8">
        <input
          type="text"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="border p-2 rounded mr-2"
          placeholder="#64748b"
        />
        <button
          onClick={() => setBgColor(bgColor)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Save
        </button>
      </div> */}
            <div className="flex flex-row space-x-5">
                <div className="flex flex-col mt-[150px] ml-[135px] gap-4">
                    <AchievementProgress />
                    <Bio />
                    <UserInfoTable />
                </div>
                <UserPost />
            </div>
        </div>
    );
}
