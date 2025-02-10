/* eslint-disable react/no-unescaped-entities */
"use client";
import {
  ChevronDown,
  ChevronUp,
  CircleCheck,
  MessageCircle,
  MoreVertical,
} from "lucide-react";
import React from "react";
import { useCommentContext } from "@/lib/context/commentContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptedAnswer,
  getAllAnswersByQuestion,
  unAcceptedAnswer,
  deleteAnswer,
  editAnswer,
  totalAnswersByQuestion,
  voteAnwser,
  totalUpVotesAnswer,
  checkUserIsVoteAnswer,
  downVoteAnwser,
  totalDownVotesAnswer,
} from "@/hooks/api-hook/forum/forum-api";
import Preview from "../text-editor/preview";
import { toast } from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useUser } from "@/lib/context/userContext";
import { getUserByUsername } from "@/hooks/api-hook/user/user-service";
import formatDate from "@/lib/utils/formatDate";
import { useRouter } from "next/navigation";
import router from "next/router";

export default function CommentReplyComponent({ slug }: { slug: string }) {
  const { setReplyTo, setMode, setAnswerUuid, setReplyContent } =
    useCommentContext();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const router = useRouter();

  const handleReply = (answerUuid) => {
    setMode("reply");
    setReplyTo(answerUuid);
    const editorElement = document.getElementById("editor");
    if (editorElement) {
      editorElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEditReply = (answerUuid: string, replyContent: string) => {
    setMode("edit");
    setAnswerUuid(answerUuid);
    setReplyContent(replyContent);
    const editorElement = document.getElementById("editor");
    if (editorElement) {
      editorElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { data: answer } = useQuery({
    queryKey: ["allAnswers", slug],
    queryFn: () => getAllAnswersByQuestion(slug),
  });

  const { mutate: acceptAnswer } = useMutation({
    mutationFn: acceptedAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allAnswers"],
      });
      toast.success("អ្នកបានទទួលស្គាល់ថាចម្លើយនេះត្រឹមត្រូវ", {
        duration: 4000,
      });
    },
    onError: (error: ErrorResponse, variables, context) => {
      // Now you can access the error details
      if (error.error.code === 403) {
        toast.error("អ្នកមិនមានសិទ្ធិដើម្បីធ្វើការនេះទេ");
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const { mutate: unAccepted } = useMutation({
    mutationFn: unAcceptedAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allAnswers"],
      });
      toast.success("អ្នកបានលុបការទទួលស្គាល់ចម្លើយនេះ", {
        duration: 4000,
      });
    },
  });

  const handleAcceptAnswer = (answerUuid: string) => {
    const acceptedAnswerData = {
      questionSlug: slug,
      answerUuid: answerUuid,
    };
    acceptAnswer(acceptedAnswerData);
  };

  const handleUnAcceptAnswer = (answerUuid: string) => {
    const acceptedAnswerData = {
      questionSlug: slug,
      answerUuid: answerUuid,
    };
    unAccepted(acceptedAnswerData);
  };

  const handleReport = () => {
    if (!user) {
      router.push("/oauth2/authorization/code-advisor");
    } else {
      console.log("report clicked");
    }
  };

  const { mutate: deleteAnswerForum } = useMutation({
    mutationFn: deleteAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["totalAnswers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["allAnswers"],
      });
      toast.success("អ្នកបានលុបចម្លើយនេះ", {
        duration: 4000,
      });
    },
    onError: (error: ErrorResponse, variables, context) => {
      // Now you can access the error details
      if (error.error.code === 403) {
        toast.error("អ្នកមិនមានសិទ្ធិដើម្បីធ្វើការនេះទេ");
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const handleDeleteAnswer = (answerUuid: string) => {
    deleteAnswerForum(answerUuid);
  };

  const { data: totalAnswer } = useQuery({
    queryKey: ["totalAnswers", slug], // Unique key for all answers
    queryFn: () => totalAnswersByQuestion(slug),
  });

  return (
    <div className=" mt-3  mx-auto bg-white dark:bg-darkPrimary rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">{totalAnswer?.total} Answers</h2>

      {/* Main Comment */}
      <div className="space-y-4">
        {answer?.content?.map((ans) => (
          <AnswerItem
            key={ans.uuid}
            ans={ans}
            user={user}
            handleDeleteAnswer={handleDeleteAnswer}
            handleUnAcceptAnswer={handleUnAcceptAnswer}
            handleAcceptAnswer={handleAcceptAnswer}
            handleReply={handleReply}
            handleEditReply={handleEditReply}
            handleReport={handleReport}
          />
        ))}
      </div>
    </div>
  );
}

// Create a separate component for the user profile section
const UserProfile = ({ authorUsername, createdAt, lastModifedAt }) => {
  const { data: userData } = useQuery({
    queryKey: ["user", authorUsername],
    queryFn: () => getUserByUsername(authorUsername),
    enabled: !!authorUsername,
  });

  console.log("username", authorUsername);

  // Function to compare dates
  const isLastModifiedNewer = () => {
    if (!lastModifedAt || !createdAt) return false;
    const lastModifiedDate = new Date(lastModifedAt);
    const createdDate = new Date(createdAt);
    return lastModifiedDate > createdDate;
  };

  const handleProfileClick = () => {
    if (authorUsername) {
      router.push(`/user-profile/${authorUsername}`);
    }
  };

  return (
    <div className="flex items-center gap-3 ">
      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
        <img
          onClick={handleProfileClick}
          src={
            userData?.profileImage ||
            "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
          }
          alt={userData?.name || "User"}
          className="w-full h-full object-cover cursor-pointer"
        />
      </div>
      <div>
        <div
          onClick={handleProfileClick}
          className="cufont-medium cursor-pointer"
        >
          {userData?.fullName || "Loading..."}
        </div>
        <div className="text-sm text-gray-500">
          {isLastModifiedNewer()
            ? `កាលបរិច្ឆេទកែប្រែ: ${formatDate(lastModifedAt)}`
            : `កាលបរិច្ឆេទបង្ហាញ: ${formatDate(createdAt)}`}
        </div>
      </div>
    </div>
  );
};

const AnswerItem = ({
  ans,
  user,
  handleDeleteAnswer,
  handleUnAcceptAnswer,
  handleAcceptAnswer,
  handleReply,
  handleReport,
  handleEditReply,
}) => {
  const queryClient = useQueryClient();

  // Fetch total upvotes for this answer
  const { data: totalUpVotes } = useQuery({
    queryKey: ["totalUpVoteAnswer", ans.uuid],
    queryFn: () => totalUpVotesAnswer(ans.uuid),
  });

  // Fetch total downvotes for this answer
  const { data: totalDownVotes } = useQuery({
    queryKey: ["totalDownVoteAnswer", ans.uuid],
    queryFn: () => totalDownVotesAnswer(ans.uuid),
  });

  // Fetch the current vote status for this answer
  const { data: checkVoteOnAnswer } = useQuery({
    queryKey: ["checkVoteAnswer", ans.uuid],
    queryFn: () => checkUserIsVoteAnswer(ans.uuid),
  });

  // Optimistic update helper function
  const updateVoteOptimistically = (
    type: "upvote" | "downvote",
    oldVoteStatus: { code: number } | undefined
  ) => {
    // Update check vote status
    queryClient.setQueryData(["checkVoteAnswer", ans.uuid], (old) => ({
      ...(typeof old === "object" && old !== null ? old : {}),
      code: type === "upvote" ? 200 : 409,
    }));

    // Update vote counts
    if (oldVoteStatus?.code === 200) {
      // Was upvoted, now changing
      queryClient.setQueryData(
        ["totalUpVoteAnswer", ans.uuid],
        (old: { totalVotes: number } | undefined | unknown) => ({
          ...(typeof old === "object" && old !== null ? old : {}),
          totalVotes: ((old as { totalVotes: number })?.totalVotes ?? 0) - 1,
        })
      );
    } else if (oldVoteStatus?.code === 409) {
      // Was downvoted, now changing
      queryClient.setQueryData(
        ["totalDownVoteAnswer", ans.uuid],
        (old: { totalVotes: number } | undefined) => ({
          ...(typeof old === "object" && old !== null ? old : {}),
          totalVotes: (old?.totalVotes ?? 0) - 1,
        })
      );
    }

    // Add new vote
    if (type === "upvote") {
      queryClient.setQueryData(
        ["totalUpVoteAnswer", ans.uuid],
        (old: { totalVotes: number } | undefined) => ({
          ...(typeof old === "object" && old !== null ? old : {}),
          totalVotes: ((old as { totalVotes: number })?.totalVotes ?? 0) + 1,
        })
      );
    } else {
      queryClient.setQueryData(
        ["totalDownVoteAnswer", ans.uuid],
        (old: { totalVotes: number } | undefined | unknown) => ({
          ...(typeof old === "object" && old !== null ? old : {}),
          totalVotes: ((old as { totalVotes: number })?.totalVotes ?? 0) + 1,
        })
      );
    }
  };

  // Upvote mutation with optimistic updates
  const { mutate: upVoteAnswer, isPending: upVotePending } = useMutation({
    mutationFn: () => voteAnwser(ans.uuid),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["checkVoteAnswer", ans.uuid],
      });
      await queryClient.cancelQueries({
        queryKey: ["totalUpVoteAnswer", ans.uuid],
      });
      await queryClient.cancelQueries({
        queryKey: ["totalDownVoteAnswer", ans.uuid],
      });

      const previousVoteStatus = queryClient.getQueryData<{ code: number }>([
        "checkVoteAnswer",
        ans.uuid,
      ]);

      updateVoteOptimistically("upvote", previousVoteStatus);

      return { previousVoteStatus };
    },
    onError: (err, variables, context) => {
      if (context?.previousVoteStatus) {
        queryClient.setQueryData(
          ["checkVoteAnswer", ans.uuid],
          context.previousVoteStatus
        );
      }
      queryClient.invalidateQueries({
        queryKey: ["totalUpVoteAnswer", ans.uuid],
      });
      queryClient.invalidateQueries({
        queryKey: ["totalDownVoteAnswer", ans.uuid],
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["checkVoteAnswer", ans.uuid],
      });
      queryClient.invalidateQueries({
        queryKey: ["totalUpVoteAnswer", ans.uuid],
      });
      queryClient.invalidateQueries({
        queryKey: ["totalDownVoteAnswer", ans.uuid],
      });
    },
  });

  // Downvote mutation with optimistic updates
  const { mutate: downVoteAnswer, isPending: downVotePending } = useMutation({
    mutationFn: () => downVoteAnwser(ans.uuid),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["checkVoteAnswer", ans.uuid],
      });
      await queryClient.cancelQueries({
        queryKey: ["totalUpVoteAnswer", ans.uuid],
      });
      await queryClient.cancelQueries({
        queryKey: ["totalDownVoteAnswer", ans.uuid],
      });

      const previousVoteStatus = queryClient.getQueryData<{ code: number }>([
        "checkVoteAnswer",
        ans.uuid,
      ]);

      updateVoteOptimistically("downvote", previousVoteStatus);

      return { previousVoteStatus };
    },
    onError: (err, variables, context) => {
      if (context?.previousVoteStatus) {
        queryClient.setQueryData(
          ["checkVoteAnswer", ans.uuid],
          context.previousVoteStatus
        );
      }
      queryClient.invalidateQueries({
        queryKey: ["totalUpVoteAnswer", ans.uuid],
      });
      queryClient.invalidateQueries({
        queryKey: ["totalDownVoteAnswer", ans.uuid],
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["checkVoteAnswer", ans.uuid],
      });
      queryClient.invalidateQueries({
        queryKey: ["totalUpVoteAnswer", ans.uuid],
      });
      queryClient.invalidateQueries({
        queryKey: ["totalDownVoteAnswer", ans.uuid],
      });
    },
  });

  // Helper function to determine button color
  const getButtonColor = (expectedCode: number, actualCode: number) => {
    if (actualCode === 400) return "text-gray-400"; // Disabled/error state
    return actualCode === expectedCode ? "text-green-500" : "text-gray-600";
  };

  return (
    <div className="border rounded-lg p-4" key={ans.uuid}>
      <div className="flex justify-between items-start mb-3">
        <UserProfile
          authorUsername={ans.authorUsername}
          createdAt={ans?.createdAt}
          lastModifedAt={ans?.lastModifiedAt}
        />

        <button className="text-gray-500">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem
                className={user?.uuid == ans?.authorUuid ? "block" : "hidden"}
                onClick={() => handleDeleteAnswer(ans?.uuid)}
              >
                <p className="text-red-500">លុបការឆ្លើយ</p>
              </DropdownMenuItem>
              <DropdownMenuItem>រាយការណ៍</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </button>
      </div>

      <div className="space-y-3">
        <Preview content={ans?.content} />

        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center">
            {ans?.isAccepted == true ? (
              <CircleCheck
                onClick={() => handleUnAcceptAnswer(ans?.uuid)}
                className="w-5 h-5 text-green-500 rounded-full cursor-pointer"
              />
            ) : (
              <CircleCheck
                onClick={() => handleAcceptAnswer(ans?.uuid)}
                className="w-5 h-5 text-gray-500 rounded-full cursor-pointer"
              />
            )}
            <div className="flex items-center mx-2">
              <button
                className="p-2 hover:bg-gray-100 rounded-full disabled:hover:bg-transparent"
                onClick={() => upVoteAnswer()}
                disabled={downVotePending}
              >
                <ChevronUp
                  className={`w-5 h-5 ${getButtonColor(
                    200,
                    checkVoteOnAnswer?.code
                  )}`}
                />
              </button>
              <span className="mx-1">{totalUpVotes?.totalVotes ?? 0}</span>
              <button
                className="p-2 hover:bg-gray-100 rounded-full disabled:hover:bg-transparent"
                onClick={() => downVoteAnswer()}
                disabled={upVotePending}
              >
                <ChevronDown
                  className={`w-5 h-5 ${getButtonColor(
                    409,
                    checkVoteOnAnswer?.code
                  )}`}
                />
              </button>
              <span className="mx-1">{totalDownVotes?.totalVotes ?? 0}</span>
            </div>
          </div>
          <button className="text-gray-600 flex items-center gap-1">
            <MessageCircle className="w-5 h-5" />
            <span onClick={() => handleReply(ans?.uuid as string)}>
              ឆ្លើយតប
            </span>
          </button>
        </div>
      </div>

      {/* Nested Comments */}
      {ans?.replies?.map((reply) => (
        <div
          className="mt-4 space-y-4 ml-8 border-l-2 border-gray-200 pl-4"
          key={reply.uuid}
        >
          <div className="mt-4">
            <div className="flex justify-between items-start mb-3">
              <UserProfile
                authorUsername={reply?.authorUsername}
                createdAt={reply?.createdAt}
                lastModifedAt={reply?.lastModifiedAt}
              />
              <button className="text-gray-500">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <MoreVertical className="w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem
                      className={
                        user?.uuid == reply?.authorUuid ? "block" : "hidden"
                      }
                      onClick={() => handleDeleteAnswer(reply?.uuid)}
                    >
                      <p className="text-red-500">លុបការឆ្លើយ</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={
                        user?.uuid == reply?.authorUuid ? "block" : "hidden"
                      }
                      onClick={() =>
                        handleEditReply(reply?.uuid, reply?.content)
                      }
                    >
                      <p className="text-green-500">កែប្រែចម្លើយ</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleReport()}>
                      <p>រាយការណ៍</p>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </button>
            </div>
            <Preview content={reply?.content} />
          </div>
        </div>
      ))}
    </div>
  );
};
