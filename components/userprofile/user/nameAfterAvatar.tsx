"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/userprofile/hover-card";

export default function NameAfterAvatar() {
  return (
    <div className="absolute top-[227.5px] ml-[400px] left-[7.5px]">
      <div className="flex justify-center items-center">
        <h1 className="text-[2rem] font-bold font-roboto">Eung lyzhia</h1>
        {/* Badge */}
        <HoverCard>
          <HoverCardTrigger className="pointer">❤️</HoverCardTrigger>
          <HoverCardContent>ITE-Student</HoverCardContent>
        </HoverCard>
      </div>
      <p className="text-[1rem] pb-1 text-gray-600">@lyzhia</p>
      <p className="text-[1rem] font-khFont">គាត់គឺជា Senior</p>
    </div>
  );
}
