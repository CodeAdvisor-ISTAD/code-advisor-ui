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
import { createComment, deleteComment, editComment, createReply, deleteReply, editReply } from "@/hooks/api-hook/engagement/engagement-api";

interface Content {
  comment: Comment[];
  contentId?: string;
  slug?: string;
  ownerId?: string;
  userId?: string;
}

export function CommentList({ comment = [], contentId, slug, ownerId, userId }: Content) {
  const [comments, setComments] = React.useState<Comment[]>(comment);
  const [newComment, setNewComment] = React.useState("");
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
  const [editingComment, setEditingComment] = React.useState<string | null>(
    null
  );
  const [editingReply, setEditingReply] = useState<string | null>(null);
  const [replyEditContent, setReplyEditContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = React.useState("CurrentUser");
  const [editContent, setEditContent] = React.useState("");
  const [expandedComments, setExpandedComments] = React.useState<string[]>([]);

  const handleSubmit = async (parentId: string | null = null) => {
    // const contentId = "678378aecde7c858c76a0290"; // Example contentId, dynamically set as needed
    // const userId = "6783b16f1b533f163cd7460d"; // Example userId, dynamically set as needed
    // const ownerId = "b3ee9ec3-be2f-401d-89fc-6f3956efcfc4";
    // const slug = "spring-boot-jpa"
    // spring-boot-jpa
  
    if (newComment.trim()) {
      try {
        // Pass dynamic contentId, userId, and body to createComment
        const createdComment = await createComment(contentId, {
          userId: userId,
          body: newComment.trim(),
          parentId: parentId,
          ownerId: ownerId,
          slug: slug
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

  // const handleDelete = async (commentId: string) => {
  //   try {
  //     const success = await deleteComment(commentId);
  
  //     if (success) {
  //       // Update state to reflect the deletion of the comment
  //       setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
  //       console.log(`Comment with ID ${commentId} was deleted successfully.`);
  //     }
  //   } catch (error) {
  //     console.error("Failed to delete comment:", error);
  //   }
  // };

  const handleDelete = async (id: string, parentId: string | null = null) => {
    try {
      let success = false;
  
      // If parentId is null, it's a comment, otherwise it's a reply
      if (parentId === null) {
        success = await deleteComment(id);
        console.log("Comment222222222222222222222222222")
      } else {
        success = await deleteReply(id);
        console.log("Reply11111111111111111111111111111")
      }
  
      if (success) {
        // If it's a comment, remove it from top-level comments
        if (parentId === null) {
          setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
        } else {
          // If it's a reply, remove it from the parent's replies
          setComments((prevComments) =>
            prevComments.map((comment) => {
              if (comment.id === parentId) {
                const updatedReplies = comment.replies.filter((reply) => reply.id !== id);
                return { ...comment, replies: updatedReplies };
              }
              return comment;
            })
          );
        }
        console.log(`Item with ID ${id} was deleted successfully.`);
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };


  const handleSaveEdit = async (commentId: string) => {
    const contentId = "67815231083dc108c96fd929"; // Example contentId, dynamically set as needed
    const userId = "6783b16f1b533f163cd7460d"; // Example userId, dynamically set as needed

    try {
      // Prepare the updated comment data
      const updatedComment = {
        userId: userId,
        contentId: contentId,
        body: editContent, // The updated body/content of the comment
      };
  
      // Call the API to edit the comment
      const result = await editComment(commentId, updatedComment);
  
      // Update the state with the edited comment
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? result : comment
        )
      );
  
      // Clear the editing state
      setEditingComment(null);
      setEditContent("");
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleEdit = (commentId: string, currentContent: string) => {
    setEditingComment(commentId);
    setEditContent(currentContent);
  };

  const handleReplySubmit = async (parentId: string) => {
    const userId = "6783b16f1b533f163cd7460d"; // Replace with the actual userId
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
              const updatedReplies = comment.replies.filter((reply) => reply.id !== replyId);
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
    const contentId = "678378aecde7c858c76a0290"; // Example contentId, dynamically set as needed
    const userId = "6783b16f1b533f163cd7460d"; // Example userId, dynamically set as needed
  
    try {
      // Prepare the updated reply data
      const updatedReply = {
        userId: userId,
        contentId: contentId,
        body: editContent, // The updated body/content of the reply
      };
  
      // Call the API to edit the reply
      const result = await editReply(replyId, updatedReply);
  
      // Update the state with the edited reply inside the parent comment's replies array
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === replyId ? result : reply // Update the specific reply
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

  const handleEditReply = (replyId: string, currentContent: string, parentId: string) => {
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
          imageUrl={comment.author?.image}
          // postDate={comment.createdAt.toLocaleDateString()}
          username={comment.author?.userName}
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
              <DropdownMenuItem
                onClick={() => handleEdit(comment.id, comment.body)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>កែរ</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(comment.id, comment.parentId || null)}>
                <Trash className="mr-2 h-4 w-4" />
                <span>លុប</span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <TbMessageReport className="mr-2 h-4 w-4" />
                <a href={`/report/comment/${contentId}/${comment.id}`}>
                  រាយការណ៍
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>{" "}
      </CardHeader>

      <CardContent>
        {editingComment === comment.id ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveEdit(comment.id);
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
              <Button type="button" variant="outline" onClick={handleDismiss}>
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
          <CardTitle>មតិយោបល់ ({getTotalComments(comments)})</CardTitle>
          <Profile
            imageUrl="https://i.pinimg.com/236x/3f/a9/2a/3fa92a0c86938e43376928b3ee66518b.jpg"
            postDate="30 Jan 2004"
            username="sokkhann"
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
        {comments.map((comment) => renderComment(comment))}
      </div>
    </div>
  );
}
