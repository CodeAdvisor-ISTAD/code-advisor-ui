"use client";

import * as React from "react";
import { CardComponent } from "./CardComponent";

interface CardData {
  id: string;
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
  slug: string;
  communityEngagement: {
    likeCount: number;
    commentCount: number;
    reportCount: number;
    fireCount: number;
    loveCount: number;
    lastUpdated: number;
  };
  isDeleted: boolean;
  isDraft: boolean;
  author_uuid: string;
  created_date: string;
  last_modified_date: string;
}

interface CardListProps {
  searchQuery: string;
}

export function CardList({ searchQuery }: CardListProps) {
  const [cards, setCards] = React.useState<CardData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://elastic.panda.engineer/content-service.contents/_search?q=*&pretty=true"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const hits = data.hits.hits;

        // Transform the Elasticsearch response into the CardData format
        const transformedCards = hits.map((hit: any) => ({
          id: hit._id,
          title: hit._source.title,
          content: hit._source.content,
          tags: hit._source.tags,
          thumbnail: hit._source.thumbnail,
          slug: hit._source.slug,
          communityEngagement: hit._source.communityEngagement,
          isDeleted: hit._source.isDeleted,
          isDraft: hit._source.isDraft,
          author_uuid: hit._source.author_uuid,
          created_date: hit._source.created_date,
          last_modified_date: hit._source.last_modified_date,
        }));

        setCards(transformedCards);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (loading) {
  //   return <div className="text-center py-4">Loading...</div>
  // }

  // if (error) {
  //   return <div className="text-center py-4 text-red-500">Error: {error}</div>
  // }

  const filteredCards = searchQuery
    ? cards.filter(
        (card) =>
          card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : cards;

  // Slice the array to display only 4 cards
  const displayCards = (searchQuery ? filteredCards : cards).slice(0, 10);

  return (
    <div className="w-full">
      {displayCards.length === 0 ? (
        <p className="text-center py-4 text-gray-500">No results found</p>
      ) : (
        <div className="px-2 grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-2 gap-2">
          {displayCards.map((card) => (
            <CardComponent key={card.id} {...card} />
          ))}
        </div>
      )}
    </div>
  );
}
