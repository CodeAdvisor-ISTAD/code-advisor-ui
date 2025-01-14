export interface badge  {
    id: string;
    userId: string;
    badgeName: string;
    badgeImage: "string"
}


export async function fetchBadge() {
    const response = await fetch("/users/api/v1/achievement_badges/ITE");
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return null;
    }
}