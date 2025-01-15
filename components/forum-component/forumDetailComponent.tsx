/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import {
    Bookmark,
    CircleArrowDown,
    CircleArrowUp,
    MessageSquare,
    Share2,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
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
    editAnswer,
} from "@/hooks/api-hook/forum/forum-api";
import Preview from "../text-editor/preview";
import { useCommentContext } from "@/lib/context/commentContext";
import { getUserByUsername } from "@/hooks/api-hook/user/user-service";

const formSchema = z.object({
    content: z.string().min(10, {
        message: "ការពិពណ៌នាត្រូវមានយ៉ាងហោចណាស់ 10 តួអក្សរ",
    }),
});

export default function ForumDetailComponent({ slug }: { slug: string }) {
    const queryClient = useQueryClient();
    const editorRef = useRef(null);


    const { data: forum } = useQuery({
        queryKey: ["forum", slug],
        queryFn: () => getForumBySlug(slug),
    });

    // Queries for initial data
  const { data: checkVoted } = useQuery({
    queryKey: ["checkVote", slug],
    queryFn: () => checkIsUpVoted(slug),
    enabled: !!slug,
  });

  const { data: totalUpVote } = useQuery({
    queryKey: ["totalUpVotes", slug],
    queryFn: () => totalUpVotes(slug),
  });

  const { data: totalDownVote } = useQuery({
    queryKey: ["totalDownVotes", slug],
    queryFn: () => totalDownVotes(slug),
  });

  // Optimistic update helper functions
  const updateVoteOptimistically = (type: 'upvote' | 'downvote', oldVoteStatus: { code: number } | undefined) => {
    // Update check vote status
    queryClient.setQueryData(["checkVote", slug], old => ({
      ...(typeof old === 'object' && old !== null ? old : {}),
      code: type === 'upvote' ? 200 : 409
    }));

    // Update vote counts
    if (oldVoteStatus?.code === 200) {
      // Was upvoted, now changing
    queryClient.setQueryData(["totalUpVotes", slug], (old: { totalVotes: number } | undefined | unknown) => ({
        ...(typeof old === 'object' && old !== null ? old : {}),
        totalVotes: ((old as { totalVotes: number })?.totalVotes ?? 0) - 1
      }));
    } else if (oldVoteStatus?.code === 409) {
      // Was downvoted, now changing
      queryClient.setQueryData(["totalDownVotes", slug], (old: { totalVotes: number } | undefined) => ({
        ...(typeof old === 'object' && old !== null ? old : {}),
        totalVotes: (old?.totalVotes ?? 0) - 1
      }));
    }

    // Add new vote
    if (type === 'upvote') {
    queryClient.setQueryData(["totalUpVotes", slug], (old: { totalVotes: number } | undefined) => ({
        ...(typeof old === 'object' && old !== null ? old : {}),
        totalVotes: ((old as { totalVotes: number })?.totalVotes ?? 0) + 1
    }));
    } else {
      queryClient.setQueryData(["totalDownVotes", slug], (old: { totalVotes: number } | undefined | unknown) => ({
        ...(typeof old === 'object' && old !== null ? old : {}),
        totalVotes: ((old as { totalVotes: number })?.totalVotes ?? 0) + 1
      }));
    }
  };

  // Enhanced mutations with optimistic updates
  const { mutate: upvoteMutation, isPending: upVotePending } = useMutation({
    mutationFn: () => upVoteQuestion(slug),
    onMutate: async () => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["checkVote", slug] });
      await queryClient.cancelQueries({ queryKey: ["totalUpVotes", slug] });
      await queryClient.cancelQueries({ queryKey: ["totalDownVotes", slug] });

      // Save current state
      const previousVoteStatus = queryClient.getQueryData<{ code: number }>(["checkVote", slug]);

      // Perform optimistic update
      updateVoteOptimistically('upvote', previousVoteStatus);

      // Return context for rollback
      return { previousVoteStatus };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousVoteStatus) {
        queryClient.setQueryData(["checkVote", slug], context.previousVoteStatus);
      }
      queryClient.invalidateQueries({ queryKey: ["totalUpVotes", slug] });
      queryClient.invalidateQueries({ queryKey: ["totalDownVotes", slug] });
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["checkVote", slug] });
      queryClient.invalidateQueries({ queryKey: ["totalUpVotes", slug] });
      queryClient.invalidateQueries({ queryKey: ["totalDownVotes", slug] });
    }
  });

  const { mutate: downvoteMutation, isPending: downVotePending } = useMutation({
    mutationFn: () => downVoteQuestion(slug),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["checkVote", slug] });
      await queryClient.cancelQueries({ queryKey: ["totalUpVotes", slug] });
      await queryClient.cancelQueries({ queryKey: ["totalDownVotes", slug] });

      const previousVoteStatus = queryClient.getQueryData<{ code: number }>(["checkVote", slug]);
      
      updateVoteOptimistically('downvote', previousVoteStatus);

      return { previousVoteStatus };
    },
    onError: (err, variables, context) => {
      if (context?.previousVoteStatus) {
        queryClient.setQueryData(["checkVote", slug], context.previousVoteStatus);
      }
      queryClient.invalidateQueries({ queryKey: ["totalUpVotes", slug] });
      queryClient.invalidateQueries({ queryKey: ["totalDownVotes", slug] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["checkVote", slug] });
      queryClient.invalidateQueries({ queryKey: ["totalUpVotes", slug] });
      queryClient.invalidateQueries({ queryKey: ["totalDownVotes", slug] });
    }
  });

    // const { data: checkVoted } = useQuery({
    //     queryKey: ["checkVote", slug],
    //     queryFn: () => checkIsUpVoted(slug),
    //     enabled: !!slug,
    // });

    // const { data: totalUpVote } = useQuery({
    //     queryKey: ["totalUpVotes", slug],
    //     queryFn: () => totalUpVotes(slug),
    // });

    // const { data: totalDownVote } = useQuery({
    //     queryKey: ["totalDownVotes", slug],
    //     queryFn: () => totalDownVotes(slug),
    // });

    // const { mutate: upvoteMutation, isPending: upVotePending } = useMutation({
    //     mutationFn: () => upVoteQuestion(slug),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ["checkVote", slug] });
    //         queryClient.invalidateQueries({ queryKey: ["totalUpVotes", slug] });
    //         queryClient.invalidateQueries({ queryKey: ["totalDownVotes", slug] });
    //     }
    // });

    // const { mutate: downvoteMutation, isPending: downVotePending } = useMutation({
    //     mutationFn: () => downVoteQuestion(slug),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ["checkVote", slug] });
    //         queryClient.invalidateQueries({ queryKey: ["totalDownVotes", slug] });
    //         queryClient.invalidateQueries({ queryKey: ["totalUpVotes", slug] });
    //     }
    // });

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

    const { replyTo, mode, setMode, setReplyTo, answerUuid } = useCommentContext();

    const { mutate: createComment } = useMutation({
        mutationFn: commentOnForum,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["totalAnswers", slug] });
            queryClient.invalidateQueries({ queryKey: ["allAnswers", slug] });

        },
    });

    const { mutate: editComment} = useMutation({
        mutationFn : editAnswer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["totalAnswers", slug] });
            queryClient.invalidateQueries({ queryKey: ["allAnswers", slug] });
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (mode === "reply") {
            // Handle reply logic
            const createAnswer: CreateComment = {
                questionSlug: slug,
                answerUuid: replyTo, // Set the UUID of the comment being replied to
                slug: slug + "-answer-" + Date.now(), // Generate a unique slug
                content: values.content,
            };
            createComment(createAnswer);
        } else if (mode === "edit") {
            // Handle edit logic
            const editAnswerPayload: EditAnswerType = {
                answerUuid: answerUuid, // Set the UUID of the comment being edited
                content: values.content,
            };
            editComment(editAnswerPayload);
        } else {
            // Handle default case (e.g., creating a new top-level comment)
            const createAnswer: CreateComment = {
                questionSlug: slug,
                answerUuid: null, // No parent comment
                slug: slug + "-answer-" + Date.now(), // Generate a unique slug
                content: values.content,
            };
            createComment(createAnswer);
        }
    
        if (editorRef.current) {
            editorRef.current.clearContent();
          }
        // Reset the context state after submission
        setReplyTo(null);
        setMode(null);
    }




    return (
        <div className="  ml-[264px] w-full">
            <TagComponent />
            <div className="p-4 bg-white rounded-[5px] shadow-sm">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <UserProfile
                        authorUsername={forum?.authorUsername}
                        createdAt={forum?.createdAt} />
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
                            onClick={() => upvoteMutation()}
                            disabled={downVotePending}
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
                            onClick={() => downvoteMutation()}
                            disabled={upVotePending}
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
                                    ref={editorRef}
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


// Create a separate component for the user profile section
const UserProfile = ({ authorUsername, createdAt }) => {
    const { data: userData } = useQuery({
        queryKey: ['user', authorUsername],
        queryFn: () => getUserByUsername(authorUsername),
        enabled: !!authorUsername
    });

    return (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                <img
                    src={userData?.profileImage || "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"}
                    alt={userData?.name || "User"}
                    className="w-full h-full object-cover"
                />
            </div>
            <div>
                <div className="font-medium">
                    {userData?.fullName || "Loading..."}
                </div>
                <div className="text-sm text-gray-500">
                    {new Date(createdAt).toLocaleString()}
                </div>
            </div>
        </div>
    );
};