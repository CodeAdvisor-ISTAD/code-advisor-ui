import ISTADCard from "@/components/card-component/card-trending/Card-Istad";
import TrendingComponent from "@/components/card-component/card-trending/TrendingComponent";
import ForumCardList from "@/components/card-component/forum-card/ForumCardList";
import React from "react";

// Types for Elasticsearch response
// export type ElasticQuestion = {
//     uuid: string;
//     title: string;
//     description: string;
//     slug: string;
//     author_uuid: string;
//     author_username: string;
//     created_at: number;
//     is_archived: boolean;
//     is_deleted: boolean;
// };

// export type ElasticResponse = {
//     hits: {
//         hits: { _source: ElasticQuestion }[];
//         total: { value: number };
//     };
// };


const getAllForums = async function fetchAllForums() {
    try {
        const response = await fetch(`https://elastic.panda.engineer/forum.public.question/_search?q=*&pretty=true`);
        if (response.ok) {
            const data: any = await response.json();
            
            // Transforming Elasticsearch response
            const transformedData = {
                content: data.hits.hits.map(hit => ({
                    uuid: hit?._source?.after_id.toString(),
                    title: hit?._source?.after_title,
                    description: hit?._source?.after_description,
                    slug: hit?._source?.after_slug,
                    author_uuid: hit?._source?.after_author_uuid,
                    created_at: hit?._source?.after_created_at,
                    tags: [], // No tags available in the response
                    is_archived: hit?._source?.after_is_archived,
                    is_deleted: hit?._source?.after_is_deleted,
                    author_username: hit?._source?.after_author_username
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
        <main className="flex w-full lg:px-[100px] pb-6 pt-[80px] xs:px-[30px] md:px-[80px]">
            <ForumCardList forumCardData={allForum}/>
            <div className="flex flex-col ml-2 gap-2 ">
                <TrendingComponent type="Latest" item={latest} />
                <ISTADCard />
            </div>
        </main>
    );
}