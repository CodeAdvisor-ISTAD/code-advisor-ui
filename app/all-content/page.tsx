// app/allpage/page.tsx
"use client";

import ISTADCard from "@/components/card-component/card-trending/Card-Istad";
import Recommendations from "@/components/card-component/card-trending/TrendingComponent";
import { CardList } from "@/components/card-component/card/CardList";
import { ForumList } from "@/components/card-component/forum-card/ForumList";
import { useSearchParams } from "next/navigation";
import TechAndKeywordList from "@/app/content/tags/page";

export default function AllPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");

    return (
        <main className="pt-[80px] flex mb-10">
            <div className="flex flex-col gap-2">
                <div className="w-[700px] ml-[200px]">
                    <CardList searchQuery={query || ""} />
                </div>
                <div className="w-[700px] ml-[200px]">
                    <ForumList searchQuery={query || ""} />
                </div>
            </div>

            {/* Add the TechAndKeywordList component here */}
            <div className="ml-[10px] -mt-[80px]">
                <TechAndKeywordList />
            </div>

            {/*<Recommendations type="Latest" />*/}
            {/*<Recommendations type="Trending" />*/}
            {/*<ISTADCard />*/}
        </main>
    );
}