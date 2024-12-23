"use client";

import * as React from "react";
import { CardComponent } from "./CardComponent";
import { cardsData } from "@/lib/card";

export function CardList() {
    return (
        <div className="">
            {/* Main Content */}
            <div className="grid grid-cols-2 gap-2 z-10">
                {cardsData.map((card) => (
                    <CardComponent key={card.id} {...card} />
                ))}
            </div>
        </div>
    );
}
