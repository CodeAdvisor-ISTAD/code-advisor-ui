import React from "react";
import { ForumCardComponent } from "./ForumCardComponent";
import TagComponent from "@/components/tag/tagComponent";

export default function ForumCardList({ forumCardData = { content: [] } }: { forumCardData?: any }) {
    return (
        <div className="ml-[264px] w-full">
            <TagComponent />
            <div className="grid grid-cols-1 gap-2 max-w-7xl mx-auto">
                {forumCardData?.content?.map((card: ForumCardType) => (
                    <ForumCardComponent key={card.uuid} forumCardData={card} />
                ))}
            </div>
        </div>
    );
}