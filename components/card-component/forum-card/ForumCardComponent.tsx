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
import Image from "next/image";
import {
  PopoverBody,
  PopoverButton,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/pop-over";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserByUsername } from "@/hooks/api-hook/user/user-service";

interface ForumCardType {
    uuid: string;
    slug: string;
    author_uuid: string;
    author_username: string;
    title: string;
    description: string | null;
    expectedAnswers: string;
    tags: TagsType[];
    isDrafted: boolean;
    isArchived: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string | null;
}

export function ForumCardComponent({
  forumCardData,
}: {
  forumCardData: ForumCardType;
}) {
  const actions = [
    {
      icon: <Bookmark className="w-4 h-4" />,
      label: "កត់ចំណាំ",
      action: () => console.log("Bookmark"),
    },
    {
      icon: <File className="w-4 h-4" />,
      label: "រាយការណ៍",
      action: () => console.log("Report"),
    },
    {
      icon: <Share2Icon className="w-4 h-4" />,
      label: "ចែករំលែក",
      action: () => console.log("Share"),
    },
  ];

  const router = useRouter();

  const handleNavigate = (slug: string) => {
    router.push(`/forum/${slug}`);
  };

  const { data: userData, error: userError } = useQuery({
    queryKey: ["user", forumCardData.author_username],
    queryFn: () => getUserByUsername(forumCardData.author_username),
  });

  if (userError) {
    console.error("Error fetching user data:", userError);
  }

  return (
    <div
      className="bg-white rounded-[5px] shadow-sm p-6 cursor-pointer"
      onClick={() => handleNavigate(forumCardData.slug)}
      role="button"
      tabIndex={0}
      aria-label={`View forum post: ${forumCardData.title}`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Image
            src={
              userData?.profileImage ||
              "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg"
            }
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full w-[40px] h-[40px] object-cover"
          />
          <div>
            <h3 className="text-base font-normal">{userData?.fullName}</h3>
            <p className="text-sm text-gray-500">@{userData?.username}</p>
          </div>
        </div>
        <div className="text-gray-500 hover:text-gray-700">
          <PopoverRoot>
            <PopoverTrigger className="border-none" aria-label="More options">
              <MoreVertical className="w-5 h-5" />
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

      {/* Content Section */}
      <div className="mb-4">
        <h2 className="text-[18px] font-bold text-primary decoration-primary">
          {forumCardData.title}
        </h2>
        <p className="text-gray-700 mb-4">{forumCardData.description}</p>
      </div>

      {/* Tags Section */}
      <div className="flex flex-wrap gap-2 mb-4 justify-between">
        <div className="flex flex-wrap gap-2">
          {forumCardData.tags.map((tag) => (
            <span
              className="px-3 py-1 text-sm border border-secondary text-primary rounded-[5px]"
              key={tag.id}
            >
              #{tag.name}
            </span>
          ))}
        </div>
        {/* Metrics Section */}
        <div className="flex items-center space-x-4 text-gray-500 mr-5">
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>123</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageSquare className="w-4 h-4" />
            <span>56</span>
          </div>
          <div className="flex items-center space-x-1">
            <ArrowUp className="w-4 h-4" />
            <span>1</span>
          </div>
        </div>
      </div>
    </div>
  );
}