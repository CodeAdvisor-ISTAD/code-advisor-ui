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
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function ReactionButton({onReactionChange, contentId, ownerId, slug, userId}) {


  const [selectedReaction, setSelectedReaction] = useState(null);
  const [open, setOpen] = useState(false); // Manually control dropdown open/close state

  const { mutate } = useMutation({
    mutationFn: ({ contentId, userId, type, reactionType, ownerId, slug }) => 
      handleReaction(contentId, userId, type,reactionType, ownerId, slug),
    onMutate: () => {
      // Optional: Do something before the mutation
    },
    onSuccess: (data, variables, context) => {
      toast.success("អ្នកបាន");
      // Optional: Do something on success
    },
    onError: (error, variables, context) => {
      toast.error("បរាជ័យ");
      console.error(error)
      // Optional: Do something on error
    }
  });
  

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

  // const handleReactionClick = (reactionType: keyof Reactions) => {
  //   if (selectedReaction === reactionType) {
  //     // If already selected, deselect and decrease count
  //     setSelectedReaction(null);
  //     onReactionChange(reactionType, -1);
  //     mutate({ contentId, userId, reactionType, ownerId, slug });
  //   } else {
  //     // If a new reaction, update the count for new reaction and reset the old one
  //     if (selectedReaction) {
  //       onReactionChange(selectedReaction, -1);
  //     }
  //     setSelectedReaction(reactionType);
  //     onReactionChange(reactionType, 1);
  //   }
  // };

  const handleReactionClick = (reactionType) => {
    mutate({ contentId, userId, type: 'REACTION' , reactionType, ownerId, slug });
  };

  return (
    <Select open={open} onOpenChange={setOpen}>
      <SelectTrigger
        className="w-[100px] border-collapse"
      >
        <SelectValue
          placeholder={<FaRegHeart className="text-2xl" />}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="flex flex-row">
          <SelectItem
            value={"love"}
            className="w-10"
            onMouseDown={(e) => {
              e.preventDefault(); // Prevent the dropdown from closing
              handleReactionClick("love");
            }}
          >
            <FaHeart className="text-2xl text-pink-700" />
          </SelectItem>

          <SelectItem
            value={"fire"}
            className="w-10"
            onMouseDown={(e) => {
              e.preventDefault();
              handleReactionClick("fire");
            }}
          >
            <FaFire className="text-2xl text-red-500" />
          </SelectItem>

          <SelectItem
            value={"like"}
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
