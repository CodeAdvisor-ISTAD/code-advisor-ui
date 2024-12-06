import LatestComponent from "@/components/card-component/card-trending/LatestComponent";
import TrendingComponent from "@/components/card-component/card-trending/LatestComponent";
import ForumCardList from "@/components/card-component/forum-card/ForumCardList";
import React from "react";

export default function page() {
    return (
        <main className="flex">
            <ForumCardList />
            <div className="flex flex-col ml-2 gap-2 ">
                <TrendingComponent />
                <LatestComponent />
            </div>
        </main>
    );
}
