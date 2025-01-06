type CreateContentType = {
    title: string;
    content: string;
    thumbnail: string | null;
    slug: string;
    keywords: string;
    tags: string[];
    isDraft: boolean;
}

type ContentDetails = {
    authorUuid: string;
    title: string;
    content: string;
    thumbnail: string | null;
    slug: string;
    keywords: string;
    communityEngagement: Reactions
    tags: string[];
    isDraft: boolean;
    isArchived: boolean;
    isDeleted: boolean;
    createdAt: string;
}

type Reactions = {
    likeCount: number;
    loveCount: number;
    fireCount: number;
}

/*
        String title,

        String content, // or content

        String thumbnail,

        String keywords,

        String slug,

        List<String> tags,

        CommunityEngagement communityEngagement,

        Boolean isDraft,

        String authorId,

        LocalDateTime createdDate
*/