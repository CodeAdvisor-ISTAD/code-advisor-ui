"use client";
import ISTADCard from "@/components/card-component/card-trending/Card-Istad";
import Recommendations from "@/components/card-component/card-trending/TrendingComponent";
import { useState } from 'react'

import { CardList } from "@/components/card-component/card/CardList";
import NavbarComponent from "@/components/navbar/NavbarComponent";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }
  return (
    <main className="flex bg-gray-100 w-full lg:px-[100px] pb-6 pt-[80px] xs:px-[30px] md:px-[80px]">
      <NavbarComponent onSearch={handleSearch} />

      <div className="ml-[264px]">
        <CardList searchQuery={searchQuery}/>
      </div>
      
      <div className="flex flex-col ml-2 gap-2 ">
        <Recommendations type="Latest"/>
        <Recommendations type="Trending" />
        <ISTADCard></ISTADCard>
      </div>
    </main>
  );
}
