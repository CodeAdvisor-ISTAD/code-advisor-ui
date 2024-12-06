"use client";
import LatestComponent from "@/components/card-component/card-trending/LatestComponent";
import TrendingComponent from "@/components/card-component/card-trending/LatestComponent";
import { CardList } from "@/components/card-component/card/CardList";

export default function Home() {
    return (
        <main className="flex">

            <CardList />
            <div className="flex flex-col ml-2 gap-2 ">
                <TrendingComponent />
                <LatestComponent />
            </div>
        </main>
    );
}
