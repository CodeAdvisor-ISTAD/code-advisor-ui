

export async function fetchBadge(userId: string) {
    const response = await fetch(`/users/api/v1/achievement_badges/user/${userId}`);
    if (response.ok) {
        const data = await response.json();
        console.log("dataBadge", data);
        return data;
    } else {
        return null;
    }
}
