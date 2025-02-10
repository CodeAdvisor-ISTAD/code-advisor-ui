"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface CardData {
  title: string;
  description: string;
  tags: string;
  tags1: string;
  thumbnail: string;
  createdDate: string;
  slug: string;
  onBookmark?: () => void;
  onRemove?: () => void;
  onShare?: () => void;
}

export function ArticleCardBookmark({
  title,
  slug,
  description,
  tags,
  tags1,
  thumbnail,
  createdDate,
  onBookmark,
  onRemove, 
  onShare
}: CardData) {
  return (
    <a href={`/content/${slug}`}>
      <Card className="bg-white dark:bg-darkPrimary rounded-[5px] w-full">
        <div className="flex flex-col justify-between">
          <CardContent className="pt-4 flex flex-row justify-between">
            <div className="">
              <div className="space-y-3 p-0">
                <h1 className="lg:text-2xl text-lg font-medium tracking-normal text-primary line-clamp-2">
                  {title}
                </h1>
                <p className="text-slate-500 dark:text-gray-300 text-sm line-clamp-2 ">
                  {description}
                </p>
              </div>
              <div className="max-h-20 overflow-y-auto ">
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
                <div className="pt-4 text-sm text-gray-500 dark:text-gray-300">
                {new Date(createdDate)
                  .toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  })
                  .replace(",", " :")
                  .replace(/\b(am|pm)\b/g, (match) => match.toUpperCase())}
                </div>
            </div>
            {thumbnail && title && (
              <div className="relative h-[100px] w-[150px] overflow-hidden">
                <Image
                  src={thumbnail}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  sizes="(max-width: 250px) 0vw, 1200px"
                />
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </a>
  );
}
