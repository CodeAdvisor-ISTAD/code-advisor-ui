"use client";

import Image from "next/image";
import { ChangeEvent, useState, ReactNode } from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";

interface ProfileImageProps {
  disableButton?: ReactNode;
}

export default function ProfileImagey({ disableButton }: ProfileImageProps) {
  // State to manage the profile image
  const [image, setImage] = useState<string>("/user-profile-image/lyzhia-profile.jpg");
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="">
      {/* Profile image section */}
      <div className="flex flex-row absolute -bottom-28 left-8">
        <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden border-white bg-white">
          <Image src={image} alt="Profile" fill className="object-cover" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="avatarInput"
          />
        </div>
        {disableButton ?? (
          <button
            type="button"
            className="absolute bottom-3 left-36 cursor-pointer h-8 w-8 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-700"
            onClick={() => document.getElementById("avatarInput")?.click()}
          >
            💙
          </button>
        )}
        {/* Profile details section */}
        <div className="flex items-center justify-between absolute -right-60 top-28">
          <div>
            <div className="flex gap-3">
              <h2 className="text-3xl font-bold">Eung Lyzhia</h2>
              <HoverCard>
                <HoverCardTrigger className="flex cursor-pointer items-center text-3xl">
                  ✨
                </HoverCardTrigger>
                <HoverCardContent className="text-sm text-gray-400">
                  ITE-Student
                </HoverCardContent>
              </HoverCard>
            </div>
            <p className="text-sm text-muted-foreground">@lyzhia</p>
            <p className="text-sm text-muted-foreground font-khFont pt-1">
              គាត់គឺជា Senior
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
