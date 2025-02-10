// types.ts

// Types for Reaction
export interface Reactions {
  likeCount: number;
  loveCount: number;
  fireCount: number;
}

// Type for Author Profile
export interface Author {
  id: string;
  userName: string;
  image: string;
}

export interface ReactionRequest {
  contentId: string;
  type: string;
  userId: string;
  reactionType: string;
  ownerId: string;
  slug: string;
}


// Type for Content
export interface Content {
  contentId?: string;
  slug?: string;
  title?: string;
  username: string;
  description?: React.ReactNode;
  thumbnail?: string;
  authorUuid?: string;
  profileImage?: string;
  tags?: string[];
  createdAt: string;
  reactions?: Reactions;
  comment?: Comment[];
  isBookmark?: boolean;
  bookmark?: number;
  keywords?: string;
  isDraft?: boolean;
  isArchived?: boolean;
  isDeleted?: boolean
}

// Type for Comment
export interface Comment {
  id: string;
  userId: string;
  contentId: string;
  author?: Author;
  body: string;
  createdAt: Date;
  isReport: boolean;
  updateAt: Date;
  commentId: string;
  replies: Comment[];
}

// Props for the ContentList Component
export interface ContentListProps {
  contents: Content[];
  onContentClick: (contentId: string) => void;
}

// Props for the ContentDetail Component
export interface ContentDetailProps {
  content: Content;
  onLike: (contentId: string) => void;
  onLove: (contentId: string) => void;
  onFire: (contentId: string) => void;
  onComment: (contentId: string, commentText: string) => void;
  onReply: (commentId: string, replyText: string) => void;
}

export type ReportReason = "spam" | "harassment" | "inappropriate" | "other";

export interface Report {
  id: string;
  reason: ReportReason;
  details?: string;
  reportedBy: string;
  createdAt: string;
}
// fetch achievement level
interface achievementresponse {
  id: string;
  userId: string;
  username: string;
  currentLevel: string;
  share_content_total: number;
  ask_question_total: number;
  answer_question_total: number;
  comment_total: number;
  interaction_total: number;
}
