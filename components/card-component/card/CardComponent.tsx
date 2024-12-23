"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CardData {
    id: string;
    title: string;
    description: string;
    tags: string;
    tags1: string;
    image: string;
}

export function CardComponent({
    title,
    description,
    tags,
    tags1,
    image,
    id,
}: CardData) {
    return (
        <a href={`/content/${id}`}>
        <Card className=" rounded-[5px] ">
            <CardHeader className="space-y-3">
                <div className="space-y-3">
                    <h2 className="text-xl font-medium tracking-normal text-primary ">
                        {title}
                    </h2>
                    <p className="text-slate-500 text-sm line-clamp-2 ">
                        {description}
                    </p>
                </div>
                <div className="max-h-20 overflow-y-auto">
                    <div className="flex flex-wrap gap-2">
                        <Badge
                            variant="outline"
                            className="border-secondary text-primary text-xs rounded-[5px] font-medium  hover:bg-primary hover:text-white "
                        >
                            #{tags}
                        </Badge>
                        <Badge
                            variant="outline"
                            className="border-secondary text-primary text-xs rounded-[5px] font-medium  hover:bg-primary hover:text-white "
                        >
                            #{tags1}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="relative w-full h-[157.5px] md:h-[262.5px] overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 1200px"
                    />
                </div>
            </CardContent>
        </Card>
        </a>
    );
}
