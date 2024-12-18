"use client";
import { useEffect, useState } from "react";
import Bio from "@/components/userprofile/user/Bio";
import UserPost from "@/components/userprofile/user/userPost";
import UserInformationCardComponent from "@/components/userprofile/user/UserInformationCardComponent";
import AchievementLevel from "@/components/userprofile/user/achievement/AchievementCard";
import ProfileImage from "@/components/userprofile/user/ProfileImage";
import SaveUserUpdateButton from "@/components/userprofile/user/SaveUserUpdateButton";
import { useRouter } from "next/navigation";

export default function User() {
  const [bgColor, setBgColor] = useState("#000040");
  const router = useRouter();

  const handleEdit = () => {
    router.push("/edituser");
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/edit_user_profiles/lazizhia")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.coverColor) {
          setBgColor(data.coverColor);
        }
      })
      .catch((error) => console.error("Error fetching cover color:", error));
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
            <div className="absolute space-x-5 top-[230px] right-7">
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
