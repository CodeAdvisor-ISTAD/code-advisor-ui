// pages/edit-user.tsx
"use client";
import EditUserInformationForm from "@/components/userprofile/user/EditUserInformationForm";
import InputBioCardComponent from "@/components/userprofile/user/InputBioCardComponent";
import { FormProvider, useForm } from "react-hook-form";
import ChangeCoverColor from "@/components/userprofile/user/ChangeColorCover";
import ProfileImage from "@/components/userprofile/user/ProfileImage";
import SaveUserUpdateButton from "@/components/userprofile/user/SaveUserUpdateButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ChangeColorCover from "@/components/userprofile/user/ChangeColorCover";

export default function EditUser() {
  const methods = useForm();
  const [bgColor, setBgColor] = useState<string>("#000040");
  const router = useRouter();

  const handleColorChange = (color: string) => {
    setBgColor(color.startsWith("#") ? color : `#${color}`);
  };

  const handleSave = async () => {
    const formData = methods.getValues();
    console.log("Form Data:", formData);
    console.log("Background Color:", bgColor);

    // Save user data logic here (e.g., API call)
    await fetch("/api/save-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        bgColor,
      }),
    });

    // Redirect to User page
    router.push("/user");
  };

  const handleCancel = () => {
    console.log("Cancelled");
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen dark:bg-gray-900 p-4">
        <div className="w-[1252px] bg-white pb-4 rounded-lg">
          <div className="flex justify-center mb-8">
            <div
              className="cover w-[1252px] h-[200px] rounded-[5px] flex justify-center relative"
              style={{ backgroundColor: bgColor }}
            >
              <ProfileImage />
            </div>
          </div>
          <div className="flex flex-row space-x-5 justify-center">
            <div className="flex flex-row justify-center mt-[125px] gap-[15px]">
              <EditUserInformationForm />
              <div className="flex flex-col gap-4">
                <InputBioCardComponent />
                <ChangeColorCover onColorChange={handleColorChange} />
                <SaveUserUpdateButton onSave={handleSave} onCancel={handleCancel} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}