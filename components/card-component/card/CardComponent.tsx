"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Preview from "@/components/text-editor/preview";

interface CardData {
  id: string;
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
  slug: string;
  communityEngagement: {
    likeCount: number;
    commentCount: number;
    reportCount: number;
    fireCount: number;
    loveCount: number;
    lastUpdated: number;
  };
  isDeleted: boolean;
  isDraft: boolean;
  author_uuid: string;
  created_date: string;
  last_modified_date: string;
}

export function CardComponent({
  title,
  content,
  tags,
  thumbnail,
  slug,
  id,
}: CardData) {
  return (
    <a href={`/content/${slug}`}>
      <Card className="rounded-[5px] w-full h-[480px] flex flex-col dark:bg-darkPrimary ">
        <CardHeader className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-xl font-medium tracking-normal text-primary dark:text-white line-clamp-2">
              {title}
            </h2>
            <p className="text-slate-500 dark:text-white text-[16px] line-clamp-2 ">
              <Preview content={content} />
            </p>
          </div>

          <div className="max-h-20 overflow-y-auto">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-secondary text-primary text-xs rounded-[5px] font-medium hover:bg-primary hover:text-white dark:text-white"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="relative w-full h-[300px] md:h-[262.5px] overflow-hidden">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
