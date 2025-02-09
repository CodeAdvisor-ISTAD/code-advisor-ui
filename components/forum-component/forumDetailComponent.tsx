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
import { toast } from "react-hot-toast";
import {
  addBookmark,
  checkBookmarkStatus,
  unBookmarkForum,
} from "@/hooks/api-hook/user/bookmark";
import { fetchUserProfile } from "@/hooks/api-hook/auth/use-profile";
import { TagsSkeleton } from "./skeleton/TagsSkeleton";
import { RichTextEditorSkeleton } from "./skeleton/RichTextEditorSkeleton";
import { UserProfileSkeleton } from "./skeleton/UserProfileSkeleton";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const formSchema = z.object({
  content: z.string().min(10, {
    message: "ការពិពណ៌នាត្រូវមានយ៉ាងហោចណាស់ 10 តួអក្សរ",
  }),
});

export default function ForumDetailComponent({ slug }: { slug: string }) {
  const queryClient = useQueryClient();
  const editorRef = useRef<{ clearContent: () => void } | null>(null);
  const [isLoadingBlur, setIsLoadingBlur] = useState(true);
  const { replyTo, mode, setMode, setReplyTo, answerUuid, replyContent } =
    useCommentContext();
  const { data: user } = useQuery({
    queryKey: ["authProfile"],
    queryFn: fetchUserProfile,
  });

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
  const updateVoteOptimistically = (
    type: "upvote" | "downvote",
    oldVoteStatus: { code: number } | undefined
  ) => {
    // Update check vote status
    queryClient.setQueryData(["checkVote", slug], (old) => ({
      ...(typeof old === "object" && old !== null ? old : {}),
      code: type === "upvote" ? 200 : 409,
    }));

    // Update vote counts
    if (oldVoteStatus?.code === 200) {
      // Was upvoted, now changing
      queryClient.setQueryData(
        ["totalUpVotes", slug],
        (old: { totalVotes: number } | undefined | unknown) => ({
          ...(typeof old === "object" && old !== null ? old : {}),
          totalVotes: ((old as { totalVotes: number })?.totalVotes ?? 0) - 1,
        })
      );
    } else if (oldVoteStatus?.code === 409) {
      // Was downvoted, now changing
      queryClient.setQueryData(
        ["totalDownVotes", slug],
        (old: { totalVotes: number } | undefined) => ({
          ...(typeof old === "object" && old !== null ? old : {}),
          totalVotes: (old?.totalVotes ?? 0) - 1,
        })
      );
    }

    // Add new vote
    if (type === "upvote") {
      queryClient.setQueryData(
        ["totalUpVotes", slug],
        (old: { totalVotes: number } | undefined) => ({
          ...(typeof old === "object" && old !== null ? old : {}),
          totalVotes: ((old as { totalVotes: number })?.totalVotes ?? 0) + 1,
        })
      );
    } else {
      queryClient.setQueryData(
        ["totalDownVotes", slug],
        (old: { totalVotes: number } | undefined | unknown) => ({
          ...(typeof old === "object" && old !== null ? old : {}),
          totalVotes: ((old as { totalVotes: number })?.totalVotes ?? 0) + 1,
        })
      );
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
      const previousVoteStatus = queryClient.getQueryData<{ code: number }>([
        "checkVote",
        slug,
      ]);

      // Perform optimistic update
      updateVoteOptimistically("upvote", previousVoteStatus);

      // Return context for rollback
      return { previousVoteStatus };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousVoteStatus) {
        queryClient.setQueryData(
          ["checkVote", slug],
          context.previousVoteStatus
        );
      }
      queryClient.invalidateQueries({ queryKey: ["totalUpVotes", slug] });
      queryClient.invalidateQueries({ queryKey: ["totalDownVotes", slug] });
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["checkVote", slug] });
      queryClient.invalidateQueries({ queryKey: ["totalUpVotes", slug] });
      queryClient.invalidateQueries({ queryKey: ["totalDownVotes", slug] });
    },
  });

  const { mutate: downvoteMutation, isPending: downVotePending } = useMutation({
    mutationFn: () => downVoteQuestion(slug),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["checkVote", slug] });
      await queryClient.cancelQueries({ queryKey: ["totalUpVotes", slug] });
      await queryClient.cancelQueries({ queryKey: ["totalDownVotes", slug] });

      const previousVoteStatus = queryClient.getQueryData<{ code: number }>([
        "checkVote",
        slug,
      ]);

      updateVoteOptimistically("downvote", previousVoteStatus);

      return { previousVoteStatus };
    },
    onError: (err, variables, context) => {
      if (context?.previousVoteStatus) {
        queryClient.setQueryData(
          ["checkVote", slug],
          context.previousVoteStatus
        );
      }
      queryClient.invalidateQueries({ queryKey: ["totalUpVotes", slug] });
      queryClient.invalidateQueries({ queryKey: ["totalDownVotes", slug] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["checkVote", slug] });
      queryClient.invalidateQueries({ queryKey: ["totalUpVotes", slug] });
      queryClient.invalidateQueries({ queryKey: ["totalDownVotes", slug] });
    },
  });

  const { theme } = useTheme();

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

  const { mutate: createComment } = useMutation({
    mutationFn: commentOnForum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["totalAnswers", slug] });
      queryClient.invalidateQueries({ queryKey: ["allAnswers", slug] });
    },
  });

  const { mutate: editComment } = useMutation({
    mutationFn: editAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["totalAnswers", slug] });
      queryClient.invalidateQueries({ queryKey: ["allAnswers", slug] });
    },
  });

  useEffect(() => {
    if (replyContent && editorRef.current) {
      // Type assertion for the ref
      const editor = editorRef.current as unknown as {
        setContent: (content: string) => void;
      };
      editor.setContent(replyContent);
      form.setValue("content", replyContent);
    }
  }, [replyContent, form]);

  useEffect(() => {
    setInterval(() => {
      setIsLoadingBlur(false);
    }, 2000);
  });

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

  const handleShare = async () => {
    try {
      // Copy the current URL to the clipboard
      await navigator.clipboard.writeText(window.location.href);
      // Show a success toast
      toast.success("អ្នកបានចម្លង url post នេះបានដោយជោគជ័យ");
    } catch (error) {
      // Handle errors (e.g., if the clipboard API is not supported)
      console.error("Failed to copy URL:", error);
      toast.error("Failed to copy URL");
    }
  };

  const { data: checkStatus, isLoading: isCheckingStatus } = useQuery({
    queryKey: ["bookmarks", slug],
    queryFn: () => checkBookmarkStatus(slug), // You'll need to implement this
  });

  const { toggleBookmark, isLoading, isError } = useBookmarkMutations(slug);

  return (
    <div className="w-full dark:bg-darkPrimary  xl:ml-0 px-2">
      <TagComponent />
      <div className="p-3 bg-white dark:bg-darkPrimary rounded-[5px] shadow-sm border">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          {isLoadingBlur ? (
            <UserProfileSkeleton />
          ) : (
            <UserProfile
              authorUsername={forum?.authorUsername}
              createdAt={forum?.createdAt}
            />
          )}
          <button className="text-gray-500 hover:text-gray-700">
            <div className="w-6 h-6">•••</div>
          </button>
        </div>

        {/* Content */}

        <div className="space-y-4 px-3">
          <h2 className="text-2xl font-bold">{forum?.title}</h2>
          <h2 className="text-xl font-bold">សំណូរដែលបានជួបប្រទះ</h2>
          <p className="text-lg">{forum?.description}</p>
          {isLoadingBlur ? (
            <RichTextEditorSkeleton />
          ) : (
            <Preview content={forum?.introduction} />
          )}

          {/* Code Block */}
          <h2 className="text-xl font-bold mb-3">ចម្លើយដែលអ្នកចង់បាន</h2>
          {isLoadingBlur ? (
            <RichTextEditorSkeleton />
          ) : (
            <Preview content={forum?.expectedAnswers} />
          )}

          {/* Tags */}
          <div className="flex gap-2">
            {forum?.tags?.map((tag: TagsType) => (
              <span
                key={tag.id}
                className="px-3 py-1 text-sm border border-secondary text-primary rounded-[5px] dark:text-gray-50"
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
              className="p-2 hover:bg-gray-100 rounded-full disabled:hover:bg-transparent dark:hover:bg-darkSecondary"
              onClick={() => upvoteMutation()}
              disabled={downVotePending}
            >
              <CircleArrowUp
                className={`w-6 h-6 ${getButtonColor(200, checkVoted?.code)}`}
              />
            </button>
            <span className="text-gray-600">
              {totalUpVote?.totalVotes ?? 0}
            </span>
            <button
              className="p-2 hover:bg-gray-100 rounded-full disabled:hover:bg-transparent dark:hover:bg-darkSecondary"
              onClick={() => downvoteMutation()}
              disabled={upVotePending}
            >
              <CircleArrowDown
                className={`w-6 h-6 ${getButtonColor(409, checkVoted?.code)}`}
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
            <button
              className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-darkSecondary"
              onClick={toggleBookmark}
              disabled={isLoading || isCheckingStatus}
            >
              <Bookmark
                className={`w-6 h-6 font-bold ${
                  checkStatus?.bookmarked ? "text-yellow-500" : "text-gray-600"
                }`}
              />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-darkSecondary"
              onClick={handleShare}
            >
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
                <FormLabel className="text-primary text-xl font-bold dark:text-gray-50">
                  ការឆ្លើយតបរបស់អ្នក
                </FormLabel>
                <FormDescription className="text-sm dark:text-gray-50">
                  ចែករំលែកគំនិតរបស់អ្នក
                </FormDescription>
                <FormControl>
                  <RichTextEditor
                    ref={editorRef}
                    content={replyContent || field.value}
                    onChange={(value: any) => {
                      console.log("Editor value changing to:", value);
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
              onClick={() => form.handleSubmit((data) => onSubmit(data))()}
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
    queryKey: ["user", authorUsername],
    queryFn: () => getUserByUsername(authorUsername),
    enabled: !!authorUsername,
  });
  const router = useRouter();

  return (
    <div
      className="flex px-4 items-center gap-3 cursor-pointer"
      onClick={() => router.push(`/user-profile/${authorUsername}`)}
    >
      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
        <img
          src={
            userData?.profileImage ||
            "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
          }
          alt={userData?.name || "User"}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="font-medium">{userData?.fullName || "Loading..."}</div>
        <div className="text-sm text-gray-500">
          {new Date(createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

// First, define the type for the bookmark response
type BookmarkResponse = {
  id: string;
  authorUuid: string;
  forumSlug: string;
  contentSlug: string;
  isBookmarked: boolean;
  isDeleted: boolean;
  createdAt: string;
};

const useBookmarkMutations = (slug: string) => {
  const queryClient = useQueryClient();

  const unBookmarkMutation = useMutation({
    mutationFn: unBookmarkForum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: addBookmark,
    onSuccess: (data: BookmarkResponse) => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
    onError: (error: any) => {
      // If bookmark already exists (409), try to unbookmark
      if (error.error.code === 409) {
        unBookmarkMutation.mutate(slug);
      }
    },
  });

  const toggleBookmark = () => {
    const bookmark = {
      forumSlug: slug,
    };

    bookmarkMutation.mutate(bookmark);
  };

  return {
    toggleBookmark,
    isLoading: bookmarkMutation.isPending || unBookmarkMutation.isPending,
    isError: bookmarkMutation.isError || unBookmarkMutation.isError,
    error: bookmarkMutation.error || unBookmarkMutation.error,
  };
};
