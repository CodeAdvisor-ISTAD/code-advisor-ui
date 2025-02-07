import ISTADCard from "@/components/card-component/card-trending/Card-Istad";
import TrendingComponent from "@/components/card-component/card-trending/TrendingComponent";
import ForumDetailComponent from "@/components/forum-component/forumDetailComponent";
import React, { useEffect, useState } from "react";
import Preview from "@/components/text-editor/preview";
import { usePathname, useParams } from "next/navigation";

const latest = [
  "Advanced CSS techniques for modern web design",
  "Learn Tailwind CSS for responsive layouts",
  "Master React state management with Redux",
];

export type ParamProps = {
  params: Promise<{ slug: any }>;
};

// If you're fetching data, make this async
export default async function ForumDetails({ params }: ParamProps) {
  // const { slug: forumSlug } = useParams();
  const { slug } = await params;

    return (
        <main className="flex bg-gray-100 dark:bg-darkSecondary w-full lg:px-[100px] pb-6 pt-[80px] xs:px-[30px] md:px-[80px]">
            {/* Forum Detail Component */}
            <ForumDetailComponent slug={slug as string} />
            <div className="flex flex-col ml-2 gap-2 ">
                <TrendingComponent type="Latest" item={latest} />
                <ISTADCard />
            </div>
        </main>
    );
}
