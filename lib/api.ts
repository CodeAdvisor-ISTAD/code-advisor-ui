// // lib.ts

// import { Author, Content, Reactions, Comment } from "@/types/engagement";

// const authors: Author[] = [
//   {
//     id: "a1",
//     userName: "John Doe",    image: "https://i.pinimg.com/736x/7c/00/3f/7c003f765d1cec42ae00100084b94daf.jpg"
//   },
//   {
//     id: "a2",
//     userName: "Jane Smith",
//     image: "https://i.pinimg.com/474x/97/a7/3f/97a73f0f553157648c90655078101718.jpg"
//   },
// ];

// const comments: Comment[] = [
//   {
//     id: "c1",
//     author: authors[0],
//     body: "This is a comment on the content.",
//     createdAt: new Date("2023-12-04T13:00:00Z"),
//     isReport: false,
//     updateAt: new Date("2023-12-04T13:00:00Z"),
//     replies: [
//       {
//         id: "r1",
//         author: authors[1],
//         body: "This is a reply to the comment.",
//         createdAt: new Date("2023-12-04T14:30:00Z"),
//         isReport: false,
//         updateAt: new Date("2023-12-04T14:30:00Z"),
//         parentId: "c1", // This is a reply to the comment with id "c1"
//         replies: [] // Replies can be nested, though empty here
//       }
//     ]
//   },
//   {
//     id: "c2",
//     author: authors[1],
//     body: "This is another comment on the content.",
//     createdAt: new Date("2023-12-04T13:10:00Z"),
//     isReport: false,
//     updateAt: new Date("2023-12-04T13:10:00Z"),
//     replies: [
//       {
//         id: "r2",
//         author: authors[0],
//         body: "This is a reply to the second comment.",
//         createdAt: new Date("2023-12-04T14:45:00Z"),
//         isReport: false,
//         updateAt: new Date("2023-12-04T14:45:00Z"),
//         parentId: "c2", // This is a reply to the comment with id "c2"
//         replies: []
//       }
//     ]
//   }
// ];
// // Mock API functions to simulate backend calls
// const contents: Content[] = [
//   {
//     id: "1",
//     title: "Introduction to React",
//     description: "Learn the basics of React and how to build modern web applications.",
//     cover: "https://i.pinimg.com/736x/b3/ba/35/b3ba35122f1b364eb13131343c94dc67.jpg",
//     author: authors[0],
//     tags: ["React", "JavaScript", "Web Development"],
//     createdAt: "2023-05-15T10:00:00Z",
//     reactions: { likeCount: 30, loveCount: 29, fireCount: 90 },
//     comment: comments,
//     isBookmark: false, // Whether the content is bookmarked by the user
//     bookmark: 10 // The number of total bookmarks for this content
//   },
//   {
//     id: "2",
//     title: "Advanced TypeScript Techniques",
//     description: "Dive deep into TypeScript and learn advanced concepts and patterns.",
//     cover: "https://i.pinimg.com/236x/64/05/58/640558ee5bd3a60a62aea4d1911cbe3b.jpg",
//     author: authors[1],
//     tags: ["TypeScript", "JavaScript", "Programming"],
//     createdAt: "2023-06-01T14:30:00Z",
//     reactions: {  loveCount: 38, fireCount: 72, likeCount: 20 },
//     comment: comments,
//     isBookmark: true, // Whether the content is bookmarked by the user
//     bookmark: 25 // The number of total bookmarks for this content
//   }
// ];


// // Get the list of contents
// export async function getContents(): Promise<Content[]> {
//   return contents;
// }

// // Get a specific content by id
// export async function getContentById(contentId: string): Promise<Content | undefined> {
//   // Find and return the content with the matching id
//   return contents.find(content => content.id === contentId);
// }


// // Function to get the comments of a specific content by id
// export async function getCommentsByContentId(contentId: string): Promise<Comment[] | undefined> {
//   const content = await getContentById(contentId);
//   if (content) {
//     return content.comment; // Return the comments for the specific content
//   }
//   return undefined; // Return undefined if no content found
// }

// // Get reactions (like, love, fire) for a content
// export const updateReaction = async (contentId: string, reaction: Reactions): Promise<void> => {
//   // Simulating a backend update
//   console.log(`Updated reaction for content ${contentId}: ${reaction}`);
// };

// // Add a reply to a comment
// export const addReply = async (commentId: string, replyText: string): Promise<void> => {
//   // Simulating adding a reply to a comment
//   console.log(`Added reply to comment ${commentId}: ${replyText}`);
// };

// const API_URL = '/api'; // Replace with your actual API URL

// export async function getComments(contentId: string): Promise<Comment[]> {
//   const response = await fetch(`${API_URL}/content/${contentId}/comments`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch comments');
//   }
//   return response.json();
// }

// export async function addComment(contentId: string, comment: Omit<Comment, 'id' | 'createdAt' | 'replies'>): Promise<Comment> {
//   const response = await fetch(`${API_URL}/content/${contentId}/comments`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(comment),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to add comment');
//   }
//   return response.json();
// }

// export async function updateComment(commentId: string, body: string): Promise<Comment> {
//   const response = await fetch(`${API_URL}/comments/${commentId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ body }),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to update comment');
//   }
//   return response.json();
// }

// export async function deleteComment(commentId: string): Promise<void> {
//   const response = await fetch(`${API_URL}/comments/${commentId}`, {
//     method: 'DELETE',
//   });
//   if (!response.ok) {
//     throw new Error('Failed to delete comment');
//   }
// }


// // for notification
import type { Notification } from '@/types/notifications';
const API_BASE_URL = '/notifications/api/v1';

export const fetchNotifications = async (userId: string): Promise<Notification[]> => {
  const response = await fetch(`${API_BASE_URL}/notifications/${userId}`);
  return response.json();
};

export const markAsRead = async (id: string, status: boolean): Promise<void> => {
  await fetch(`${API_BASE_URL}/notifications/${id}/status?read=${status}`, {
    method: 'PUT',
  });
};

export const markAllNotificationsAsRead = async (userId: string): Promise<void> => {
  await fetch(`${API_BASE_URL}/notifications/${userId}/mark-all-read`, {
    method: 'PUT',
  });
};


export const removeNotification = async (id: string): Promise<void> => {
  await fetch(`${API_BASE_URL}/notifications/${id}`, {
    method: 'DELETE',
  });
};


