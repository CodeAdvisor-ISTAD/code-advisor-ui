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
