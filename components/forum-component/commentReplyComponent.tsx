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
} from "@/hooks/api-hook/forum/forum-api";
import Preview from "../text-editor/preview";
import { toast } from "react-hot-toast";

export default function CommentReplyComponent({ slug }: { slug: string }) {
    const { setReplyTo } = useCommentContext();
    const queryClient = useQueryClient();

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

    return (
        <div className=" mt-3  mx-auto bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">12 Answers</h2>

            {/* Main Comment */}
            <div className="space-y-4">
                {answer?.content?.map((ans) => (
                    <div className="border rounded-lg p-4" key={ans.uuid}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                    <img
                                        src="https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
                                        alt="Jenny Wilson"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="font-medium">
                                        Jenny Wilson
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        12-Nov-2024 1:38PM
                                    </div>
                                </div>
                            </div>
                            <button className="text-gray-500">
                                <MoreVertical className="w-5 h-5" />
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
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                                <img
                                                    src="https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
                                                    alt="Yith Sopheaktra"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    Yith Sopheaktra
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    12-Nov-2024 1:38PM
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-gray-500">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <Preview content={reply?.content} />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

                {/* Second Main Comment
                <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                <img
                                    src="https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
                                    alt="Eung Lyzhia"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="font-medium">Eung Lyzhia</div>
                                <div className="text-sm text-gray-500">
                                    12-Nov-2024 1:38PM
                                </div>
                            </div>
                        </div>
                        <button className="text-gray-500">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        <p>
                            "change input source&ldquo; keyboard shortcut should
                            be disabled
                        </p>
                        <p>To disable it-&gt;</p>
                        <ul className="list-disc ml-5 space-y-1">
                            <li>
                                Go to system preferences -&gt; keyboard -&gt;
                                input sources
                            </li>
                            <li>add a new input source (choose ABC)</li>
                            <li>
                                Go to shortcuts tab (inside of keyboard
                                settings)
                            </li>
                            <li>Click on input sources on the left</li>
                            <li>
                                disable the &ldquo;select previous input
                                source&ldquo; shortcut
                            </li>
                        </ul>
                        <p>
                            restart your vs code and now ctrl+space will show
                            quick suggestions.
                        </p>

                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <ChevronUp className="w-5 h-5" />
                                    <span className="mx-1">5</span>
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </div>
                            <button className="text-gray-600 flex items-center gap-1">
                                <MessageCircle className="w-5 h-5" />
                                <span>Reply</span>
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
