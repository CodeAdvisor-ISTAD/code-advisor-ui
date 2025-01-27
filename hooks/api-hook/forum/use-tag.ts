import { useQuery } from "@tanstack/react-query"

async function fetchForumTags() {
        const response = await fetch("/forums/api/v1/tags");
        if(response.ok){
            const data = await response.json();
            return data;
        }else{
            return null;
        }
}

export const UseFetchForumTags = () => {
    return useQuery({
        queryKey: ["forumTags"],
        queryFn: fetchForumTags
    })
};