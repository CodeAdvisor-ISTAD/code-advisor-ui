"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { getHistory, getHistoryData } from "@/hooks/api-hook/user/history";
import { useQuery } from "@tanstack/react-query";
import { HistoryItem } from "@/lib/reading";
import { ForumHistoryCard } from "@/components/card-component/history-card/forumHistoryCard";
import { getBookmarkContent } from "@/hooks/api-hook/user/bookmark";
import { ContentHistoryCard } from "@/components/card-component/history-card/contentHistoryCard";
import LoadingPage from "../loading";

// Function to group history items by createdAt
function groupByDate(items: HistoryItem[]) {
  const groups: { [key: string]: HistoryItem[] } = {};

  items.forEach((item) => {
    const createdAt = new Date(item.createdAt).toDateString(); // Use createdAt
    if (!groups[createdAt]) {
      groups[createdAt] = [];
    }
    groups[createdAt].push(item);
  });

  return groups;
}

export default function ReadingHistoryPage() {
  const { data: historyData, isLoading } = useQuery({
    queryKey: ["historyData"],
    queryFn: () => getHistory(),
  });

  console.log("historyData:", historyData);

  // Extract slugs from historyData
  const historySlugs = historyData
    ?.map((item: any) => item.contentSlug)
    .filter((slug: string | null) => slug !== null);

  // Fetch history data by slug
  const { data: historyBySlug } = useQuery({
    queryKey: ["forumHistoryBySlug", historySlugs],
    queryFn: () =>
      Promise.all(
        historySlugs.map((slug: string) => getHistoryData(slug, 0, 10))
      ),
    enabled: !!historySlugs?.length,
  });

  console.log("historyBySlug:", historyBySlug);

  // Get content data by slug
  const { data: contentHistoryBySlug } = useQuery({
    queryKey: ["contentHistoryBySlug", historySlugs],
    queryFn: () =>
      Promise.all(
        historySlugs.map((slug: string) => getBookmarkContent(slug, 0, 10))
      ),
    enabled: !!historySlugs?.length,
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleBookmark = (id: number) => {
    console.log("Bookmark:", id);
  };

  const handleRemove = (id: number) => {
    console.log("Remove:", id);
  };

  const handleShare = (id: number) => {
    console.log("Share:", id);
  };

  const handleTagClick = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleClearHistory = () => {
    setSelectedTags([]);
  };

  // Group history data by createdAt
  const groupedHistory = groupByDate(historyData || []);

  return (
    <div className="min-h-screen flex gap-6 pt-[72px] lg:pl-[364px] mb-20 no-scrollbar">
      <div className="w-[900px] p-2">
        <Tabs defaultValue="reading">
          <div>
            <h1 className="text-3xl font-bold text-primary py-3">
              ទិន្នន័យដែលអ្នកធ្លាប់បានអាន
            </h1>
          </div>
          <TabsContent value="search" className="m-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearHistory}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TabsContent>

          <TabsContent value="reading" className="space-y-6 ml-1">
            {/* <Input
              type="search"
              placeholder="Search reading history"
              className="max-w-4xl border-gray-300"
            /> */}
            {isLoading ? (
              <LoadingPage />
            ) : (
              Object.entries(groupedHistory).map(([date, items]) => (
                <div key={date} className="space-y-4 text-primary">
                  <h2 className="text-sm font-semibold">{date}</h2>
                  <div className="space-y-2">
                    {items.map((item: any, index: number) => {
                      // Find matching content history item
                      const matchingContent = contentHistoryBySlug?.find(
                        (content: any) =>
                          content.slug === item.contentSlug &&
                          new Date(content.createdAt).toDateString() === date
                      );
                      const matchingForum = historyBySlug?.find(
                        (forum: any) =>
                          forum.slug === item.contentSlug &&
                          new Date(forum.createdAt).toDateString() === date
                      );

                      return (
                        <>
                          <ForumHistoryCard
                            key={item.id}
                            upvotes={Number(item?.upvotes)}
                            onBookmark={() => handleBookmark(item.id)}
                            onRemove={() => handleRemove(item.id)}
                            onShare={() => handleShare(item.id)}
                            createdAt={item?.createdAt} // Use createdAt
                            title={item?.slug}
                            content={item?.content}
                            slug={item?.forumSlug || item?.contentSlug} // Use contentSlug
                            
                            tags={""} // comments={item?.comments}
                          />
                          {matchingContent && (
                            <ContentHistoryCard
                              key={matchingContent.id}
                              title={matchingContent?.slug}
                              description={matchingContent?.description}
                              tags={matchingContent?.tags}
                              tags1={matchingContent?.tags1}
                              thumbnail={matchingContent?.thumbnail}
                              createdDate={matchingContent?.createdAt} // Use createdAt
                              slug={matchingContent?.slug}
                            />
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}