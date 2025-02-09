import axios from "axios";

// Fetch comments by contentId using Axios
export const getComment = async (contentId: string) => {
  try {
    const response = await axios.get(`/ces/api/v1/engagement/comments/content/${contentId}`);
    
    // Log the fetched comments for debugging
    console.log(`Comments for ${contentId} fetched:`, response.data);

    // Return the data (comments)
    return response.data;
  } catch (error) {
    // Handle errors and throw a meaningful message
    console.error(`Failed to fetch comments for contentId: ${contentId}`, error);
    throw new Error(`Failed to fetch comments for contentId: ${contentId}`);
  }
};

// Create a new comment by contentId
export const createComment = async (
  contentId: string,
  {
    userId,
    body,
    parentId,
    ownerId,
    slug,
  }: { userId: string; body: string; parentId: string | null; ownerId: string; slug: string }
) => {
  try {
    const response = await fetch(
      `/ces/api/v1/engagement/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId, // Dynamic userId
          contentId, // Dynamic contentId
          body, // Dynamic body
          parentId, // Optional dynamic parentId (for replies)
          ownerId, // New ownerId field
          slug, // New slug field
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create comment: ${response.statusText}`);
    }

    return await response.json(); // Return the response JSON
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error; // Rethrow error for handling in the UI
  }
};


// delete comment by contentId
export const deleteComment = async (commentId: string) => {
  try {
    const response = await fetch(
      `/ces/api/v1/engagement/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      console.log(`Comment with ID ${commentId} deleted successfully.`);
      return true; // Return true if the comment was deleted successfully
    } else {
      const errorData = await response.text();
      console.error(`Failed to delete comment with ID: ${commentId}`);
      console.error("API Response:", errorData);
      throw new Error(`Failed to delete comment with ID: ${commentId}`);
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error; // Rethrow error after logging
  }
};

// Edit Comment
export const editComment = async (
  commentId: string,
  updatedContent: { userId: string; contentId: string; body: string }
) => {
  try {
    const response = await axios.patch(
      `/ces/api/v1/engagement/comments/${commentId}`,
      updatedContent
    );
    return response.data; // Return the updated comment data
  } catch (error) {
    console.error("Error editing comment:", error);
    throw new Error('Failed to edit comment');
  }
};

// create reply by commentId
export const createReply = async (
  commentId: string, // The parent comment's ID to which the reply is associated
  replyData: { userId: string; body: string }
) => {
  const response = await fetch(
    `/ces/api/v1/engagement/replies/${commentId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(replyData),
    }
  );

  if (response.ok) {
    const data = await response.json();
    console.log(
      `Reply to comment with ID ${commentId} created successfully:`,
      data
    );
    return data; // Return the created reply
  } else {
    throw new Error(`Failed to create reply for comment with ID: ${commentId}`);
  }
};

// Edit Reply
export const editReply = async (
  replyId: string,
  replyData: { userId: string; body: string }
) => {
  try {
    const response = await axios.patch(
      `/ces/api/v1/engagement/replies/${replyId}`,
      replyData
    );
    return response.data; // Return the updated reply data
  } catch (error) {
    console.error("Error editing reply:", error);
    throw new Error('Failed to edit reply');
  }
};

// delete reply
export const deleteReply = async (replyId: string) => {
  try {
    const response = await fetch(
      `/ces/api/v1/engagement/replies/${replyId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      console.log(`Reply with ID ${replyId} deleted successfully.`);
      return true; // Return true if the reply was deleted successfully
    } else {
      const errorData = await response.text();
      console.error(`Failed to delete reply with ID: ${replyId}`);
      console.error("API Response:", errorData);
      throw new Error(`Failed to delete reply with ID: ${replyId}`);
    }
  } catch (error) {
    console.error("Error deleting reply:", error);
    throw error; // Rethrow error after logging
  }
};

export const handleReaction = async (contentId, userId, reactionType, ownerId, slug) => {
  const response = await fetch(`/ces/api/v1/reactions/content/${contentId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contentId, userId, reactionType, ownerId, slug }),
  });
  return response.json();
};


export const getReactionsByContentId = async (contentId: string) => {
  try {
    const response = await fetch(
      `/ces/api/v1/reactions/content/${contentId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch reactions data");
    }

    const data = await response.json();

    // Map API response keys to localReactions state keys
    return {
      likeCount: data.like || 0,
      loveCount: data.love || 0,
      fireCount: data.fire || 0,
    };
  } catch (error) {
    console.error("Error fetching reactions:", error);
    throw error;
  }
};

export const deleteReaction = async (contentId) => {
  try {
    const response = await axios.delete(
      `/ces/api/v1/reactions/${contentId}`
    );

    // Log success if needed
    console.log("Reaction deleted successfully:", response.status);

    return true; // Indicate success
  } catch (error) {
    console.error("Error deleting reaction:", error);
    return false; // Indicate failure
  }
};

export const fetchUserReaction = async (contentId, userId) => {
  try {
    const response = await axios.get(
      `/ces/api/v1/reactions/${contentId}/user/${userId}`
    );

    const data = response.data;

    // Log the reaction type if it exists
    if (data && !data.isDeleted) {
      console.log("Fetched Reaction Type:", data.reactionType); // Log the reaction type
      return { reactionType: data.reactionType }; // Return the reaction type
    } else {
      console.log("No reaction found for user:", userId); // Log when no reaction exists
      return null;
    }
  } catch (error) {
    console.error("Error fetching user reaction:", error);
    return null; // Return null in case of an error
  }
};

// report
export const createReport = async (report: {
  contentId?: string; // Optional for content reports
  commentId?: string; // Optional for comment reports
  slug: string;
  ownerId: string;
  userId: string;
  reason: string;
  description: string;
  url?: string; // Optional field for the report URL
}) => {
  try {
    const response = await fetch(`/ces/api/v1/reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(report),
    });

    if (!response.ok) {
      throw new Error(`Failed to create report: ${response.statusText}`);
    }

    return await response.json(); // Parse and return the server response
  } catch (error) {
    console.error("Error creating report:", error);
    throw error; // Propagate error to the caller
  }
};

interface ShareContent {
  userId: string;
  contentId: string;
  sharePlatform: string;
}

export const shareContent = async (shareData: ShareContent) => {
  try {
    const response = await axios.post(`/ces/api/v1/shares/shareContent`, shareData);
    return response.data;
  } catch (error) {
    console.error("Error sharing content:", error);
    throw new Error("Failed to share content");
  }
};