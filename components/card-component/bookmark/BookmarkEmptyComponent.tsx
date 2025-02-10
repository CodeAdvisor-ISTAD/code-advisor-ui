"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import emptyImage from "@/public/user-profile-image/មិនមានទិន្នន័យ.png";

export default function BookmarkEmptyComponent() {
  const route = useRouter();
  return (
    <Card className="w-full p-6 rounded-lg bg-white dark:bg-darkPrimary flex flex-col items-center">
      <CardTitle className="font-khFont lg:text-2xl text-xl pb-2 text-center ">
        មិនទាន់មានទិន្នន័យ
      </CardTitle>
      <CardDescription className="flex flex-col justify-center items-center text-center lg:w-[450px] w-[375px]">
        <div className="w-[200px] h-[200px] relative">
          <Image src={emptyImage} alt="empty" width={1000} height={1000} />
        </div>
      </CardDescription>
    </Card>
  );
}
