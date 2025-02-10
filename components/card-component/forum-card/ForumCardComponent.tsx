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
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserByUsername } from "@/hooks/api-hook/user/user-service";
import { totalAnswersByQuestion, totalUpVotes } from "@/hooks/api-hook/forum/forum-api";
import { getTagsByQuestionUuid } from "@/hooks/api-hook/forum/tags-api";
import { createHistory } from "@/hooks/api-hook/user/history";
import { useState } from "react";

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

    const [clicked, setClicked] = useState(false); // State to track if the card is clicked
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

    // Define the mutation for creating history
    const { mutate: submitHistory } = useMutation({
        mutationKey: ["history"],
        mutationFn: (forumSlug: any) => createHistory(forumSlug), // Replace with your actual API call
        onSuccess: () => {
            console.log("History submitted successfully");
        },
        onError: (error) => {
            console.error("Error submitting history:", error);
        },
    });

    // submit history for forum
    const handleNavigate = (slug: string) => {
        if (!clicked) {
            setClicked(true); // Set clicked to true to prevent multiple clicks

            // Navigate to the forum page immediately
            router.push(`/forum/${slug}`);

            // Submit history after 3 seconds
            setTimeout(() => {
                // Simulate API call to add history
                console.log("Submitting history for:", forumCardData.slug);

                const data = {
                    forumSlug: forumCardData.slug
                }
                
                submitHistory(data);
                // Replace the console.log with your actual API call
                // Example: addHistory(forumCardData.slug);
            }, 5000); // Delay of 7 seconds
        }
    };

    const { data: userData } = useQuery({
        queryKey: ['user', forumCardData?.author_username],
        queryFn: () => getUserByUsername(forumCardData?.author_username),
    });

    const { data: totalUpVote } = useQuery({
        queryKey: ["totalUpVotes", forumCardData.slug],
        queryFn: () => totalUpVotes(forumCardData.slug),
    });

    const { data: totalAnswer } = useQuery({
        queryKey: ["totalAnswers", forumCardData.slug], // Unique key for all answers
        queryFn: () => totalAnswersByQuestion(forumCardData.slug),
    })

    const {data : tags} = useQuery({
        queryKey: ["tags", forumCardData.uuid],
        queryFn: () => getTagsByQuestionUuid(forumCardData.uuid),
    })
    

    return (
        <div
            className=" bg-white rounded-[5px] shadow-sm p-6 cursor-pointer dark:bg-darkPrimary"
            onClick={() => handleNavigate(forumCardData?.slug)}
        >
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <Image onClick={() => router.push(`/profile/${userData?.username}`)}
                        src={userData?.profileImage || "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg"}
                        alt="User Avatar"
                        width={100}
                        height={100}
                        className="rounded-full w-[40px] h-[40px] object-cover"
                    />
                    <div>
                        <h3 onClick={() => router.push(`/user-profile/${userData?.username}`) } className="text-base font-normal">{userData?.fullName}</h3>
                        <p onClick={() => router.push(`/profile/${userData?.username}`) } className="text-sm text-gray-500">@{userData?.username}</p>
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
                <h2 className="text-[18px] font-bold text-primary dark:text-gray-50 decoration-primary">
                    {forumCardData.title}
                </h2>
                <p className="text-gray-700 mb-4 dark:text-gray-300">
                    {forumCardData.description}
                </p>
            </div>

            {/* Tags Section */}
            <div className="flex flex-wrap gap-2 mb-4 justify-between">
                <div className="flex flex-wrap gap-2">
                    {tags?.map((tag) => (
                        <span className="px-3 py-1 text-sm border border-secondary text-primary rounded-[5px]" key={tag.id}>
                            #{tag?.name}
                        </span>
                    ))}
                </div>
                {/* Metrics Section */}
                <div className="flex items-center space-x-4 text-gray-500 mr-5">
                    <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{totalAnswer?.total}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <ArrowUp className="w-4 h-4" />
                        <span>{totalUpVote?.totalVotes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}