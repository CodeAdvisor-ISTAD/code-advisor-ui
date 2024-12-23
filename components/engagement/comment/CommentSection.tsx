import {
  SidebarComment,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebarContent";
import { CommentList } from "./CommentList";
import { Content } from "@/types/engagement";
import React from "react";

export function CommentSection({comment = [], id}: Content) {
  return (
    <SidebarComment className="sticky border-none z-0 no-scrollbar​" width="400px" side="right" collapsible="offcanvas">
      <SidebarContent className="bg-gray-100 no-scrollbar">
        <SidebarGroup className="pl-2 pr-0">
          <SidebarGroupContent className="overflow-hidden">
            <SidebarMenu>
              <CommentList contentId={id} comment={comment}/>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComment>
  );
}
