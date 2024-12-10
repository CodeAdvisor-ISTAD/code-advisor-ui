import ISTADCard from "@/components/card-component/card-trending/Card-Istad";
import TrendingComponent from "@/components/card-component/card-trending/TrendingComponent";
import ForumCardList from "@/components/card-component/forum-card/ForumCardList";
import React from "react";

export default function page() {
    const latest = [
        "Advanced CSS techniques for modern web design",
        "Learn Tailwind CSS for responsive layouts",
        "Master React state management with Redux",
    ];

    return (
        <main className="flex">
            <ForumCardList />
            <div className="flex flex-col ml-2 gap-2 ">
                <TrendingComponent type="Latest" items={latest} />
                <ISTADCard />
            </div>
        </main>
    );
}
