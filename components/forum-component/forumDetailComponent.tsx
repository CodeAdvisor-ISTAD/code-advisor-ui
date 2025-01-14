/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import {
    Bookmark,
    CircleArrowDown,
    CircleArrowUp,
    MessageSquare,
    Share2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { date, z } from "zod";
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
    commentOnForum,
    getAllAnswersByQuestion,
} from "@/hooks/api-hook/forum/forum-api";
import Preview from "../text-editor/preview";
import { useCommentContext } from "@/lib/context/commentContext";
import { getUserByUsername } from "@/hooks/api-hook/user-service";

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

    const { data: checkVoted } = useQuery({
        queryKey: ["vote", slug],
        queryFn: () => checkIsUpVoted(slug),
        enabled: !!slug,
    });

    const { data: totalUpVote } = useQuery({
        queryKey: ["votes", slug, "up"],
        queryFn: () => totalUpVotes(slug),
    });

    const { data: totalDownVote } = useQuery({
        queryKey: ["votes", slug, "down"],
        queryFn: () => totalDownVotes(slug),
    });

    const upvoteMutation = useMutation({
        mutationFn: () => upVoteQuestion(slug),
        onMutate: async () => {
            // Cancel outgoing refetches to avoid overwriting our optimistic update
            await queryClient.cancelQueries({
                queryKey: ["vote", slug],
            });
            await queryClient.cancelQueries({
                queryKey: ["votes", slug, "up"],
            });

            // Get current values
            const previousVote = queryClient.getQueryData(["vote", slug]);
            const previousUpVotes = (queryClient.getQueryData([
                "votes",
                slug,
                "up",
            ]) as { totalVotes: number }) || { totalVotes: 0 };

            // If already upvoted, we're removing the upvote
            const voteChange =
                (previousVote as { code: number })?.code === 200 ? -1 : 1;

            // Immediately update UI
            queryClient.setQueryData(["vote", slug], {
                code:
                    (previousVote as { code: number })?.code === 200
                        ? 409
                        : 200,
            });

            queryClient.setQueryData(["votes", slug, "up"], {
                totalVotes: previousUpVotes.totalVotes + voteChange,
            });

            return { previousVote, previousUpVotes };
        },
        onError: (err, variables, context) => {
            // On error, roll back to previous values
            queryClient.setQueryData(["vote", slug], context.previousVote);
            queryClient.setQueryData(
                ["votes", slug, "up"],
                context.previousUpVotes
            );
        },
        onSettled: () => {
            // After mutation finishes (success or error), refresh data from server
            queryClient.invalidateQueries({ queryKey: ["vote", slug] });
            queryClient.invalidateQueries({ queryKey: ["votes", slug] });
        },
    });

    const downvoteMutation = useMutation({
        mutationFn: () => downVoteQuestion(slug),
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: ["vote", slug],
            });
            await queryClient.cancelQueries({
                queryKey: ["votes", slug, "down"],
            });

            const previousVote = queryClient.getQueryData(["vote", slug]);
            const previousDownVotes = (queryClient.getQueryData([
                "votes",
                slug,
                "down",
            ]) as { totalVotes: number }) || { totalVotes: 0 };

            // If already downvoted, we're removing the downvote
            const voteChange =
                (previousVote as { code: number })?.code === 409 ? -1 : 1;

            // Immediately update UI
            queryClient.setQueryData(["vote", slug], {
                code:
                    (previousVote as { code: number })?.code === 409
                        ? 200
                        : 409,
            });

            queryClient.setQueryData(["votes", slug, "down"], {
                totalVotes: previousDownVotes.totalVotes + voteChange,
            });

            return { previousVote, previousDownVotes };
        },
        onError: (err, variables, context) => {
            queryClient.setQueryData(["vote", slug], context.previousVote);
            queryClient.setQueryData(
                ["votes", slug, "down"],
                context.previousDownVotes
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["vote", slug] });
            queryClient.invalidateQueries({ queryKey: ["votes", slug] });
        },
    });

    const getButtonColor = (expectedCode: number, actualCode: number) => {
        if (actualCode === 400) return "text-gray-400"; // Disabled/error state
        return actualCode === expectedCode ? "text-green-500" : "text-gray-600";
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    const { replyTo, setReplyTo } = useCommentContext();

    const { mutate: createComment } = useMutation({
        mutationFn: commentOnForum,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["answers"],
            });
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const createAnswer: CreateComment = {
            questionSlug: slug,
            answerUuid: null,
            slug: slug + "-answer" + Date.now(),
            content: values?.content,
        };
        if (replyTo !== null) {
            createAnswer.answerUuid = replyTo;
        }
        createComment(createAnswer);
    }

    const {data: user} = useQuery({
        queryKey: ["owner"],
        queryFn: () => getUserByUsername(forum?.authorUsername),
    })


    return (
        <div className="  ml-[264px] w-full">
            <TagComponent />
            <div className="p-4 bg-white rounded-[5px] shadow-sm">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                            <img
                                src={user?.profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <div className="font-medium">{user?.fullName}</div>
                            <div className="text-gray-500 text-sm">@{user?.username}</div>
                            <div className="text-sm text-gray-500">
                                {/* 12-Nov-2024 1:38PM */}
                                {new Date(forum?.createdAt).toLocaleString()}
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
                            className="p-2 hover:bg-gray-100 rounded-full disabled:hover:bg-transparent"
                            onClick={() => upvoteMutation.mutate()}
                            disabled={checkVoted?.code === 400}
                        >
                            <CircleArrowUp
                                className={`w-6 h-6 ${getButtonColor(
                                    200,
                                    checkVoted?.code
                                )}`}
                            />
                        </button>
                        <span className="text-gray-600">
                            {totalUpVote?.totalVotes ?? 0}
                        </span>
                        <button
                            className="p-2 hover:bg-gray-100 rounded-full disabled:hover:bg-transparent"
                            onClick={() => downvoteMutation.mutate()}
                            disabled={checkVoted?.code === 400}
                        >
                            <CircleArrowDown
                                className={`w-6 h-6 ${getButtonColor(
                                    409,
                                    checkVoted?.code
                                )}`}
                            />
                        </button>
                        <span className="text-gray-600">
                            {totalDownVote?.totalVotes ?? 0}
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
            <div className="mt-5 flex flex-col gap-2" id="editor">
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
                    <div className="flex flex-col sm:flex-row-reverse gap-3 justify-start">
                        <Button
                            onClick={() =>
                                form.handleSubmit((data) => onSubmit(data))()
                            }
                            type="submit"
                            className="w-full sm:w-auto text-white"
                        >
                            បោះពុម្ភផ្សាយចម្លើយ
                        </Button>
                    </div>
                </Form>
            </div>
            <CommentReplyComponent slug={slug} />
        </div>
    );
}
