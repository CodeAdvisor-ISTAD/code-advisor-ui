"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import profilePlaceholder from "@/public/user-profile-image/place-holder-profile.png";
import { UseFetchUserServiceProfile } from "@/hooks/api-hook/user-service";
import { toast } from "react-toastify"; // Assuming you are using react-toastify for notifications
import { ImageUp } from "lucide-react";
import BadgeComponent from "./badge/BadgeComponent";

interface ProfileImageProps {
  disableButton: boolean;
  profileAuth: { profileImage: string }; // Adjust type based on your data
}

export default function ProfileImage({
  disableButton,
  profileAuth,
}: ProfileImageProps) {
  const { data } = UseFetchUserServiceProfile();
  const [image, setImage] = useState<string>("null");
  const [tempImage, setTempImage] = useState<string | null>(null); // Temporary image for preview
  const [showSavePopup, setShowSavePopup] = useState<boolean>(false);

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://167.172.78.79:8090/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        toast.error("បរាជ័យក្នុងការផ្ទុករូបភាព សូមព្យាយាមម្តងទៀត");
        setImage(profilePlaceholder.src);
        return;
      }

      const result = await response.json();
      setTempImage(result.file_url);
      setShowSavePopup(true); // Show the save popup
      return result.file_url; // Assuming the API returns the file URL
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("បរាជ័យក្នុងការផ្ទុករូបភាព សូមព្យាយាមម្តងទៀត");
      setImage(profilePlaceholder.src);
      throw error;
    }
  };

  console.log("upload file : " + uploadFile);

  const saveProfileImageUrl = async (fileUrl: string) => {
    const imageData = {
      imageUrl: fileUrl,
    };

    console.log("image data : ", imageData);

    try {
      const response = await fetch(
        "http://127.0.0.1:8168/users/api/v1/user_profiles/upload",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imageData),
        }
      );

      if (!response.ok) {
        toast.error("បរាជ័យក្នុងការរក្សាទុករូបភាព។ សូមព្យាយាមម្តងទៀត");
      } else {
        toast.success("រូបភាពត្រូវបានរក្សាទុក!");
      }
    } catch (error) {
      console.error("Error saving profile image URL:", error);
      toast.error("បរាជ័យក្នុងការរក្សាទុករូបភាព។ សូមព្យាយាមម្តងទៀត");
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file);
    }
  };

  const handleSave = () => {
    console.log("temp image : " + tempImage);
    if (tempImage) {
      setImage(tempImage); // Save the new image
      setShowSavePopup(false); // Hide the popup
      saveProfileImageUrl(tempImage); // Send the file URL to backend
      toast.success("រូបភាពត្រូវបានរក្សាទុក!");
    }
  };

  const handleCancel = () => {
    setTempImage(null); // Discard the temporary image
    setShowSavePopup(false); // Hide the popup
  };

  return (
    <div>
      <div className="flex flex-row absolute -bottom-28 left-8">
        <div className="relative w-[200px] h-[200px] rounded-full bg-white overflow-hidden bottom-2">
          <Image
            src={
              tempImage ||
              (image !== "null"
                ? image
                : data?.profileImage ||
                  profileAuth?.profileImage ||
                  profilePlaceholder.src)
            }
            alt="Profile"
            className="object-cover rounded-full border-4 border-gray-200 w-[200px] h-[200px]"
            fill
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="avatarInput"
          />
        </div>
        {!disableButton && (
          <button
            type="button"
            className="absolute bottom-3 left-36 cursor-pointer h-8 w-8 flex items-center justify-center bg-gray-200 text-white rounded-full hover:bg-gray-300 transition-colors duration-300"
            onClick={() => document.getElementById("avatarInput")?.click()}
          >
            <ImageUp className="w-5 h-5 text-primary" />
          </button>
        )}
        {/* Profile details section */}
        <div className="flex items-center justify-between absolute -right-60 top-[105px]">
          <div>
            <div className="flex gap-3">
              <h2 className="text-3xl font-bold">{data?.fullName}</h2>
              {/* <HoverCard>
                <HoverCardTrigger className="flex cursor-pointer items-center text-3xl">
                  ✨
                </HoverCardTrigger>
                <HoverCardContent className="text-sm text-gray-400">
                  ITE-Student
                </HoverCardContent>
              </HoverCard> */}
              <BadgeComponent />
            </div>
            <p className="text-lg text-muted-foreground">@{data?.username}</p>
            {/* <p className="text-sm text-muted-foreground font-khFont pt-1">
              គាត់គឺជា Senior
            </p> */}
          </div>
        </div>
      </div>

      {/* Save Popup */}
      {showSavePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 max-w-sm w-full rounded-xl shadow-lg transform transition-all duration-300 ease-in-out scale-100">
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">
              ផ្លាស់ប្តូររូបភាពរបស់អ្នក
            </h3>
            <div className="flex justify-center mb-6">
              <Image
                src={tempImage || ""}
                alt="New Profile Preview"
                className="object-cover rounded-full border-4 border-gray-300 w-[150px] h-[150px]"
                width={150}
                height={150}
              />
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors duration-200"
              >
                ចាកចេញ
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition-colors duration-200"
              >
                រក្សាទុក
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
