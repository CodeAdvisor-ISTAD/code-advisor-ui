"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import emptyImage from "@/public/user-profile-image/empty-folder.png";


export default function ViewerEmptyCard() {
  const route = useRouter();
  return (
    <Card className="w-full p-6 rounded-lg bg-white flex flex-col items-center">
      <CardTitle className="font-khFont text-2xl pb-2 text-center ">
      មិនទាន់មានទិន្នន័យ
      </CardTitle>
      <CardDescription className="flex flex-col justify-center items-center text-center lg:w-[450px] w-[375px]">
        <Image src={emptyImage} alt="empty" width={125} height={125} />
      </CardDescription>
      
    </Card>
  );
}
