"use client";
import EditUserInformationForm from "@/components/userprofile/user/EditUserInformationForm";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import ProfileImage from "@/components/userprofile/user/ProfileImageComponent";
import { useQuery } from "@tanstack/react-query";
import { getOwnUserProfile } from "@/hooks/api-hook/user/user-service";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileImageSkeleton from "@/components/userprofile/skeleton/ProfileImageSkeletonComponent";

export default function EditUser() {
  const methods = useForm();
  const [coverColor, setCoverColor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const { data: ownUser } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getOwnUserProfile(),
  });

  useEffect(() => {
    if (ownUser && !coverColor) {
      // Only set initial cover color if it's not already set
      setCoverColor(ownUser.coverColor);
    }
  }, [ownUser, coverColor]);

  const handleColorChange = (color: string) => {
    setCoverColor(color);
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-7xl flex min-h-screen items-center dark:bg-gray-900 mx-auto">
        <div className="w-full bg-white dark:bg-darkPrimary rounded-lg">
          <div className="flex justify-center mb-8">
            {loading ? (
              <Skeleton className="cover w-full lg:h-[200px] h-[175px] rounded-[5px] relative">
                <ProfileImageSkeleton />
              </Skeleton>
            ) : (
              <div
                className="cover w-full lg:h-[180px] h-[175px] rounded-[5px] relative"
                style={{ backgroundColor: coverColor || "#000040" }}
              >
                {/* <input
                  type="color"
                  value={coverColor}
                  className="absolute top-2 right-2"
                  onChange={(e) => handleColorChange(e.target.value)}
                /> */}
                <ProfileImage profileAuth={ownUser} disableButton={false} />
              </div>
            )}
          </div>
          <div className="flex flex-row space-x-5 mb-3 justify-center gap-2">
            <div className="flex flex-row justify-center lg:mt-[125px] mt-[60px] gap-[15px] ">
              {!loading ? (
                <EditUserInformationForm onColorChange={handleColorChange} />
              ) : (
                <div className="w-full grid lg:grid-cols-2 grid-cols-1 justify-center gap-[15px]">
                  <div className="mx-1 lg:mx-0">
                    <Skeleton className="lg:w-[500px] w-[400px] h-[667px] "></Skeleton>
                  </div>
                  <div className="flex flex-col gap-4 ">
                    <div className="flex flex-col items-center gap-4 mx-1 lg:mx-0">
                      <Skeleton className="w-full h-[132px]"></Skeleton>
                      <Skeleton className="w-full lg:h-[167px] h-[132px]"></Skeleton>
                      <Skeleton className="w-full lg:h-[147px] h-[132px]"></Skeleton>
                    </div>
                    <div className="flex justify-end gap-3 mr-1 lg:mr-0 ">
                      <Skeleton className="w-[87.67px] h-[40px]"></Skeleton>
                      <Skeleton className="w-[75.13px] h-[40px]"></Skeleton>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
