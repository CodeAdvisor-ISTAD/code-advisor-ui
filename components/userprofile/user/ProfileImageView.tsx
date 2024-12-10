"use client";

import Image from "next/image";
import { useState } from "react";
import lyzhiaImage from "@/public/user-profile-image/lyzhia-profile.jpg";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";

export default function ProfileImageView({ changeImage }: any) {
  return (
    <div className="">
      <div className="flex flex-row absolute -bottom-28 left-8">
        <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden bg-white">
          <Image
            src={lyzhiaImage}
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
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
