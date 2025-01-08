/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import {
    Bookmark,
    CircleArrowDown,
    CircleArrowUp,
    MessageSquare,
    Share2,
} from "lucide-react";
import React from "react";
import TagComponent from "../tag/tagComponent";
import RichTextEditor from "../text-editor/textEditor";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import CommentReplyComponent from "./commentReplyComponent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getForumBySlug,
    checkIsUpVoted,
    upVoteQuestion,
    totalUpVotes,
    totalDownVotes,
    downVoteQuestion,
} from "@/hooks/api-hook/forum/forum-api";
import Preview from "../text-editor/preview";

const formSchema = z.object({
    content: z.string().min(10, {
        message: "ការពិពណ៌នាត្រូវមានយ៉ាងហោចណាស់ 10 តួអក្សរ",
    }),
});

export default function ForumDetailComponent({ slug }: { slug: string }) {
    const queryClient = useQueryClient();

    const { data: forum } = useQuery({
        queryKey: ["forum", slug],
        queryFn: () => getForumBySlug(slug),
    });

    const { data: checkVoted, status } = useQuery({
        queryKey: ["vote", forum?.uuid],
        queryFn: () => checkIsUpVoted(forum?.uuid),
    });

    console.log(checkVoted);

    const upvoteMutation = useMutation({
        mutationFn: () => upVoteQuestion(forum?.uuid),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: ["vote", forum?.uuid],
            });
        },
    });

    const downvoteMutation = useMutation({
        mutationFn: () => downVoteQuestion(forum?.uuid),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: ["vote", forum?.uuid],
            });
        },
    });

    const { data: totalUpVotes } = useQuery({
        queryKey: ["vote", forum?.uuid],
        queryFn: () => totalUpVotes(forum?.uuid),
    });

    const { data: totalDownVotes } = useQuery({
        queryKey: ["vote", forum?.uuid],
        queryFn: () => totalDownVotes(forum?.uuid),
    });

    // Handle upvote button click
    const handleUpvote = () => {
        upvoteMutation.mutate();
    };

    // Handle downvote button click
    const handleDownvote = () => {
        downvoteMutation.mutate();
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    return (
        <div className="  ml-[264px] w-full">
            <TagComponent />
            <div className="p-4 bg-white rounded-[5px] shadow-sm">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                            <img
                                src="https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <div className="font-medium">@Golanginya</div>
                            <div className="text-sm text-gray-500">
                                12-Nov-2024 1:38PM
                            </div>
                        </div>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                        <div className="w-6 h-6">•••</div>
                    </button>
                </div>

                {/* Content */}

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">{forum?.title}</h2>
                    <h2 className="text-xl font-bold">សំណូរដែលបានជួបប្រទះ</h2>
                    <p className="text-lg">{forum?.description}</p>
                    <Preview content={forum?.introduction} />

                    {/* Code Block */}
                    <div className="rounded-md p-4 font-mono text-sm">
                        <h2 className="text-xl font-bold mb-3">
                            ចម្លើយដែលអ្នកចង់បាន
                        </h2>
                        <Preview content={forum?.expectedAnswers} />
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2">
                        {forum?.tags?.map((tag: TagsType) => (
                            <span
                                key={tag.id}
                                className="px-3 py-1 text-sm border border-secondary text-primary rounded-[5px]"
                            >
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center">
                        <button
                            className="p-2 hover:bg-gray-100 rounded-full"
                            onClick={handleUpvote}
                        >
                            <CircleArrowUp
                                className={`w-6 h-6 ${
                                    checkVoted && checkVoted?.isUpvote
                                        ? "text-green-500"
                                        : "text-gray-600"
                                }`}
                            />
                        </button>
                        <span className="text-gray-600">
                            {totalUpVotes?.totalVotes}
                        </span>
                        <button
                            className="p-2 hover:bg-gray-100 rounded-full"
                            onClick={handleDownvote}
                        >
                            <CircleArrowDown
                                className={`w-6 h-6 ${
                                    checkVoted?.isVoted && !checkVoted?.isUpvote
                                        ? "text-green-500"
                                        : "text-gray-600"
                                }`}
                            />
                        </button>
                        <span className="text-gray-600">
                            {totalDownVotes?.totalVotes}
                        </span>
                    </div>

                    <div className="flex gap-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <MessageSquare className="w-6 h-6 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Bookmark className="w-6 h-6 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Share2 className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary text-xl font-bold​ ​">
                                    ការឆ្លើយតបរបស់អ្នក
                                </FormLabel>
                                <FormDescription className="text-sm">
                                    ចែករំលែកគំនិតរបស់អ្នក
                                </FormDescription>
                                <FormControl>
                                    <RichTextEditor
                                        content={field.value}
                                        onChange={(value: any) => {
                                            field.onChange(value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
                <div className="flex flex-col sm:flex-row-reverse gap-3 justify-start">
                    <Button
                        type="submit"
                        className="w-full sm:w-auto text-white"
                    >
                        បោះពុម្ភផ្សាយ
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto text-primary"
                    >
                        សេចក្តីព្រាង
                    </Button>
                </div>
            </div>
            <CommentReplyComponent />
        </div>
    );
}
