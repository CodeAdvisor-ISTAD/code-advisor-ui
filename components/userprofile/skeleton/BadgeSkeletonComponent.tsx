import LoadingPage from "@/app/loading";
import { getOwnUserProfile } from "@/hooks/api-hook/user/user-service";
import { fetchBadge } from "@/lib/user";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function BadgeSkeletonComponent({ userId }: { userId: string }) {
  const { data: badgeData, isLoading: isBadgeLoading } = useQuery({
    queryKey: ["badge", userId],
    queryFn: () => fetchBadge(userId),
    enabled: !!userId,
  });

  // if (isBadgeLoading) return <LoadingPage />;

  return (
    <div>
      <HoverCard>
        <HoverCardTrigger className="flex cursor-pointer items-center pb-2 lg:h-10 lg:w-10 h-7 w-7">
          {badgeData?.badgeImage ? (
            <img src={badgeData?.badgeImage} alt="badge" />
          ) : (
            <div className="lg:text-3xl text-xl">🏵️</div>
          )}
        </HoverCardTrigger>
        <HoverCardContent className="text-sm text-gray-400 bg-gray-50 p-2 rounded-sm">
          {badgeData?.badgeName || "user"}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
