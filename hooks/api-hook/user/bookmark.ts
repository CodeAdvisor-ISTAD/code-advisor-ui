const addBookmark = async function createBookmaerk(bookmark) {
  const response = await fetch(`/users/api/v1/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookmark),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
};

const checkBookmark = async function checkBookmark(
  forumSlug: string 
) {
  const response = await fetch(
    `/users/api/v1/bookmarks/check-bookmark?forumSlug=${forumSlug}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw data;
  }
};

export { addBookmark, checkBookmark };
