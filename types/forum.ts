type CreateForumType = {
    title: string;
    slug: string;
    keywords: string;
    tagName: string[];
    introduction: string;
    expectedAnswers: string;
    isDrafted : boolean;
}

type ForumDetail = {
    uuid: string;
    authorUuid: string;
    title : string;
    introduction : string;
    expectedAnswers : string;
    isDrafted : boolean;
    isArchived : boolean;
    isDeleted : boolean;
    createdAt : string;
}