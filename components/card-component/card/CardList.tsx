'use client'

import * as React from "react"
import { CardComponent } from "./CardComponent"
import { cardsData } from "@/lib/card"
import TrendingComponent from "../card-trending/TrendingComponent"
import LatestComponent from "../card-trending/LatestComponent"

export function CardList() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-100 ">
    <div className="flex  p-4">
      {/* Main Content */}
      <div className="flex-1">
        <div className="grid grid-cols-2 gap-2">
          {cardsData.map((card) => (
            <CardComponent key={card.id} {...card} />
          ))}
        </div>
      </div>

      <div className="flex flex-col ml-2 gap-2 ">
        <TrendingComponent />
        <LatestComponent />
      </div>
    </div>
    </main>
  )
}
