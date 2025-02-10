"use client";

import * as React from "react";

import {
  MoreVertical,
  Eye,
  MessageSquare,
  ArrowUp,
  Bookmark,
  File,
  Share2Icon,
} from "lucide-react";
import {
  PopoverBody,
  PopoverButton,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/pop-over";
import formatDate from "@/lib/utils/formatDate";
import { useRouter } from "next/navigation";

export function CardForumComponent({
  timestamp,
  title,
  content,
  slug,
  //   tags,
  views,
  comments,
  upvotes,
}: {
  timestamp: string;
  title: string;
  content: string;
  //   tags: string[];
  views: number;
  comments: number;
  upvotes: number;
  slug: string;
}) {
  const router = useRouter();

  return (
    <div className=" " onClick={() => router.push(`/forum/${slug}`)}>
      <div className=" bg-white dark:bg-darkSecondary rounded-[5px] w-full border p-6">
        {/* Content Section */}
        <div className="mb-4">
          <div className="flex justify-between">
            <h2 className="text-[18px] dark:text-gray-200 font-bold cursor-pointer line-clamp-2">
              {title}
            </h2>
            {/* <div className=" flex justify-end text-gray-500 hover:text-gray-700">
              <PopoverRoot>
                <PopoverTrigger className="border-none ">
                  <MoreVertical className="w-5 h-5 " />
                </PopoverTrigger>
                <PopoverContent className="w-48 h-auto">
                  <PopoverBody>
                    {actions.map((action, index) => (
                      <PopoverButton key={index} onClick={action.action}>
                        {action.icon}
                        <span>{action.label}</span>
                      </PopoverButton>
                    ))}
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
            </div> */}
          </div>
          <p className=" mb-4 dark:text-gray-300 line-clamp-3">{content}</p>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 dark:text-gray-200 mb-4 justify-between">
          <div className="">{formatDate(timestamp)}</div>
          {/* Metrics Section */}
          <div className="flex items-center space-x-4  mr-2">
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-4 h-4" />
              <span>{comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ArrowUp className="w-4 h-4" />
              <span>{upvotes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
