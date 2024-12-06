"use client";

import Image from "next/image";
import { useState } from "react";
import lyzhiaImage from "@/public/user-profile-image/lyzhia-profile.jpg";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";

export default function ProfileImage() {
  const [image, setImage] = useState("/default-profile.png");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="flex flex-row absolute -bottom-28 left-8">
      <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden border-4 border-white bg-white">
        <Image src={lyzhiaImage} alt="Profile" fill className="object-cover" />
      </div>
      {/* Profile details section */}
      <div className="flex items-center justify-between absolute -right-44 top-28 ml-32">
        <div className="">
          <div className="flex pb-1">
            <h2 className="text-2xl font-bold">Eung Lyzhia</h2>
            <HoverCard>
              <HoverCardTrigger className="cursor-pointer">✨</HoverCardTrigger>
              <HoverCardContent>ITE-Student</HoverCardContent>
            </HoverCard>
          </div>
          <p className="text-sm text-muted-foreground pb-1">@lyzhia</p>
          <p className="text-sm text-muted-foreground​ font-khFont">
            គាត់គឺជា Senior
          </p>
        </div>
      </div>
    </div>
  );
}
