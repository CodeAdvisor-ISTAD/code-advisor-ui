import ISTADCard from "@/components/card-component/card-trending/Card-Istad";
import TrendingComponent from "@/components/card-component/card-trending/TrendingComponent";
import ForumCardList from "@/components/card-component/forum-card/ForumCardList";
import React from "react";

// Types for Elasticsearch response
 type ElasticQuestion = {
    _source: {
        after: {
            uuid: string;
            title: string;
            description: string;
            slug: string;
            author_uuid: string;
            created_at: number;
            is_archived: boolean;
            is_deleted: boolean;
            author_username: string;
        };
    };
};

export type ElasticResponse = {
    hits: {
        hits: ElasticQuestion[];
        total: {
            value: number;
        };
    };
};

// Updated fetch function for Elasticsearch
const getAllForums = async function fetchAllForums() {
    try {
        const response = await fetch(`https://elastic.panda.engineer/forum.public.question/_search?q=*&pretty=true`);
        if (response.ok) {
            const data: ElasticResponse = await response.json();
            // Transform Elasticsearch data to match your component's expected format
            const transformedData = {
                content: data.hits.hits.map(hit => ({
                    uuid: hit?._source.after?.uuid,
                    title: hit?._source.after?.title,
                    description: hit?._source?.after?.description,
                    slug: hit?._source?.after?.slug,
                    author_uuid: hit?._source?.after?.author_uuid,
                    created_at: hit?._source?.after?.created_at,
                    tags: [], // Add tags if available in your Elasticsearch data
                    is_archived: hit?._source?.after?.is_archived,
                    is_deleted: hit?._source?.after?.is_deleted,
                    author_username: hit?._source?.after?.author_username
                }))
            };
            return transformedData;
        } else {
            console.error('Failed to fetch forum data');
            return null;
        }
    } catch (error) {
        console.error('Error fetching forum data:', error);
        return null;
    }
};

export default async function Page() {
    const allForum = await getAllForums();

    const latest = [
        "Advanced CSS techniques for modern web design",
        "Learn Tailwind CSS for responsive layouts",
        "Master React state management with Redux",
    ];

    return (
        <main className="flex bg-gray-100 w-full lg:px-[100px] pb-6 pt-[80px] xs:px-[30px] md:px-[80px]">
            <ForumCardList forumCardData={allForum}/>
            <div className="flex flex-col ml-2 gap-2 ">
                <TrendingComponent type="Latest" item={latest} />
                <ISTADCard />
            </div>
        </main>
    );
}