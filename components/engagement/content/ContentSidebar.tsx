"use client";

import {
  SidebarComment,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
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
}

export function ContentSidebar({
  contentId,
  slug,
  ownerId,
  userId,
  comment,
  bookmark,
}: Content) {
  const [isCommentFilled, setIsCommentFilled] = useState(false);
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

  const totalReactions =
    localReactions.likeCount +
    localReactions.loveCount +
    localReactions.fireCount;

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const reactions = await getReactionsByContentId(contentId || "");
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

  if (loadingReactions) {
    return <div>Loading reactions...</div>;
  }

  const handleShare = async (sharePlatform: string) => {
    const shareData = {
      userId,
      contentId,
      sharePlatform,
    };

    try {
      const response = await shareContent(shareData as any);
      console.log("Content shared successfully:", response);
    } catch (error) {
      console.error("Error sharing content:", error);
    } 
  };

  return (
    <SidebarComment
      className="bg-gray"
      collapsible="none"
      side="left"
      width="55px"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="py-8 gap-y-8">
              <SidebarMenuItem>
                <div className="mx-4 justify-self-end">
                  <ReactionButton
                    onReactionChange={handleReactionClick}
                    slug={slug}
                    contentId={contentId}
                    ownerId={ownerId}
                    userId={userId}
                  />
                  <div className="text-center">{totalReactions}</div>
                </div>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <div className=" mx-4 justify-self-end">
                  <SidebarTrigger
                    icon={
                      isCommentFilled ? (
                        <FaRegComment
                          className="text-2xl"
                          onClick={toggleComment}
                        />
                      ) : (
                        <FaRegComment
                          className="text-2xl fill-blue-600"
                          onClick={toggleComment}
                        />
                      )
                    }
                  />
                  <div className="text-center pt-1">{comment?.length}</div>
                </div>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <div className="mx-4 justify-self-end">
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
