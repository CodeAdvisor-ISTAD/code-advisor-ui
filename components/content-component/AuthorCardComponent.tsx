"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CardData {
  id: string;
  authorUuid: string;
  title: string;
  description: string;
  tags: string;
  tags1: string;
  image: string;
  created_date: string;
  slug: string;
}

export function AuthorCardComponent({
  title,
  slug,
  authorUuid,
  description,
  tags,
  tags1,
  image,
  created_date,
  id,
}: CardData) {
  return (
    <a href={`/content/${slug}`}>
      <Card className="bg-white dark:bg-darkSecondary rounded-[5px] w-full">
        <div className="flex flex-col justify-between">
          <CardContent className="pt-4 flex flex-row justify-between">
            <div className="">
              <div className="space-y-3 p-0">
                <h1 className="text-2xl font-medium tracking-normal text-primary dark:text-gray-200 line-clamp-2">
                  {title}
                </h1>
                <p className=" text-sm line-clamp-2 ">
                  {description}
                </p>
              </div>
              <div className="max-h-20 overflow-y-auto ">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="border-secondary text-primary dark:text-gray-300 text-xs rounded-[5px] font-medium  hover:bg-primary hover:text-white "
                  >
                    #{tags}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-secondary text-primary dark:text-gray-300 text-xs rounded-[5px] font-medium  hover:bg-primary hover:text-white "
                  >
                    #{tags1}
                  </Badge>
                </div>
              </div>
              <div className="pt-4 text-sm ">{created_date}</div>
            </div>
            <div className="relative h-[100px] w-[150px] overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                sizes="(max-width: 250px) 0vw, 1200px"
              />
            </div>
          </CardContent>
        </div>
      </Card>
    </a>
  );
}
