"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import profilePlaceholder from "@/public/user-profile-image/place-holder-profile.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImageUp } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProfileImage } from "@/hooks/api-hook/user/user-service";
import BadgeComponent from "../badge/BadgeComponent";
import { koh_Santepheap } from "@/app/fonts/fonts";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileImageProps {
  disableButton: boolean;
  profileAuth: any;
}

export default function ProfileImage({
  disableButton,
  profileAuth,
}: ProfileImageProps) {
  const queryClient = useQueryClient();
  const [image, setImage] = useState<string>("null");
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [showSavePopup, setShowSavePopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: updateUserProfile } = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["authProfile"] });
      toast.success("រូបភាពរបស់អ្នកត្រូវបានរក្សាទុកដោយជោគជ័យ");
      setLoading(false);
    },
    onError: () => {
      toast.error("បរាជ័យក្នុងការរក្សាទុករូបភាព សូមព្យាយាមម្តងទៀត");
      setLoading(false);
    },
  });

  const uploadFile = async (file: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://media.panda.engineer/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      setTempImage(result.file_url);
      setShowSavePopup(true);
      setLoading(false);
      return result.file_url;
    } catch (error) {
      setImage(profilePlaceholder.src);
      setLoading(false);
      return null;
    }
  };

  const saveProfileImageUrl = async (fileUrl: string) => {
    updateUserProfile({ imageUrl: fileUrl });
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadedImageUrl = await uploadFile(file);
      if (!uploadedImageUrl) {
        // Handle error if needed
      }
    }
  };

  const handleSave = () => {
    if (tempImage) {
      setImage(tempImage);
      setShowSavePopup(false);
      saveProfileImageUrl(tempImage);
    }
  };

  const handleCancel = () => {
    setTempImage(null);
    setShowSavePopup(false);
  };

  return (
    <div>
      <div className="flex flex-row absolute lg:-bottom-28 -bottom-20 left-8">
        <div className="relative lg:w-[200px] lg:h-[200px] w-[125px] h-[125px] rounded-full overflow-hidden bottom-2">
          {loading ? (
            <Skeleton
              style={{ borderRadius: "50%", height: 200, width: 200 }}
            />
          ) : (
            <Image
              src={
                tempImage ||
                (image !== "null"
                  ? image
                  : profileAuth?.profileImage || profilePlaceholder.src)
              }
              alt="Profile"
              className="object-cover rounded-full border-4 border-gray-200 lg:w-[200px] lg:h-[200px] w-[100px] h-[100px]"
              fill
            />
          )}
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
            className="absolute lg:bottom-3 lg:left-36 bottom-3 left-20 cursor-pointer h-8 w-8 flex items-center justify-center bg-gray-200 text-white rounded-full hover:bg-gray-300 transition-colors duration-300"
            onClick={() => document.getElementById("avatarInput")?.click()}
          >
            <ImageUp className="w-5 h-5 text-primary" />
          </button>
        )}
        <div className="flex items-center justify-between absolute lg:pl-56 pl-[150px] lg:top-[105px] top-[60px] w-[400px] lg:w-[750px]">
          <div>
            <div className="flex gap-2 flex-row w-full mx-auto">
              <h2 className="lg:text-3xl text-xl font-bold">
                {profileAuth?.fullName}
              </h2>
              <BadgeComponent userId={profileAuth?.id} />
            </div>
            <p className="lg:text-lg text-xs text-muted-foreground">
              @{profileAuth?.username}
            </p>
          </div>
        </div>
      </div>
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
