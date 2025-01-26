import { useMutation } from "@tanstack/react-query";

const createForum = async function fetchPostForum(
  createForumData: CreateForumType
) {
  const response = await fetch("/forums/api/v1/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createForumData),
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    // Throw the error data so it can be caught by onError
    throw data;
  }
};

const getForumBySlug = async function fetchForumBySlug(slug: string) {
  const response = await fetch(`/forums/api/v1/questions/slug/${slug}`);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    // Throw the error data so it can be caught by onError
    throw data;
  }
};

const getAllForums = async function fetchAllForums() {
  const response = await fetch(`/forums/api/v1/questions`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
};

const checkIsUpVoted = async function checkIsUpVoted(slug: string) {
  const response = await fetch(
    `/forums/api/v1/votes/question/check-vote?slug=${slug}`
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
};

const upVoteQuestion = async function upVoteQuestion(slug: string) {
  const response = await fetch(
    `/forums/api/v1/votes/question/up-vote?slug=${slug}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
};

const downVoteQuestion = async function downVoteQuestion(slug: string) {
  const response = await fetch(
    `/forums/api/v1/votes/question/down-vote?slug=${slug}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
};

const totalUpVotes = async function getTotalUpVotes(slug: string) {
  const response = await fetch(
    `/forums/api/v1/votes/question/${slug}/total-up-votes`
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
};

const totalDownVotes = async function getTotalDownVotes(slug: string) {
  const response = await fetch(
    `/forums/api/v1/votes/question/${slug}/total-down-votes`
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
};

const commentOnForum = async function commentOnForum(
  CreateCommentData: CreateComment
) {
  const response = await fetch(`/forums/api/v1/answers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(CreateCommentData),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
};

const getAllAnswersByQuestion = async function fetchAllAnswersByQuestion(
  questionSlug: string
) {
  const response = await fetch(
    `/forums/api/v1/answers/${questionSlug}/question`
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

const acceptedAnswer = async function acceptAnswerOnForum(
  createdAnswerData: CreateAcceptedAnswerType
) {
  const response = await fetch(`/forums/api/v1/answers/accepted`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createdAnswerData),
  });
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    // Throw the error data so it can be caught by onError
    throw data;
  }
};

const unAcceptedAnswer = async function unAcceptAnswerOnForum(
  createdAnswerData: CreateAcceptedAnswerType
) {
  const response = await fetch(`/forums/api/v1/answers/un-accepted`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createdAnswerData),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
};

const deleteAnswer = async function deleteAnswerOnForum(answerUuid: string) {
  const response = await fetch(
    `/forums/api/v1/answers/${answerUuid}/soft-delete`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    // Throw the error data so it can be caught by onError
    throw data;
  }
};

const editAnswer = async function editAnswerOnForum(
  editAnswerData: EditAnswerType
) {
  const response = await fetch(`/forums/api/v1/answers`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editAnswerData),
  });
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    // Throw the error data so it can be caught by onError
    throw data;
  }
};

const totalAnswersByQuestion = async function getTotalAnswersByQuestion(
  questionSlug: string
) {
  const response = await fetch(`/forums/api/v1/answers/${questionSlug}/total`);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw data;
  }
};

const getQuestionByOwner = async function getQuestionByOwner(
  page: number,
  size: number
) {
  const response = await fetch(
    `/forums/api/v1/questions/owner?page=${page}&size=${size}`
  );
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw data;
  }
};

const getQuestionByAuthorName = async function getQuestionByAuthorName(
  authorName: string,
  page: number,
  size: number
) {
  const response = await fetch(
    `/forums/api/v1/questions/author/${authorName}?page=${page}&size=${size}`
  );
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw data;
  }
};

const voteAnwser = async function voteAnwserOnForum(answerUuid: string) {
  const response = await fetch(
    `/forums/api/v1/votes/answers?answerUuid=${answerUuid}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answerUuid),
    }
  );
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    // Throw the error data so it can be caught by onError
    throw data;
  }
};

const downVoteAnwser = async function unVoteAnwserOnForum(answerUuid: string) {
  const response = await fetch(
    `/forums/api/v1/votes/answers/down-vote?answerUuid=${answerUuid}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    // Throw the error data so it can be caught by onError
    throw data;
  }
};

const totalUpVotesAnswer = async function getTotalUpVotesAnswer(
  answerUuid: string
) {
  const response = await fetch(
    `/forums/api/v1/votes/answers/${answerUuid}/total-up-votes`
  );
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw data;
  }
};

const totalDownVotesAnswer = async function getTotalDownVotesAnswer(answerUuid: string) {
  const response = await fetch(
    `/forums/api/v1/votes/answers/${answerUuid}/total-down-votes`
  );
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw data;
  }
}

const checkUserIsVoteAnswer = async function checkUserIsVoteAnswer(answerUuid: string) {
  const response = await fetch(
    `/forums/api/v1/votes/answers/check-vote?answerUuid=${answerUuid}`
  );
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw data;
  }
};


export {
  totalDownVotesAnswer,
  totalUpVotesAnswer,
  checkUserIsVoteAnswer,
  voteAnwser,
  downVoteAnwser,
  getQuestionByAuthorName,
  getQuestionByOwner,
  totalAnswersByQuestion,
  editAnswer,
  deleteAnswer,
  acceptedAnswer,
  unAcceptedAnswer,
  getAllAnswersByQuestion,
  createForum,
  getForumBySlug,
  getAllForums,
  checkIsUpVoted,
  upVoteQuestion,
  downVoteQuestion,
  totalDownVotes,
  totalUpVotes,
  commentOnForum,
};
