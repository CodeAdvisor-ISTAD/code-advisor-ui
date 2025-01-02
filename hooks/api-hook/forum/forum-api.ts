import { useMutation } from "@tanstack/react-query"

const createForum =  async function fetchPostForum(createForumData : CreateForumType) {
        const response = await fetch("/forums/api/v1/questions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createForumData),
        }); 
        if(response.ok){
            const data = await response.json();
            return data;
        }
}

const getForumBySlug = async function fetchForumBySlug(slug: string) {
    const response = await fetch(`/forums/api/v1/questions/${slug}`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return null;
    }
}

const getAllForums = async function fetchAllForums() {
    const response = await fetch(`/forums/api/v1/questions`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return null;
    }
}

export { createForum, getForumBySlug };
