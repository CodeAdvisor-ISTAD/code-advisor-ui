"use server";
import ISTADCard from "@/components/card-component/card-trending/Card-Istad";
import TrendingComponent from "@/components/card-component/card-trending/TrendingComponent";
import ForumCardList from "@/components/card-component/forum-card/ForumCardList";
import React from "react";

const getAllForums = async function fetchAllForums() {
    const response = await fetch(`http://127.0.0.1:8168/forums/api/v1/questions`);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }


};

export default async function Page() {
    const allForum = await getAllForums();

    const latest = [
        "Advanced CSS techniques for modern web design",
        "Learn Tailwind CSS for responsive layouts",
        "Master React state management with Redux",
    ];


    return (
        <main className="flex bg-gray-100 w-full lg:px-[100px] pb-6 pt-[80px] xs:px-[30px] md:px-[80px]">
            <ForumCardList forumCardData={allForum}/>
            <div className="flex flex-col ml-2 gap-2 ">
                <TrendingComponent type="Latest" items={latest} />
                <ISTADCard />
            </div>
        </main>
    );
}
