"use client";

import {
  SidebarComment,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebarContent";
import { MdMoreHoriz } from "react-icons/md";
import { IoIosShareAlt } from "react-icons/io";

import { it } from "node:test";
import {
  FaRegHeart,
  FaRegComment,
  FaRegBookmark,
  FaComment,
  FaBookmark,
} from "react-icons/fa";
import { ReactionButton } from "./Reaction";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  getReactionsByContentId,
  shareContent,
} from "@/hooks/api-hook/engagement/engagement-api";

interface Content {
  contentId?: string;
  slug?: string;
  ownerId?: string;
  userId?: string;
  comment?: Comment[];
  bookmark?: number;
  totalReactions?: number;
}

export function ContentSidebar({
  contentId,
  slug,
  ownerId,
  userId,
  comment,
  bookmark,
  totalReactions,
}: Content) {
  const [isCommentFilled, setIsCommentFilled] = useState(true);
  const [isBookmarkFilled, setIsBookmarkFilled] = useState(false);
  const [currentBookmarkCount, setCurrentBookmarkCount] = useState(
    bookmark || 0
  );
  const [loadingReactions, setLoadingReactions] = useState(true);
  const [localReactions, setLocalReactions] = useState({
    likeCount: 0,
    loveCount: 0,
    fireCount: 0,
  });

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const reactions = await getReactionsByContentId(contentId);
        setLocalReactions(reactions);
      } catch (error) {
        console.error("Failed to fetch reactions:", error);
      } finally {
        setLoadingReactions(false);
      }
    };

    fetchReactions();
  }, [contentId]);

  const toggleComment = () => setIsCommentFilled(!isCommentFilled);

  const toggleBookmark = () => {
    setIsBookmarkFilled(!isBookmarkFilled);

    if (isBookmarkFilled) {
      setCurrentBookmarkCount(currentBookmarkCount - 1);
    } else {
      setCurrentBookmarkCount(currentBookmarkCount + 1);
    }
  };

  const handleReactionClick = (reactionType: keyof typeof localReactions) => {
    setLocalReactions((prev) => ({
      ...prev,
      [reactionType]: prev[reactionType] + 1, // Increment reaction count
    }));
  };

  const handleShare = async (sharePlatform: string) => {
    const shareData = {
      userId,
      contentId,
      sharePlatform,
    };

    try {
      const response = await shareContent(shareData);
      console.log("Content shared successfully:", response);
      alert("Content shared successfully!");
    } catch (error) {
      console.error("Error sharing content:", error);
      alert("Failed to share content. Please try again.");
    }
  };

  const [isVisible, setIsVisible] = useState(true); // State to control visibility
  const [prevScrollPos, setPrevScrollPos] = useState(0); // Track previous scroll position
  const [isMobile, setIsMobile] = useState(false); // State to check if the screen is mobile

  // Check if the screen is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    // Check on mount and resize
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Handle scroll behavior for mobile only
  useEffect(() => {
    if (!isMobile) return; // Exit if not on mobile

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Determine scroll direction
      if (currentScrollPos > prevScrollPos) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      // Update previous scroll position
      setPrevScrollPos(currentScrollPos);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, isMobile]);

  return (
    <SidebarComment
      className={`bg-gray h-16 md:h-full bg-background md:bg-transparent md:pt-0 pt-5 flex flex-row transition-transform duration-300 ${
        isMobile && !isVisible ? "translate-y-full" : "translate-y-0"
      }`}
      collapsible="none"
      side="left"
      width="55px"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="mx-4 justify-self-end flex md:flex-col md:gap-2 flex-row gap-3">
                  <ReactionButton
                    onReactionChange={handleReactionClick}
                    slug={slug}
                    contentId={contentId}
                    ownerId={ownerId}
                    userId={userId}
                  />
                  <div className="text-center pt-1">{totalReactions}</div>
                </div>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <div className="mx-4 justify-self-end flex md:flex-col md:gap-2 flex-row gap-3">
                  <SidebarTrigger
                    icon={
                      <FaRegComment
                        className={`text-2xl ${
                          isCommentFilled ? "md:fill-blue-600" : ""
                        }`}
                        onClick={toggleComment}
                      />
                    }
                  />
                  <div className="text-center pt-1">{comment?.length || 0}</div>
                </div>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <div className="mx-4 justify-self-end flex md:flex-col md:gap-2 flex-row gap-3">
                  {isBookmarkFilled ? (
                    <FaBookmark
                      className="text-2xl fill-yellow-500"
                      onClick={toggleBookmark}
                    />
                  ) : (
                    <FaRegBookmark
                      className="text-2xl"
                      onClick={toggleBookmark}
                    />
                  )}
                  <div className="text-center pt-1">{currentBookmarkCount}</div>
                </div>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="justify-self-end mx-4">
                      <MdMoreHoriz className="text-2xl" />
                      <span className="sr-only">More options</span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="px-2">
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => handleShare("X")}>
                        Share to X
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("Facebook")}>
                        Share to Facebook
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("LinkedIn")}>
                        Share to LinkedIn
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <a href={`/report/content/${contentId}`}>
                          Report Abuse
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComment>
  );
}
