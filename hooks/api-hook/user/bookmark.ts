const addBookmark = async function createBookmaerk(bookmark) {
  const response = await fetch(`/users/api/v1/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookmark),
  });
  const data = await response.json();
  if(data.status === 409){
    unBookmarkForum(bookmark?.forumSlug);
  }
  if (response.ok) {
    return data;
  } else {
    throw data;
  }
};

const addContentBookmark = async function createBookmaerk(bookmark) {
  const response = await fetch(`/users/api/v1/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookmark),
  });
  const data = await response.json();
  if(data.status === 409){
    unBookmarkForum(bookmark?.contentSlug);
  }
  if (response.ok) {
    return data;
  } else {
    throw data;
  }
};

// unbookmark forum

const unBookmarkForum = async function unBookmarkForum(forumSlug: string) {
  const response = await fetch(`/users/api/v1/bookmarks/unBookmark?forumSlug=${forumSlug}`, {
    method: "GET",
  });
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw data;
  }
}

// unbookmark content


const checkBookmarkStatus = async (forumSlug: string) => {
  try {
    const response = await fetch(`/users/api/v1/bookmarks/status?forumSlug=${forumSlug}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return false;
  }
};

export { addBookmark , unBookmarkForum, checkBookmarkStatus };


// fetch content bookmark 
const fetchContentBookmark = async function fetchContentBookmark() {
  const response = await fetch(`/users/api/v1/bookmarks`);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw data;
  }
}
// fetch question data 
const fetchForumBookmark = async function fetchForumBookmark() {
  const response = await fetch(`/users/api/v1/bookmarks/forum`);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw data;
  }
}

// get bookmark question
// const getForumBookmark = async function getForumBookmark(slug: string, page: number, size: number) {
//   const response = await fetch(`/contents/api/v1/contents/slug/${slug}?page=${page}&size=${size}`);
//   const data = await response.json();

//   if (response.ok) {
//     return data;
//   } else {
//     throw data;
//   }
// }

// get bookmark content
const getBookmarkContent = async function getBookmarkContent(slug: string, page: number, size: number) {
  const response = await fetch(`/contents/api/v1/contents/slug/${slug}?page=${page}&size=${size}`);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw data;
  }
}
export { fetchContentBookmark, getBookmarkContent, addContentBookmark, fetchForumBookmark };
