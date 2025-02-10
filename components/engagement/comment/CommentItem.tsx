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
import { FaRegComment } from "react-icons/fa";
import { Profile } from "../Profile";
import { Comment } from "@/types/engagement";
import { Card, CardHeader, CardContent, CardFooter } from "../../ui/card";
import { Textarea } from "../../ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { editComment } from "@/hooks/api-hook/engagement/engagement-api";

interface CommentItemProps {
  comment: Comment;
  onEdit: (id: string, content: string) => void;
  onDelete: (id: string, parentId: string | null) => void;
  onReply: (parentId: string) => void;
  onSaveEdit: (id: string) => void;
  onDismiss: () => void;
  isEditing: boolean;
  editContent: string;
  setEditContent: (content: string) => void;
  replyingTo: string | null;
  newComment: string;
  setNewComment: (content: string) => void;
  expandedComments: string[];
  toggleExpanded: (commentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onEdit,
  onDelete,
  onReply,
  onSaveEdit,
  onDismiss,
  isEditing,
  editContent,
  setEditContent,
  replyingTo,
  newComment,
  setNewComment,
  expandedComments,
  toggleExpanded,
}) => {
  const isExpanded = expandedComments.includes(comment.id);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  return (
    <Card key={comment.id} className="rounded-[5px] border">
      <CardHeader className="flex flex-row items-center space-y-0">
        <Profile
          imageUrl={comment.author?.image}
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
                onClick={() => {
                  onEdit(comment.id, comment.body);
                  setEditingCommentId(comment.id); // Set the ID of the comment being edited
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(comment.id, comment?.commentId || null)}
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TbMessageReport className="mr-2 h-4 w-4" />
                <a href={`/report/comment/${comment.contentId}/${comment.id}`}>
                  Report
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        {/* Fix the comparison here */}
        {isEditing && editingCommentId === comment.id ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSaveEdit(comment.id);
            }}
            className="space-y-4"
          >
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onDismiss();
                  setEditingCommentId(null); // Reset the editing state
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="text-white">
                Save
              </Button>
            </div>
          </form>
        ) : (
          <p>{comment.body}</p>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={() => onReply(comment.id)}>
          <FaRegComment className="mr-2 h-4 w-4" />
          <span className="text-sm">Reply</span>
        </Button>
        {Array.isArray(comment.replies) && comment.replies.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleExpanded(comment.id)}
          >
            {isExpanded ? (
              <ChevronUp className="mr-2 h-4 w-4" />
            ) : (
              <ChevronDown className="mr-2 h-4 w-4" />
            )}
            <span className="text-sm">
              {comment.replies.length}{" "}
              {comment.replies.length === 1 ? "Reply" : "Replies"}
            </span>
          </Button>
        )}
      </CardFooter>

      {replyingTo === comment.id && (
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onReply(comment.id);
            }}
            className="space-y-4"
          >
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a reply..."
              className="w-full"
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onDismiss}>
                Cancel
              </Button>
              <Button type="submit" className="text-white">
                Send
              </Button>
            </div>
          </form>
        </CardContent>
      )}

      {isExpanded && (
        <CardContent>
          <div className="space-y-4 border-l-2">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onEdit={onEdit}
                onDelete={onDelete}
                onReply={onReply}
                onSaveEdit={onSaveEdit}
                onDismiss={onDismiss}
                isEditing={isEditing}
                editContent={editContent}
                setEditContent={setEditContent}
                replyingTo={replyingTo}
                newComment={newComment}
                setNewComment={setNewComment}
                expandedComments={expandedComments}
                toggleExpanded={toggleExpanded}
              />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default CommentItem;
