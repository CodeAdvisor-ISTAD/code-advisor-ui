"use client";
import EditUserInformationForm from "@/components/userprofile/user/EditUserInformationForm";
import { FormProvider, useForm } from "react-hook-form";
// import ProfileImage from "@/components/userprofile/user/ProfileImage";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchUserProfile } from "@/hooks/api-hook/user-service";
import ProfileImage from "@/components/userprofile/user/ProfileImage";

export default function EditUser() {
  const methods = useForm();
  const [coverColor, setCoverColor] = useState("");
  // const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const [userInformation, setUserInformation] = useState(null);
  const [errorv1, setErrorv1] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // user profile
        const data = await fetchUserProfile();
        console.log("data fetchUserProfile", data);
        // user information
        setUserInformation(data);
        if (!coverColor) {
          // Only set initial cover color if it's not already set
          setCoverColor(data?.coverColor || "");
        }
      } catch (err) {
        setErrorv1(err.message);
      }
    };

    fetchData();
  }, [fetchUserProfile]);

  const handleColorChange = (color: string) => {
    setCoverColor(color);
  };
  return (
    <FormProvider {...methods}>
      <div className="flex justify-centermin-h-screen justify-center dark:bg-gray-900  p-4">
        <div className="w-[1252px] bg-white pb-4 rounded-lg">
          <div className="flex justify-center mb-8">
            <div
              className="cover w-[1252px] h-[200px] rounded-[5px] flex justify-center relative"
              style={{ backgroundColor: coverColor }}
            >
              <input
                type="color"
                value={coverColor}
                className="absolute top-2 right-2"
                onChange={(e) => handleColorChange(e.target.value)}
              />
              <ProfileImage profileAuth={null} disableButton={false} />
            </div>
          </div>
          <div className="flex flex-row space-x-5 justify-center">
            <div className="flex flex-row justify-center mt-[125px] gap-[15px]">
              <EditUserInformationForm onColorChange={handleColorChange} />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
