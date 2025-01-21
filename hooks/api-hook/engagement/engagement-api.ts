import axios from "axios";

// fetch comment by contentId
export const getComment = async (contentId: string) => {
  const response = await fetch(
    `http://192.168.56.1:8086/api/v1/engagement/comments/content/${contentId}`
  );
  if (response.ok) {
    const data = await response.json();
    console.log(`Comments for ${contentId} fetched:`, data);
    return data;
  } else {
    throw new Error(`Failed to fetch comments for contentId: ${contentId}`);
  }
};

// Create a new comment by contentId
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
      `http://192.168.56.1:8086/api/v1/engagement/comments`,
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
      `http://192.168.56.1:8086/api/v1/engagement/comments/${commentId}`,
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

// edit comment by commentId
export const editComment = async (
  commentId: string,
  updatedContent: { userId: string; contentId: string; body: string }
) => {
  const response = await fetch(
    `http://192.168.56.1:8086/api/v1/engagement/comments/${commentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContent),
    }
  );

  if (response.ok) {
    const data = await response.json();
    console.log(`Comment with ID ${commentId} updated successfully:`, data);
    return data; // Return the updated comment
  } else {
    throw new Error(`Failed to update comment with ID: ${commentId}`);
  }
};

// create reply by commentId
export const createReply = async (
  commentId: string, // The parent comment's ID to which the reply is associated
  replyData: { userId: string; body: string }
) => {
  const response = await fetch(
    `http://192.168.56.1:8086/api/v1/engagement/replies/${commentId}`,
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

export const editReply = async (
  replyId: string,
  replyData: { userId: string; body: string }
) => {
  try {
    const response = await axios.put(
      `http://192.168.56.1:8086/api/v1/engagement/replies/${replyId}`,
      replyData
    );
    return response.data; // Return the updated reply data
  } catch (error) {
    console.error("Error editing reply:", error);
    throw error; // Handle error appropriately
  }
};

// delete reply
export const deleteReply = async (replyId: string) => {
  try {
    const response = await fetch(
      `http://192.168.56.1:8086/api/v1/engagement/replies/${replyId}`,
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

// create reaction
// export const handleReaction = async (contentId, userId, reactionType) => {
//   const endpoint = `http://192.168.56.1:8086/api/v1/reactions/content/${contentId}`;
//   const payload = {
//     contentId,
//     userId,
//     reactionType,
//   };

//   try {
//     const response = await axios.post(endpoint, payload, {
//       headers: { "Content-Type": "application/json" },
//     });
//     return response.data; // Return the response if needed
//   } catch (error) {
//     console.error("Error handling reaction:", error);
//     throw error; // Optionally rethrow the error for handling elsewhere
//   }
// };

export const handleReaction = async (contentId, userId, reactionType, ownerId, slug) => {
  const endpoint = `http://192.168.56.1:8086/api/v1/reactions/content/${contentId}`;
  const payload = {
    contentId,
    userId,
    reactionType,
    ownerId,
    slug
  };

  try {
    const response = await axios.post(endpoint, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data; // Return the response if needed
  } catch (error) {
    console.error("Error handling reaction:", error);
    throw error; // Optionally rethrow the error for handling elsewhere
  }
};

// get reaction
export const getReaction = async (contentId) => {
  const endpoint = `http://192.168.56.1:8086/api/v1/reactions/content/${contentId}`;

  try {
    const response = await axios.get(endpoint, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data; // Assumes the API response contains the reactions data.
  } catch (error) {
    console.error(`Error fetching reactions for contentId ${contentId}:`, error);
    throw error;
  }
};

export const getReactionsByContentId = async (contentId: string) => {
  try {
    const response = await fetch(
      `http://192.168.56.1:8086/api/v1/reactions/content/${contentId}`
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

export const deleteReaction = async (contentId: string): Promise<void> => {
  try {
    // Make DELETE request to remove the reaction for the given contentId
    const url = `http://192.168.56.1:8086/api/v1/reactions/${contentId}`;
    await axios.delete(url);

    console.log(`Reaction with contentId ${contentId} has been deleted.`);
  } catch (error) {
    console.error(`Error deleting reaction with contentId ${contentId}:`, error);
    throw error; // Propagate the error after logging it
  }
};

export const getUserReaction = async (contentId: string, userId: string) => {
  try {
    const response = await axios.get(`http://192.168.56.1:8086/api/v1/reactions/${contentId}/user/${userId}`);
    return response.data.reaction; // This should be the reaction type like "love", "fire", or "like"
  } catch (error) {
    console.error("Error fetching user reaction:", error);
    throw error;
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
    const response = await fetch(`http://192.168.56.1:8086/api/v1/reports`, {
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

