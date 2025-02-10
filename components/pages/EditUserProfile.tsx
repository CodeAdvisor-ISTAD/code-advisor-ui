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
      <div className="max-w-7xl flex items-center dark:bg-gray-900 mx-auto">
        <div className="w-full bg-white dark:bg-darkPrimary rounded-lg">
          <div className="flex justify-center">
            {loading ? (
              <Skeleton className="cover w-full lg:h-[200px] mg:h-[175px] h-[100px] rounded-[5px] relative">
                <ProfileImageSkeleton />
              </Skeleton>
            ) : (
              <div
                className="cover w-full lg:h-[180px] md:h-[175px] h-[125px] rounded-[5px] relative"
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
          <div className=" space-x-5 mb-3 justify-center gap-2 md:px-4 xl:px-5">
            <div className="lg:flex lg:flex-row lg:justify-center md:mb-5  lg:mt-[125px] mt-[90px] gap-[15px] ">
              {!loading ? (
                <EditUserInformationForm onColorChange={handleColorChange} />
              ) : (
                <div className="px-2 lg:px-0 xl:px-0 md:px-16 w-full md:mt-9 lg:grid md:grid lg:grid-cols-2 md:grid-cols-1 justify-center xl:gap-[15px] lg:gap-[15px] mt-7 xl:mt-0 lg:mt-0">
                  <div className="xl:mx-1 mx-0 w-full">
                    <Skeleton className="w-full xl:h-[667px] lg:h-[600px] md:h-[200px] h-[100px] mb-4 xl:mb-0 lg:mb-0 md:mb-4"></Skeleton>
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
