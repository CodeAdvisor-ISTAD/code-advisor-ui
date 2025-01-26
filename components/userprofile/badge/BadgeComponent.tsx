import { fetchBadge } from "@/lib/user";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import React, { useEffect, useState } from "react";

export default function BadgeComponent() {
  const [badge, setBadge] = useState(null);
  const [errorv1, setErrorv1] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // user profile
        const data = await fetchBadge();
        console.log("data badge", data);
        // user information
        setBadge(data);
      } catch (err) {
        setErrorv1(err.message);
      }
    };

    fetchData();
  }, [fetchBadge]);
  return (
    <div>
      <HoverCard>
        <HoverCardTrigger className="flex cursor-pointer items-center pb-2 lg:h-10 lg:w-10 h-7 w-7">
          {badge?.badgeImage ? (
            <img src={badge.badgeImage} alt="badge" />
          ) : (
            <>🌟</>
          )}
        </HoverCardTrigger>
        <HoverCardContent className="text-sm text-gray-400 bg-gray-50 p-2 rounded-sm">
          ITE-Student
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
