import React from "react";
import { ForumCardComponent } from "./ForumCardComponent";
import TagComponent from "@/components/tag/tagComponent";

export default function ForumCardList({ forumCardData = { content: [] } }: { forumCardData?: any }) {
    console.log("forumCardData", forumCardData);
    return (
        <div className="w-full">
            <TagComponent />
            <div className="grid grid-cols-1 gap-2 max-w-7xl mx-auto border rounded-sm">
                {forumCardData?.content?.map((card: ForumCardType, index: number) => (
                    <ForumCardComponent key={`${card.uuid}-${index}`} forumCardData={card} />
                ))}
            </div>
        </div>
    );
}