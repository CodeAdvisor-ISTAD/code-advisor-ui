import { useQuery } from "@tanstack/react-query";
import { useId } from "react";

type AchievementLevel = {
  id: string;
  userId: string;
  username: string;
  currentLevel: string; // E.g., "Contributor"
  shareContentTotal: number;
  askQuestionTotal: number;
  answerQuestionTotal: number;
  commentTotal: number;
  interactionTotal: number;
  totalPoints: number;
  isPublish: boolean;
};

// Fetch achievement level for a specific user
async function fetchAchievementLevel(userId: string): Promise<AchievementLevel | null> {
    try {
      const response = await fetch(`/users/api/v1/achievement_levels/${userId}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error("Error fetching achievement level:", error);
      return null;
    }
  }
  
  export const useFetchAchievementLevel = (userId: string | null) => {
    return useQuery({
      queryKey: ["achievementLevel", userId],
      queryFn: () => fetchAchievementLevel(userId!),
      enabled: !!userId, // Fetch only if userId exists
    });
  };