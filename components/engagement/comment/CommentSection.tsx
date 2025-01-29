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
  comment: Comment[];
  contentId?: string;
  slug?: string;
  ownerId?: string;
  userId?: string;
}

export function CommentSection({comment = [], contentId, ownerId, slug, userId}: Content) {
  return (
    <SidebarComment className="sticky border-none z-0 no-scrollbar​" width="400px" side="right" collapsible="offcanvas">
      <SidebarContent className="bg-gray-100 no-scrollbar">
        <SidebarGroup className="pl-2 pr-0">
          <SidebarGroupContent className="overflow-hidden">
            <SidebarMenu>
              <CommentList contentId={contentId } comment={comment} slug={slug} ownerId={ownerId} userId={userId} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComment>
  );
}
