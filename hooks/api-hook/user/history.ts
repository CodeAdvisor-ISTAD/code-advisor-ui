
const createHistory = async (history) => {
    const response = await fetch(`/users/api/v1/history`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(history)
    });
    const data = await response.json();
    
    if (response.ok) {
        return data;
    } else {
        throw data;
    }
}

export { createHistory };