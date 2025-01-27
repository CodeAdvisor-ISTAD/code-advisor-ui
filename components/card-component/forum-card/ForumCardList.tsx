"use client";

import React, { useEffect, useState } from "react";
import { ForumCardComponent } from "./ForumCardComponent";
import TagComponent from "@/components/tag/tagComponent";
import { useSearch } from "@/lib/context/SearchContext";

export default function ForumCardList() {
    const { searchValue } = useSearch();
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    type ElasticResponse = {
        hits: {
            hits: ElasticQuestion[];
            total: {
                value: number;
            };
        };
    };

    // Updated fetch function for Elasticsearch
    const getAllForums = async (searchValue: string) => {
        try {
            const response = await fetch(
                `http://167.172.78.79:9200/forum.public.question/_search?q=${searchValue || "*"}`
            );
            if (response.ok) {
                const data: ElasticResponse = await response.json();
                // Transform Elasticsearch data to match your component's expected format
                const transformedData = {
                    content: data.hits.hits.map((hit) => ({
                        uuid: hit?._source?.after?.uuid,
                        title: hit?._source?.after?.title,
                        description: hit?._source?.after?.description,
                        slug: hit?._source?.after?.slug,
                        author_uuid: hit?._source?.after?.author_uuid,
                        created_at: hit?._source?.after?.created_at,
                        tags: [], // Add tags if available in your Elasticsearch data
                        is_archived: hit?._source?.after?.is_archived,
                        is_deleted: hit?._source?.after?.is_deleted,
                        author_username: hit?._source?.after?.author_username,
                    })),
                };
                return transformedData;
            } else {
                console.error("Failed to fetch forum data");
                throw new Error("Failed to fetch forum data");
            }
        } catch (error) {
            console.error("Error fetching forum data:", error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchForums = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const forumData = await getAllForums(searchValue);
                setData(forumData);
            } catch (err) {
                setError("Failed to load forums. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchForums();
    }, [searchValue]);

    if (isLoading) {
        return <div className="text-center mt-4">Loading forums...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">{error}</div>;
    }

    return (
        <div className="ml-[264px] w-full">
            <TagComponent />
            <div className="grid grid-cols-1 gap-2 max-w-7xl mx-auto">
                {data?.content?.length > 0 ? (
                    data.content.map((card: ForumCardType) => (
                        <ForumCardComponent key={card.uuid} forumCardData={card} />
                    ))
                ) : (
                    <div className="text-center mt-4">No forums found.</div>
                )}
            </div>
        </div>
    );
}
