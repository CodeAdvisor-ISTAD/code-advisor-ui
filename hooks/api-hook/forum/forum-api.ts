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
    const response = await fetch(`/forums/api/v1/questions/slug/${slug}`);
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

const checkIsUpVoted = async function checkIsUpVoted(questionUuid: string) {
    const response = await fetch(`/forums/api/v1/votes/question/check-vote?questionUuid=${questionUuid}`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return null;
    }
}

const upVoteQuestion = async function voteQuestion(questionUuid: string) {
    const response = await fetch(`/forums/api/v1/votes/question/up-vote?questionUuid=${questionUuid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return null;
    }
}

const downVoteQuestion = async function voteQuestion(questionUuid: string) {
    const response = await fetch(`/forums/api/v1/votes/question/down-vote?questionUuid=${questionUuid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return null;
    }
}

const totalUpVotes = async function getTotalUpVotes(questionUuid: string) {
    const response = await fetch(`/forums/api/v1/votes/question/${questionUuid}/total-up-votes`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return null;
    }
}

const totalDownVotes = async function getTotalDownVotes(questionUuid: string) {
    const response = await fetch(`/forums/api/v1/votes/question/${questionUuid}/total-down-votes`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return null;
    }
}

export { createForum, getForumBySlug, getAllForums, checkIsUpVoted, upVoteQuestion, downVoteQuestion, totalDownVotes, totalUpVotes };
