/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import ISTADCard from "@/components/card-component/card-trending/Card-Istad";
import TrendingComponent from "@/components/card-component/card-trending/TrendingComponent";
import ForumDetailComponent from "@/components/forum-component/forumDetailComponent";
import React from "react";

const latest = [
    "Advanced CSS techniques for modern web design",
    "Learn Tailwind CSS for responsive layouts",
    "Master React state management with Redux",
];


// If you're fetching data, make this async
export default function ForumDetailPage({
    params,
}: {
    params: { id: string };
}) {
    // You can get the forum data using the ID from params
    // For example:
    // const forumData = await getForumById(params.id);

    // If data doesn't exist, you can show 404
    // if (!forumData) notFound();

    // 1. Define your form.
   

    return (
        <main className="flex bg-gray-100 w-full lg:px-[100px] pb-6 pt-[80px] xs:px-[30px] md:px-[80px]">
            {/* Forum Detail Component */}
            <ForumDetailComponent />
            <div className="flex flex-col ml-2 gap-2 ">
                <TrendingComponent type="Latest" items={latest} />
                <ISTADCard />
            </div>
        </main>
    );
}
