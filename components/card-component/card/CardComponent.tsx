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
}: CardData) {
  return (
    <Card className="w-[341px] h-[315px] overflow-hidden rounded-[5px]">
      <CardHeader className="">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-primary line-clamp-2">
            {title}
          </h2>
          <p className="text-slate-500 text-sm line-clamp-2">
            {description}
          </p>
        </div>
        <div className="max-h-20 overflow-y-auto ">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="border-secondary text-primary text-xs rounded-[5px] font-medium"
            >
              #{tags}
            </Badge>
            <Badge
              variant="outline"
              className="border-secondary text-primary text-xs rounded-[5px] font-medium"
            >
              #{tags1}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative w-[301px] h-[120px]">
          <Image
            src={image}
            alt={`${title} Cover`}
            className="object-cover "
            fill
            sizes="(max-width: 341px) 100vw, 341px"
            priority
          />
        </div>
      </CardContent>
    </Card>
  );
}
