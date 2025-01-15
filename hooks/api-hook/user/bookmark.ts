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
    
}

export { addBookmark };