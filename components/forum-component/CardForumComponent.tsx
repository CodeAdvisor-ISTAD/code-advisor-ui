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
  const actions = [
    {
      icon: <Bookmark className="w-4 h-4" />,
      label: "កត់ចំណាំ",
      action: () => console.log("New File"),
    },
    {
      icon: <File className="w-4 h-4" />,
      label: "រាយការណ៍",
      action: () => console.log("Upload Image"),
    },
    {
      icon: <Share2Icon className="w-4 h-4" />,
      label: "ចែករំលែក",
      action: () => console.log("Edit Colors"),
    },
  ];

  return (
    <div className="flex justify-end cursor-pointer" onClick={() => router.push(`/forum/${slug}`)} >
      <div className=" bg-white rounded-[5px] w-[680px] border p-6">
        {/* Content Section */}
        <div className="mb-4">
          <div className="flex justify-between">
            <h2 className="text-[18px] font-bold text-primary">{title}</h2>
            <div className=" flex justify-end text-gray-500 hover:text-gray-700">
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
            </div>
          </div>
          <p className="text-gray-700 mb-4">{content}</p>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 mb-4 justify-between">
          <div className="text-gray-500">{formatDate(timestamp)}</div>
          {/* Metrics Section */}
          <div className="flex items-center space-x-4 text-gray-500 mr-2">
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
