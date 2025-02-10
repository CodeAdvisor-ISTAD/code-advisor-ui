import {
  SidebarComment,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebarContent";
import { CommentList } from "./CommentList";
import { Comment } from "@/types/engagement";
import React from "react";

interface Content {
  contentId: string;
  slug: string;
  ownerId: string;
  userId?: string;
}

export function CommentSection({
  contentId,
  ownerId,
  slug,
  userId,
  isLoading
}: Content & {isLoading? : boolean}) {
  return (
    <SidebarComment
      className="sticky border-none z-0 no-scrollbar​"
      width="400px"
      side="right"
      collapsible="offcanvas"
    >
      <SidebarContent className="bg-gray-100 dark:bg-darkPrimary no-scrollbar">
        <SidebarGroup className="pl-2 pr-0">
          <SidebarGroupContent className="overflow-hidden">
            <SidebarMenu>
              <CommentList
                contentId={contentId}
                slug={slug}
                ownerId={ownerId}
                userId={userId}
                isLoading={isLoading}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComment>
  );
}
