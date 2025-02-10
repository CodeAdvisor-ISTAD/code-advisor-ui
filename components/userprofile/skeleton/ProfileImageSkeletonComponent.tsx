"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileImageSkeleton() {
  return (
    <div>
      {/* Profile Image and Details Skeleton */}
      <div className="flex flex-row absolute lg:-bottom-28 -bottom-20 left-8">
        {/* Profile Image Skeleton */}
        <div className="relative lg:w-[200px] bg-gray-50 dark:bg-darkSecondary lg:h-[200px] w-[125px] h-[125px] rounded-full overflow-hidden bottom-2">
          <Skeleton
            className="w-full h-full rounded-full"
            style={{ borderRadius: "50%" }}
          />
        </div>

        {/* Profile Details Skeleton */}
        <div className="flex items-center justify-between absolute lg:pl-56 pl-[150px] lg:top-[105px] top-[60px] w-[400px] lg:w-[750px]">
          <div>
            {/* Name and Badge Skeleton */}
            <div className="flex gap-2 flex-row w-full mx-auto">
              <Skeleton className="lg:text-3xl text-xl font-bold h-8 w-32" />
              {/* Badge Skeleton */}
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            {/* Additional Details Skeleton */}
            <Skeleton className="lg:text-lg text-xs text-muted-foreground h-4 w-48 mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
