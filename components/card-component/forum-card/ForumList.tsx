'use client'
import * as React from 'react'
import { ForumCardComponent } from './ForumCardComponent'

interface ForumCard {
    uuid: string;
    slug: string;
    author_uuid: string;
    author_username: string;
    title: string;
    description: string | null;
    expectedAnswers: string;
    tags: TagsType[];
    isDrafted: boolean;
    isArchived: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string | null;
}

interface CardListProps {
    searchQuery: string
}

export function ForumList({ searchQuery }: CardListProps) {
    const [cards, setCards] = React.useState<ForumCard[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://elastic.panda.engineer/forum.public.question/_search?q=*'
                );

                // Check if the response is OK (status code 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the JSON response
                const data = await response.json();
                const hits = data.hits.hits;

                const transformedCards = hits.map(hit => ({
                    uuid: hit?._source?.after?.uuid || '',
                    title: hit?._source?.after?.title || '',
                    description: hit?._source?.after?.description || null,
                    slug: hit?._source?.after?.slug || '',
                    author_uuid: hit?._source?.after?.author_uuid || '',
                    createdAt: hit?._source?.after?.created_at || '',
                    updatedAt: hit?._source?.after?.updated_at || null,
                    tags: hit?._source?.after?.tags || [], // Ensure tags are properly handled
                    isDrafted: hit?._source?.after?.is_drafted || false,
                    isArchived: hit?._source?.after?.is_archived || false,
                    isDeleted: hit?._source?.after?.is_deleted || false,
                    author_username: hit?._source?.after?.author_username || '',
                    expectedAnswers: hit?._source?.after?.expected_answers || ''
                }));

                setCards(transformedCards);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center py-4">Loading...</div>
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">Error: {error}</div>
    }

    const filteredCards = searchQuery
        ? cards.filter(
            (card) =>
                card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (card.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
                card.tags.some((tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : cards;

    // Slice the array to display only 6 cards
    const displayCards = filteredCards;

    return (
        <div className="">
            {displayCards.length === 0 ? (
                <p className="text-center"></p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                    {displayCards.map((card) => (
                        <ForumCardComponent key={card.slug} forumCardData={card} />
                    ))}
                </div>
            )}
        </div>
    )
}
