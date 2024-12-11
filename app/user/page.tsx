"use client";
import { useEffect, useState } from "react";
import Bio from "@/components/userprofile/user/Bio";
import UserPost from "@/components/userprofile/user/userPost";
import UserInformationCardComponent from "@/components/userprofile/user/UserInformationCardComponent";
import AchievementLevel from "@/components/userprofile/user/AchievementCard";
import ProfileImage from "@/components/userprofile/user/ProfileImage";
import SaveUserUpdateButton from "@/components/userprofile/user/SaveUserUpdateButton";
import { useRouter } from "next/navigation";


export default function User() {
  const [bgColor] = useState("#000040");
  const router = useRouter();

  const handleEdit = () => {
    router.push("/edituser");
  };

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
            {/* profile image */}
            <ProfileImage disableButton />
            <div className="absolute space-x-5 top-[230px] right-[1px]">
              <SaveUserUpdateButton disabledCancel={false} disabledSave={false} onEdit={handleEdit} disabledEdit={true} />
            </div>
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
