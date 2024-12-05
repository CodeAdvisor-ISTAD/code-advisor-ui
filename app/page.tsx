"use client";
import LatestComponent from "@/components/card-component/card-trending/LatestComponent";
import TrendingComponent from "@/components/card-component/card-trending/LatestComponent";
import { CardList } from "@/components/card-component/card/CardList";
import NavbarLogin from "@/components/navbar/NavbarLogin";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function Home() {
    return (
        <main className="flex pt-[80px]">

            <CardList />
            <div className="flex flex-col ml-2 gap-2 ">
                <TrendingComponent />
                <LatestComponent />
            </div>
        </main>
    );
}
