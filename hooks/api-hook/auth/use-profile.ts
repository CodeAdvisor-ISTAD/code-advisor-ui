import { useQuery } from "@tanstack/react-query"

export async function fetchUserProfile() {
        const response = await fetch("/identity/api/v1/auth/me");
        if(response.ok){
            const data = await response.json();
            return data;
        }else{
            return null;
        }
}

