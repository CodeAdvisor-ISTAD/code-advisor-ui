"use client";
import ISTADCard from "@/components/card-component/card-trending/Card-Istad";
import LatestComponent from "@/components/card-component/card-trending/LatestComponent";
import TrendingComponent from "@/components/card-component/card-trending/TrendingComponent";

import { CardList } from "@/components/card-component/card/CardList";


export default function Home() {
    return (
        <main className="flex pt-[80px]">

            <CardList />
            <div className="flex flex-col ml-2 gap-2">
             <TrendingComponent></TrendingComponent>
             <LatestComponent></LatestComponent>
                <ISTADCard></ISTADCard>
            </div>
        </main>
    );
}
