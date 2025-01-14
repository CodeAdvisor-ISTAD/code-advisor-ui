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