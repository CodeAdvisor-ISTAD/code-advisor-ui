"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectContent";
import { FaFire, FaHeart, FaRegHeart, FaThumbsUp } from "react-icons/fa";
import {
  deleteReaction,
  fetchUserReaction,
  handleReaction,
} from "@/hooks/api-hook/engagement/engagement-api";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function ReactionButton({
  onReactionChange,
  contentId,
  ownerId,
  slug,
  userId,
}) {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch the user's reaction when the component mounts
  useEffect(() => {
    const fetchReaction = async () => {
      try {
        const reaction = await fetchUserReaction(contentId, userId);
        if (reaction) {
          console.log("User's Reaction Type:", reaction.reactionType); // Log the reaction type
          setSelectedReaction(reaction.reactionType); // Set the user's reaction
          localStorage.setItem(`${contentId}-${userId}`, reaction.reactionType); // Persist locally
        } else {
          console.log("User has not reacted yet."); // Log when no reaction exists
          localStorage.removeItem(`${contentId}-${userId}`);
        }
      } catch (error) {
        console.error("Error fetching user reaction:", error);
        // Fallback: Try to retrieve from localStorage
        const cachedReaction = localStorage.getItem(`${contentId}-${userId}`);
        if (cachedReaction) {
          console.log(
            "Fallback Reaction Type from localStorage:",
            cachedReaction
          ); // Log fallback
          // setSelectedReaction(cachedReaction);
        }
      }
    };
    fetchReaction();
  }, [contentId, userId]);

  useEffect(() => {
    console.log("Selected Reaction Updated:", selectedReaction);
  }, [selectedReaction]);

  const handleReactionClick = async (reactionType) => {
    console.log("Selected Reaction Type:", reactionType); // Log the selected reaction type

    if (selectedReaction === reactionType) {
      // Deselect reaction (remove it)
      try {
        // Immediately update the UI to no reaction
        setSelectedReaction(null);
        onReactionChange(reactionType, -1); // Decrease count for the deselected reaction
        localStorage.removeItem(`${contentId}-${userId}`); // Remove from localStorage

        // Call the delete API
        const isDeleted = await deleteReaction(contentId);
        if (!isDeleted) {
          throw new Error("Failed to delete reaction on the backend.");
        }

        console.log("Reaction successfully deleted from backend.");
      } catch (error) {
        console.error("Error removing reaction:", error);

        // Revert the state if the deletion fails
        setSelectedReaction(reactionType);
        onReactionChange(reactionType, 1); // Revert the count
        localStorage.setItem(`${contentId}-${userId}`, reactionType); // Restore in localStorage
      }
    } else {
      // Set new reaction
      setSelectedReaction(reactionType); // Update UI immediately
      onReactionChange(reactionType, 1); // Increase count for new reaction
      localStorage.setItem(`${contentId}-${userId}`, reactionType); // Save to localStorage

      try {
        await handleReaction(
          contentId, // Pass as part of an object
          userId,
          reactionType,
          ownerId,
          slug
        ); // Update reaction on backend
      } catch (error) {
        console.error("Error updating reaction:", error);
      }
    }
  };

   // Determine which icon to show based on selected reaction
   const renderReactionIcon = (selectedReaction) => {
    if (selectedReaction === "love") {
      return <FaHeart className="text-2xl text-pink-700" />;
    } else if (selectedReaction === "fire") {
      return <FaFire className="text-2xl text-red-500" />;
    } else if (selectedReaction === "like") {
      return <FaThumbsUp className="text-2xl text-blue-500" />;
    } else {
      return <FaRegHeart className="text-2xl" />;
    }
  };

  return (
    <Select open={open} onOpenChange={setOpen}>
      <SelectTrigger
        className="w-[100px] border-collapse"
        key={selectedReaction}
      >
        <SelectValue placeholder={renderReactionIcon(selectedReaction)} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="flex flex-row">
          <SelectItem
            value={"love"}
            className="w-10"
            onMouseDown={(e) => {
              e.preventDefault(); // Prevent the dropdown from closing
              // handleReactionClick("love");
            }}
          >
            <FaHeart className="text-2xl text-pink-700" />
          </SelectItem>
          <SelectItem
            value={"fire"}
            className="w-10"
            onMouseDown={(e) => {
              e.preventDefault();
              // handleReactionClick("fire");
            }}
          >
            <FaFire className="text-2xl text-red-500" />
          </SelectItem>
          <SelectItem
            value={"like"}
            className="w-10"
            onMouseDown={(e) => {
              e.preventDefault();
              // handleReactionClick("like");
            }}
          >
            <FaThumbsUp className="text-2xl text-blue-500" />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
