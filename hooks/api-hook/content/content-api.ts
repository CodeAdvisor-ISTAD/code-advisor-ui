import { useMutation } from "@tanstack/react-query"

const createContent =  async function fetchPostContent(createContent : CreateContentType) {
        const response = await fetch("/contents/api/v1/contents/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createContent),
        }); 
        if(response.ok){
            const data = await response.json();
            return data;
        }
}

const getContent = async function fetchContentBySlug(slug: string) {
    const response = await fetch(`/contents/api/v1/contents/slug/${slug}`);
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

export { createContent, getContent, getAllForums };
