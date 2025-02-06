export interface badge  {
    id: string;
    userId: string;
    badgeName: string;
    badgeImage: "string"
}


export async function fetchBadge(badge: any) {
    const response = await fetch("/users/api/v1/achievement_badges/CodeAdvisors' developer");
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return null;
    }
}