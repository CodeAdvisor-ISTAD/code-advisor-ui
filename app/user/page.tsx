"use client";
import { useEffect, useState } from "react";
import Bio from "@/components/userprofile/user/Bio";
import UserPost from "@/components/userprofile/user/userPost";
import UserInformationCardComponent from "@/components/userprofile/user/UserInformationCardComponent";
import AchievementLevel from "@/components/userprofile/user/AchievementCard";
import ProfileImage from "@/components/userprofile/user/ProfileImage";

interface UserProps {
  bgColor: string;
}


export default function User() {
  const [bgColor, setBgColor] = useState("#000040");

  useEffect(() => {
    // Fetch data here if needed
    // Example: fetch('/api/user').then(res => res.json()).then(data => setBgColor(data.bgColor));
  }, []);
  return (
    <div className="min-h-screen dark:bg-gray-900 p-4">
      <div className="w-[1252px] bg-white pb-4 rounded-lg">
        <div className="flex justify-center mb-8">
          {/* cover */}
          <div
            className="cover w-[1252px] h-[200px] rounded-[5px] flex justify-center relative"
            style={{ backgroundColor: bgColor }}
          >
            <ProfileImage disableButton />
            {/* avatar */}
          </div>
        </div>
        <div className="flex flex-row space-x-5 ml-5">
          <div className="flex flex-col mt-[98px] justify-center gap-4">
            {/* achievement level card */}
            <AchievementLevel />
            {/* Bio card */}
            <Bio />
            {/* user information card */}
            <UserInformationCardComponent />
          </div>
          {/* user post */}
          <UserPost />
        </div>
      </div>
    </div>
  );
}
