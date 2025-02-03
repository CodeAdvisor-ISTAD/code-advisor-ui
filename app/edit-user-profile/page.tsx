"use client";
import EditUserInformationForm from "@/components/userprofile/user/EditUserInformationForm";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ProfileImage from "@/components/userprofile/user/ProfileImageComponent";
import { useQuery } from "@tanstack/react-query";
import { getOwnUserProfile } from "@/hooks/api-hook/user/user-service";

export default function EditUser() {
  const methods = useForm();
  const [coverColor, setCoverColor] = useState("");
  const router = useRouter();

  const { data: ownUser } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getOwnUserProfile(),
  });

  useEffect(() => {
    if (ownUser && !coverColor) {
      // Only set initial cover color if it's not already set
      setCoverColor(ownUser.coverColor || "#000040");
    }
  }, [ownUser, coverColor]);

  const handleColorChange = (color: string) => {
    setCoverColor(color);
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-7xl flex min-h-screen items-center dark:bg-gray-900 mx-auto">
        <div className="w-full bg-white rounded-lg">
          <div className="flex justify-center mb-8">
            <div
              className="cover w-full lg:h-[200px] h-[175px] rounded-[5px] relative"
              style={{ backgroundColor: coverColor || "#000040" }}
            >
              <input
                type="color"
                value={coverColor}
                className="absolute top-2 right-2"
                onChange={(e) => handleColorChange(e.target.value)}
              />
              <ProfileImage profileAuth={ownUser} disableButton={false} />
            </div>
          </div>
          <div className="flex flex-row space-x-5 justify-center">
            <div className="flex flex-row justify-center lg:mt-[125px] mt-[60px] gap-[15px]">
              <EditUserInformationForm onColorChange={handleColorChange} />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
