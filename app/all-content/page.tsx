// app/allpage/page.tsx
"use client";

import ISTADCard from "@/components/card-component/card-trending/Card-Istad";
import Recommendations from "@/components/card-component/card-trending/TrendingComponent";
import { CardList } from "@/components/card-component/card/CardList";
import { ForumList } from "@/components/card-component/forum-card/ForumList";
import { useSearchParams } from "next/navigation";

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

      <div className="flex flex-col ml-2 gap-2 right-[90px] w-[340px]">
        <Recommendations type="Latest" />
        <Recommendations type="Trending" />
        <ISTADCard />
      </div>
    </main>
  );
}
