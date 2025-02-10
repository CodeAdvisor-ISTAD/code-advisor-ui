"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  ChevronDown,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";
import { TbMessageReport } from "react-icons/tb";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../ui/card";
import { Textarea } from "../../ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegComment } from "react-icons/fa";
import { Profile } from "../Profile";
import { Comment } from "@/types/engagement";
import {
  createComment,
  deleteComment,
  editComment,
  createReply,
  deleteReply,
  editReply,
  getComment,
} from "@/hooks/api-hook/engagement/engagement-api";
import { useUser } from "@/lib/context/userContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { findUserProfileByUuid } from "@/hooks/api-hook/user/user-service";

interface Content {
  contentId: string;
  slug: string;
  ownerId: string;
  userId?: string;
  isLoading?: boolean;
}

export function CommentList({
  contentId,
  slug,
  ownerId,
}: Content & { isLoading }) {
  // Fetch comments by contentId
  const {
    data: comment = [], // Default to an empty array if data is undefined
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ["comments", contentId], // Use unique key for comments
    queryFn: () => getComment(contentId), // Call the imported function
  });

  const [comments, setComments] = React.useState<Comment[]>(comment);
  const [newComment, setNewComment] = React.useState("");
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
  const [editingComment, setEditingComment] = React.useState<string | null>(
    null
  );
  const [editingReply, setEditingReply] = useState<string | null>(null);
  const [replyEditContent, setReplyEditContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = React.useState("");
  const [expandedComments, setExpandedComments] = React.useState<string[]>([]);
  const queryClient = useQueryClient();

  const { user } = useUser();
  const userId = user?.uuid || "6783b16f1b533f163cd7460d";

  const { data: userComment } = useQuery({
    queryFn: () => findUserProfileByUuid(comment?.userId),
    queryKey: ["userComment", comment?.userId],
  });

  const handleSubmit = async (parentId: string | null = null) => {
    if (newComment.trim()) {
      try {
        // Pass dynamic contentId, userId, and body to createComment
        const createdComment = await createComment(contentId, {
          userId: userId,
          body: newComment.trim(),
          parentId: parentId,
          ownerId: ownerId,
          slug: slug,
        });

        // Handle the created comment (add to state)
        if (parentId === null) {
          setComments([createdComment, ...comments]); // Add new top-level comment
        } else {
          setComments(addReply(comments, parentId, createdComment)); // Add reply
          setExpandedComments([...expandedComments, parentId]);
        }

        // Reset the comment input and replying state
        setNewComment(""); // Clear the input field
        setReplyingTo(null); // Reset replying state
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  const handleDelete = async (id: string, parentId: string | null = null) => {
    try {
      let success = false;

      // If parentId is null, it's a comment, otherwise it's a reply
      if (parentId === null) {
        success = await deleteComment(id);
      } else {
        success = await deleteReply(id);
      }

      if (success) {
        // If it's a comment, remove it from top-level comments
        if (parentId === null) {
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== id)
          );
        } else {
          // If it's a reply, remove it from the parent's replies
          setComments((prevComments) =>
            prevComments.map((comment) => {
              if (comment.id === parentId) {
                const updatedReplies = comment.replies.filter(
                  (reply) => reply.id !== id
                );
                return { ...comment, replies: updatedReplies };
              }
              return comment;
            })
          );
        }
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleSaveEdit = async (
    itemId: string,
    parentId: string | null = null
  ) => {
    try {
      // Prepare the updated data
      const updatedItem = {
        userId: userId,
        contentId: contentId,
        body: editContent, // The updated body/content of the comment or reply
      };

      let result;

      if (parentId === null) {
        // It's a comment
        result = await editComment(itemId, updatedItem);
      } else {
        // It's a reply
        result = await editReply(itemId, updatedItem);
      }

      // Update the state with the edited item
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === itemId && parentId === null) {
            // Update the top-level comment
            return result;
          } else if (comment.id === parentId) {
            // Update the reply inside the parent comment's replies array
            const updatedReplies = comment.replies.map((reply) =>
              reply.id === itemId ? result : reply
            );
            return { ...comment, replies: updatedReplies };
          }
          return comment;
        })
      );

      // Clear the editing state
      setEditingComment(null);
      setEditingReply(null);
      setEditContent("");
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const handleEdit = (commentId: string, currentContent: string) => {
    setEditingComment(commentId);
    setEditContent(currentContent);
  };

  const handleReplySubmit = async (parentId: string) => {
    const body = newComment.trim(); // Assuming newComment holds the reply body

    if (body) {
      try {
        const replyData = {
          userId: userId,
          body: body,
        };

        const createdReply = await createReply(parentId, replyData);

        // Add the created reply to the comment's replies
        setComments((prevComments) =>
          addReply(prevComments, parentId, createdReply)
        );

        // Clear the reply input
        setNewComment("");
        setReplyingTo(null);
      } catch (error) {
        console.error("Error submitting reply:", error);
      }
    }
  };

  const addReply = (
    comments: Comment[],
    parentId: string,
    newReply: Comment
  ): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        const updatedReplies = Array.isArray(comment.replies)
          ? [newReply, ...comment.replies]
          : [newReply];
        return { ...comment, replies: updatedReplies };
      } else if (Array.isArray(comment.replies) && comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReply(comment.replies, parentId, newReply),
        };
      }
      return comment;
    });
  };

  const handleDeleteReply = async (replyId: string, parentId: string) => {
    try {
      const success = await deleteReply(replyId); // Call delete API for the reply

      if (success) {
        // Update state to remove the deleted reply from the parent comment's replies
        setComments((prevComments) =>
          prevComments.map((comment) => {
            if (comment.id === parentId) {
              const updatedReplies = comment.replies.filter(
                (reply) => reply.id !== replyId
              );
              return { ...comment, replies: updatedReplies }; // Remove the reply from replies array
            }
            return comment;
          })
        );
        console.log(`Reply with ID ${replyId} was deleted successfully.`);
      }
    } catch (error) {
      console.error("Failed to delete reply:", error);
    }
  };

  const handleSaveEditReply = async (replyId: string, parentId: string) => {
    try {
      // Validate inputs
      if (!replyId || !parentId) {
        console.error("Invalid replyId or parentId");
        return;
      }

      // Prepare the updated reply data
      const updatedReply = {
        userId: userId,
        contentId: contentId,
        body: editContent, // The updated body/content of the reply
      };

      // Log the updated reply data
      console.log("Updated reply data:", updatedReply);

      // Call the API to edit the reply
      const result = await editReply(replyId, updatedReply);

      // Log the API response
      console.log("API response for edited reply:", result);

      // Update the state with the edited reply inside the parent comment's replies array
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === parentId && Array.isArray(comment.replies)
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === replyId ? result : reply
                ),
              }
            : comment
        )
      );

      // Clear the editing state
      setEditingReply(null);
      setEditContent("");
    } catch (error) {
      console.error("Failed to update reply:", error);
    }
  };
  const handleEditReply = (
    replyId: string,
    currentContent: string,
    parentId: string
  ) => {
    setEditingReply(replyId); // Set the reply being edited
    setEditContent(currentContent); // Set the current content of the reply
  };

  const handleDismiss = () => {
    setNewComment("");
    setReplyingTo(null);
  };

  const toggleExpanded = (commentId: string) => {
    setExpandedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const getTotalComments = (comments: Comment[]): number => {
    let total = 0;

    const countReplies = (comments: Comment[]): void => {
      if (!comments) return; // Return early if comments is null or undefined
      total += comments.length;

      comments.forEach((comment) => {
        // Ensure comment.replies is an array before accessing it
        if (Array.isArray(comment.replies) && comment.replies.length > 0) {
          countReplies(comment.replies); // Recursively count replies
        }
      });
    };

    countReplies(comments);
    return total;
  };

  // render comment
  const renderComment = (
    comment: Comment,
    border: boolean = true,
    shadow: boolean = false
  ) => (
    <Card
      key={comment.id}
      className={`
      ${border ? "border" : "border-none"} 
      ${shadow ? "shadow" : "shadow-none"}
      rounded-[5px]
    `}
    >
      <CardHeader className="flex flex-row items-center space-y-0">
        <Profile
          key={comment.id}
          imageUrl={
            userComment?.profileImage ||
            "https://i.pinimg.com/736x/0f/78/5d/0f785d55cea2a407ac8c1d0c6ef19292.jpg"
          }
          // postDate={comment.createdAt.toLocaleDateString()}
          username={userComment?.username || "annonymous"}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="px-2">
            <DropdownMenuGroup>
              {/* edit option */}
              {userId === comment.userId && (
                <DropdownMenuItem
                  onClick={() => {
                    if (comment.commentId) {
                      // This is a reply, handle delete for the reply
                      handleEditReply(
                        comment.id,
                        comment.body,
                        comment.commentId
                      );
                    } else {
                      // This is a top-level comment, handle delete for the comment
                      handleEdit(comment.id, comment.body);
                    }
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>កែរ</span>
                </DropdownMenuItem>
              )}

              {/* Delete option */}
              {userId === comment.userId && (
                <DropdownMenuItem
                  onClick={() => {
                    if (comment.commentId) {
                      // This is a reply, handle delete for the reply
                      handleDeleteReply(comment.id, comment.commentId);
                    } else {
                      // This is a top-level comment, handle delete for the comment
                      handleDelete(comment.id, null);
                    }
                  }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>លុប</span>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem>
                <TbMessageReport className="mr-2 h-4 w-4" />
                <a href={`/report/comment/${contentId}/${comment.id}`}>
                  រាយការណ៍
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        {editingComment === comment.id || editingReply === comment.id ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (editingComment === comment.id) {
                // Editing a top-level comment
                handleSaveEdit(comment.id, null);
              } else if (editingReply === comment.id) {
                // Editing a reply
                handleSaveEditReply(comment.id, comment.commentId); // Pass the parent comment's ID as parentId
              }
            }}
            className="space-y-4"
          >
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleDismiss}>
                បោះបង់
              </Button>
              <Button type="submit" className="text-white">
                រក្សាទុក
              </Button>
            </div>
          </form>
        ) : (
          <p>{comment.body}</p>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setReplyingTo(comment.id)}
        >
          <FaRegComment className="mr-2 h-4 w-4​" />
          <span className="text-sm">ឆ្លើយតប</span>
        </Button>
        {Array.isArray(comment.replies) && comment.replies.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleExpanded(comment.id)}
          >
            {expandedComments.includes(comment.id) ? (
              <ChevronUp className="mr-2 h-4 w-4" />
            ) : (
              <ChevronDown className="mr-2 h-4 w-4" />
            )}
            <span className="text-sm">
              {comment.replies.length}{" "}
              {comment.replies.length === 1 ? "ឆ្លើយតប" : "ឆ្លើយតប"}
            </span>
          </Button>
        )}
      </CardFooter>

      {replyingTo === comment.id && ( // Only show reply form if replyingTo matches comment.id
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleReplySubmit(comment.id); // Pass parent comment id when submitting a reply
            }}
            className="space-y-4"
          >
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="សរសេរ ការឆ្លើយតប..."
              className="w-full"
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="submit"
                className="text-white"
                onClick={handleDismiss}
              >
                បោះបង់
              </Button>
              <Button type="submit" className="text-white">
                បញ្ចូន
              </Button>
            </div>
          </form>
        </CardContent>
      )}

      {expandedComments.includes(comment.id) && (
        <CardContent>
          <div className="space-y-4 border-l-2">
            {comment.replies.map((reply) => renderComment(reply, false))}
          </div>
        </CardContent>
      )}
    </Card>
  );

  return (
    <div className="w-full max-w-3xl overflow-hidden p-[1px]">
      <Card className="rounded-[5px] shadow-none">
        <CardHeader>
          <CardTitle>មតិយោបល់ ({getTotalComments(comment)})</CardTitle>
          <Profile
            imageUrl={
              user?.profileImage ||
              "https://i.pinimg.com/736x/0f/78/5d/0f785d55cea2a407ac8c1d0c6ef19292.jpg"
            }
            username={user?.fullName || "Annonymous"}
          />
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-4"
          >
            {/* <div className="space-y-2">
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div> */}
            <div className="space-y-2">
              <Textarea
                id="comment"
                placeholder="សរសេរ​ មតិយោបល់..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleDismiss}>
                បោះបង់
              </Button>
              <Button type="submit" className="text-white">
                បញ្ចូន
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-2 mt-2 rounded-[5px] p-[1px]">
        {comment.map((comment) => renderComment(comment))}
      </div>
    </div>
  );
}
