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
    <main className="flex justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-[1200px] ">
        {/* Left Side Content */}
        <div className="w-full md:w-[640px] lg:w-[710px] mb-2 md:p-0 p-9 md:mt-0 -mt-9">
          <CardList searchQuery={searchQuery} />
        </div>
        {/* Right Side Content */}
        {/* <div className="flex flex-col gap-2 w-full md:w-[320px] lg:w-[340px] md:ml-6 lg:ml-2 md:mt-0 mt-2 md:p-0 p-2">
                    <Recommendations type="Latest"/>
                    <Recommendations type="Trending"/>
                    <ISTADCard   />
                </div> */}
        <div className="hidden md:flex flex-col gap-2 w-full md:w-[320px] lg:w-[340px] md:ml-6 lg:ml-2 md:mt-0 mt-2 md:p-0 p-2">
          <Recommendations type="Latest" />
          <Recommendations type="Trending" />
          <ISTADCard />
        </div>
      </div>
    </main>
  );
}
