import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/userprofile/tabs";

import { Skeleton } from "@/components/ui/skeleton";

export default function OwnerPostSkeleton() {
  return (
    <div className="lg:mt-[95px] mt-[25px]">
      <Tabs defaultValue="forum">
        <div className="flex gap-2 mt-3">
          <Skeleton className="w-[100px] h-[28px]"></Skeleton>
          <Skeleton className="w-[100px] h-[28px]"></Skeleton>
        </div>
        <div className="flex space-x-2 pt-1 pb-0.5">
          <Skeleton className="border rounded-lg w-[490px] h-[34.4px]"></Skeleton>
          <Skeleton className="w-[200px] h-[34.4px]"></Skeleton>
        </div>
        <Skeleton className="mt-2 h-[232.6px] w-[696.68px]"></Skeleton>
        {/* <Skeleton className="mt-2 h-[150px] w-[696.68px]"></Skeleton>
        <Skeleton className="mt-2 h-[150px] w-[696.68px]"></Skeleton>
        <Skeleton className="mt-2 h-[150px] w-[696.68px]"></Skeleton> */}
      </Tabs>
    </div>
  );
}
