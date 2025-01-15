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

const getTagsByQuestionUuid = async (questionUuid: string) => {
    const response = await fetch(`/forums/api/v1/tags/question/${questionUuid}`);
    const data = await response.json();
    if(response.ok){     
        return data;
    }else{
        return null;
    }
}

export { getTagsByQuestionUuid };