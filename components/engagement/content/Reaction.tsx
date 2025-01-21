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
  getUserReaction,
  handleReaction,
} from "@/hooks/api-hook/engagement/engagement-api";
import { useEffect, useState } from "react";

export function ReactionButton({onReactionChange, contentId, ownerId, slug, userId}) {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [open, setOpen] = useState(false); // Manually control dropdown open/close state

  // Fetch the user's reaction from localStorage or backend when the component mounts
  useEffect(() => {
    const fetchUserReaction = async () => {
      try {
        // First check localStorage for the reaction
        const storedReaction = localStorage.getItem(`${contentId}-${userId}`);
        if (storedReaction) {
          setSelectedReaction(storedReaction); // Restore the reaction from localStorage
        } else {
          // If no reaction in localStorage, fetch from the backend (if needed)
          const userReaction = await getUserReaction(contentId, userId);
          if (userReaction) {
            setSelectedReaction(userReaction.reactionType);
          } else {
            setSelectedReaction(null); // No reaction yet
          }
        }
      } catch (error) {
        console.error("Error fetching user reaction:", error);
        setSelectedReaction(null);
      }
    };

    fetchUserReaction();
  }, [contentId, userId]);

  const handleReactionClick = async (reactionType) => {
    if (selectedReaction === reactionType) {
      // Deselect reaction (remove it)
      setSelectedReaction(null); // Immediately update UI to no reaction
      onReactionChange(reactionType, -1); // Decrease count for the deselected reaction
      localStorage.removeItem(`${contentId}-${userId}`); // Remove from localStorage

      try {
        await deleteReaction(contentId); // Remove reaction from backend
      } catch (error) {
        console.error("Error removing reaction:", error);
        setSelectedReaction(reactionType); // Revert if delete fails
      }
    } else {
      // Set new reaction
      setSelectedReaction(reactionType); // Update UI immediately
      onReactionChange(reactionType, 1); // Increase count for new reaction
      localStorage.setItem(`${contentId}-${userId}`, reactionType); // Save to localStorage

      try {
        await handleReaction(
          contentId,  // Pass as part of an object
          userId,
          reactionType,
          ownerId,
          slug,
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
      <SelectTrigger className="w-[100px] border-collapse">
        <SelectValue placeholder={renderReactionIcon(selectedReaction)} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="flex flex-row">
          <SelectItem
            value="love"
            className="w-10"
            onMouseDown={(e) => {
              e.preventDefault(); // Prevent the dropdown from closing
              handleReactionClick("love");
            }}
          >
            <FaHeart className="text-2xl text-pink-700" />
          </SelectItem>

          <SelectItem
            value="fire"
            className="w-10"
            onMouseDown={(e) => {
              e.preventDefault();
              handleReactionClick("fire");
            }}
          >
            <FaFire className="text-2xl text-red-500" />
          </SelectItem>

          <SelectItem
            value="like"
            className="w-10"
            onMouseDown={(e) => {
              e.preventDefault();
              handleReactionClick("like");
            }}
          >
            <FaThumbsUp className="text-2xl text-blue-500" />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
