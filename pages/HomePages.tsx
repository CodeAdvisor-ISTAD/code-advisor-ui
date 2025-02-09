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
    <main className="flex ">
      <div className="w-full">
        <CardList searchQuery={searchQuery} />
        {/* <div className="pt-2">
          <ForumList searchQuery={searchQuery}></ForumList>
        </div> */}
      </div>
    </main>
  );
}