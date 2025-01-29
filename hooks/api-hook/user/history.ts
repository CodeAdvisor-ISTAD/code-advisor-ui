
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

// get history data
const getHistoryData = async function getHistoryData(slug: string, page: number, size: number) {
    const response = await fetch(`/contents/api/v1/contents/slug/${slug}?page=${page}&size=${size}`);
    const data = await response.json();
  
    if (response.ok) {
      return data;
    } else {
      throw data;
    }
  }

// get history data
const getHistory = async function getHistory() {
    const response = await fetch(`/users/api/v1/history`);
    const data = await response.json();
  
    if (response.ok) {
      return data;
    } else {
      throw data;
    }
  }
  
export { getHistory, getHistoryData };