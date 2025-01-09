import { useQuery } from "@tanstack/react-query"

async function fetchContentTags() {
        const response = await fetch("/contents/api/v1/tags/all");
        if(response.ok){
            const data = await response.json();
            return data;
        }else{
            return null;
        }
}

export const UseFetchContentTags = () => {
    return useQuery({
        queryKey: ["contentTags"],
        queryFn: fetchContentTags
    })
};