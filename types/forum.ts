type CreateForumType = {
    title: string;
    slug: string;
    keywords: string;
    tagName: string[];
    introduction: string;
    expectedAnswers: string;
<<<<<<< HEAD
=======
    description: string;
>>>>>>> 74623ab8108269f38ea91e946d09845abe6a3721
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
<<<<<<< HEAD
    authorUuid: string;
=======
    author_uuid: string;
    author_username: string;
>>>>>>> 74623ab8108269f38ea91e946d09845abe6a3721
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

<<<<<<< HEAD
type ForumContent = ForumCardType[];
=======
type ForumContent = ForumCardType[];

type CreateComment = {
    questionSlug: string;
    answerUuid?: string;
    slug: string;
    content: string;
};

type CreateAcceptedAnswerType = {
    questionSlug: string,
    answerUuid: string,
}

type ErrorResponse = {
    error: {
      code: number;
      reason: string;
    }
  };

type EditAnswerType = {
    answerUuid: string;
    content: string;
}
>>>>>>> 74623ab8108269f38ea91e946d09845abe6a3721
