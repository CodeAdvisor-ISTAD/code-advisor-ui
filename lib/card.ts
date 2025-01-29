interface CardData {
  id: string;
  title: string;
  content: string; // Use `content` instead of `description`
  tags: string[]; // Tags is an array of strings
  thumbnail: string; // Use `thumbnail` instead of `image`
  slug: string;
  communityEngagement: {
      likeCount: number;
      commentCount: number;
      reportCount: number;
      fireCount: number;
      loveCount: number;
      lastUpdated: number;
  };
  isDeleted: boolean;
  isDraft: boolean;
  author_uuid: string;
  created_date: string;
  last_modified_date: string;
}
export interface ForumCardType {
  id: string
  title: string
  description: string
  introduction: string
  slug: string
  is_deleted: boolean
  is_drafted: boolean
  author_uuid: string
  created_at: number
  last_modified_at: number
  author_username: string
  tags: { id: string; name: string }[] // Add tags if available in the API
}