"use client";
import ISTADCard from "@/components/card-component/card-trending/Card-Istad";
import Recommendations from "@/components/card-component/card-trending/TrendingComponent";
import { useState } from "react";
import { CardList } from "@/components/card-component/card/CardList";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import ForumCardList from "@/components/card-component/forum-card/ForumCardList";
import { ForumList } from "@/components/card-component/forum-card/ForumList";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setSearchQuery(""); // Show all results when search is empty
    } else {
      setSearchQuery(query);
    }
  };
  

  return (
    <main className="flex w-full lg:px-[100px] pb-6 pt-[80px] xs:px-[30px] md:px-[80px]">
      <div className="ml-[264px] w-[710px] ">
        <CardList searchQuery={searchQuery} />
        {/* <div className="pt-2">
          <ForumList searchQuery={searchQuery}></ForumList>
        </div> */}
      </div>

      <div className="flex flex-col ml-2 gap-2 right-[90px] w-[340px]">
        <Recommendations type="Latest" />
        <Recommendations type="Trending" />
        <ISTADCard />
      </div>
    </main>
  );
}