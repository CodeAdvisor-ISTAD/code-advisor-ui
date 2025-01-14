/* eslint-disable react/no-unescaped-entities */
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
import { getUserByUsername } from "@/hooks/api-hook/user-service";

export default function CommentReplyComponent({ slug }: { slug: string }) {
    const { setReplyTo } = useCommentContext();
    const queryClient = useQueryClient();
    const { user } = useUser();

    const handleReply = (answerUuid) => {
        setReplyTo(answerUuid);
        document
            .getElementById("editor")
            .scrollIntoView({ behavior: "smooth" });
    };

    const { data: answer } = useQuery({
        queryKey: ["answers"],
        queryFn: () => getAllAnswersByQuestion(slug),
    });

    const { mutate: acceptAnswer } = useMutation({
        mutationFn: acceptedAnswer,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["answers"],
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
                queryKey: ["answers"],
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

    const { mutate: deleteAnswerForum } = useMutation({
        mutationFn: deleteAnswer,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["answers"],
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

    const {mutate : editAnswerOnForum} = useMutation({
        mutationFn: editAnswer,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["answers"],
            });
            toast.success("អ្នកបានកែប្រែចម្លើយនេះជោគជ័យ", {
                duration: 4000,
            });
        },
    })

    // const handleEditAnswer = () => {
    //     const editData : EditAnswerType = {
    //         answerUuid: answerUuid,
    //         content: "ចម្លើយថ្មី"
    //     }
    // }

    return (
        <div className=" mt-3  mx-auto bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Answers</h2>

            {/* Main Comment */}
            <div className="space-y-4">
                {answer?.content?.map((ans) => (
                    <div className="border rounded-lg p-4" key={ans.uuid}>
                        <div className="flex justify-between items-start mb-3">
                        <UserProfile authorUsername={ans.authorUsername} createdAt={ans?.createdAt}/>

                            <button className="text-gray-500">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <MoreVertical className="w-5 h-5" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuItem
                                            className={
                                                user?.uuid == ans?.authorUuid
                                                    ? "block"
                                                    : "hidden"
                                            }
                                            onClick={() =>
                                                handleDeleteAnswer(ans?.uuid)
                                            }
                                        >
                                            <p className="text-red-500">
                                                លុបការឆ្លើយ
                                            </p>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            រាយការណ៍
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </button>
                        </div>

                        <div className="space-y-3">
                            <Preview content={ans?.content} />
                            {/* {
                           answer?.content?.map((content, index) => (
                               <Preview key={index} content={content.content} />
                           ))
                       } */}

                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center">
                                    {ans?.isAccepted == true ? (
                                        <CircleCheck
                                            onClick={() => {
                                                handleUnAcceptAnswer(ans?.uuid);
                                            }}
                                            className="w-5 h-5 text-green-500  rounded-full cursor-pointer"
                                        />
                                    ) : (
                                        <CircleCheck
                                            onClick={() =>
                                                handleAcceptAnswer(ans?.uuid)
                                            }
                                            className="w-5 h-5 text-gray-500  rounded-full cursor-pointer"
                                        />
                                    )}
                                    <div className="flex items-center mx-2">
                                        <ChevronUp className="w-5 h-5" />
                                        <span className="mx-1">50</span>
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </div>
                                <button className="text-gray-600 flex items-center gap-1">
                                    <MessageCircle className="w-5 h-5" />
                                    <span
                                        onClick={() =>
                                            handleReply(ans?.uuid as string)
                                        }
                                    >
                                        Reply
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
                                {/* First Reply */}
                                <div className="mt-4">
                                    <div className="flex justify-between items-start mb-3">
                                    <UserProfile authorUsername={reply?.authorUsername} createdAt={reply?.createdAt}/>


                                        <button className="text-gray-500">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <MoreVertical className="w-5 h-5" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56">
                                                    <DropdownMenuItem
                                                        className={user?.uuid == reply?.authorUuid ? "block" : "hidden"}
                                                        onClick={() =>
                                                            handleDeleteAnswer(
                                                                reply?.uuid
                                                            )
                                                        }
                                                    >
                                                        <p className="text-red-500">
                                                            លុបការឆ្លើយ
                                                        </p>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        រាយការណ៍
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
                ))}
            </div>
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