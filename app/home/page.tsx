"use client";
import ISTADCard from "@/components/card-component/card-trending/Card-Istad";
import Recommendations from "@/components/card-component/card-trending/TrendingComponent";

import { CardList } from "@/components/card-component/card/CardList";


export default function Home() {
    const latest = [
        "Advanced CSS techniques for modern web design",
        "Learn Tailwind CSS for responsive layouts",
        "Master React state management with Redux",
      ];
    
      const trending = [
        "Exploring Next.js for server-side rendering",
        "Introduction to GraphQL for API development",
        "Top 10 VSCode extensions for developers",
      ];
    return (
        <main className="flex bg-gray-100 w-full lg:pl-[364px] pb-6 pt-[80px] xs:px-[30px] md:px-[80px] bg-red-500">

            <CardList />
            <div className="flex flex-col ml-2 gap-2  ">
            <Recommendations type="Latest" items={latest} />
            <Recommendations type="Trending" items={trending} />
            <ISTADCard></ISTADCard>
            </div>
        </main>
    );
}
