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
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ForumCardComponent({
    id,
    avatar,
    username,
    timestamp,
    title,
    content,
    tags,
    views,
    comments,
    upvotes,
}: {
    id: number;
    avatar: string;
    username: string;
    timestamp: string;
    title: string;
    content: string;
    tags: string[];
    views: number;
    comments: number;
    upvotes: number;
}) {
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

    const router = useRouter();

    const handleNavigate = (id: number) => {
        router.push(`/forum/${id}`);
    };

    return (
        <div
            className=" bg-white rounded-[5px] shadow-sm p-6 cursor-pointer"
            onClick={() => handleNavigate(id)}
        >
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <Image
                        src={avatar}
                        alt={username}
                        width={100}
                        height={100}
                        className="rounded-full w-[40px] h-[40px] object-cover"
                    />
                    <div>
                        <h3 className="text-base font-normal">{username}</h3>
                        <p className="text-sm text-gray-500">{timestamp}</p>
                    </div>
                </div>
                <div className="text-gray-500 hover:text-gray-700">
                    <PopoverRoot>
                        <PopoverTrigger className="border-none ">
                            <MoreVertical className="w-5 h-5" />
                        </PopoverTrigger>
                        <PopoverContent className="w-48 h-auto">
                            <PopoverBody>
                                {actions.map((action, index) => (
                                    <PopoverButton
                                        key={index}
                                        onClick={action.action}
                                    >
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
                    {title}
                </h2>
                <p className="text-gray-700 mb-4">{content}</p>
            </div>

            {/* Tags Section */}
            <div className="flex flex-wrap gap-2 mb-4 justify-between">
                <div className="flex flex-wrap gap-2">
                    {tags?.map((tag) => (
                        <Link href={`/tag/${tag}`} key={tag}>
                            <span className="px-3 py-1 text-sm border border-secondary text-primary rounded-[5px]">
                                #{tag}
                            </span>
                        </Link>
                    ))}
                </div>
                {/* Metrics Section */}
                <div className="flex items-center space-x-4 text-gray-500 mr-5">
                    <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{views}</span>
                    </div>
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
    );
}
