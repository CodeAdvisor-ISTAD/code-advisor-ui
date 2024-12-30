import { useQuery } from "@tanstack/react-query"

async function fetchUserProfile() {
        const response = await fetch("/profile");
        if(response.ok){
            const data = await response.json();
            return data;
        }else{
            return null;
        }
}

export const UseFetchProfile = () => {
    return useQuery({
        queryKey: ["userProfile"],
        queryFn: fetchUserProfile
    })
};