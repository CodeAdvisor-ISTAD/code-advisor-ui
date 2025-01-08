type CreateForumType = {
    title: string;
    slug: string;
    keywords: string;
    tagName: string[];
    introduction: string;
    expectedAnswers: string;
    description: string;
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


type TagsType = {
    id: number;
    name: string;
}

type ForumCardType = {
    uuid: string;
    slug: string;
    authorUuid: string;
    title: string;
    description: string | null;
    expectedAnswers: string;
    tags: TagsType[];
    isDrafted: boolean;
    isArchived: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string | null;
}

type ForumContent = ForumCardType[];