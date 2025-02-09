"use client";

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { getHistory, getHistoryData } from "@/hooks/api-hook/user/history";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { HistoryItem } from "@/lib/reading";
import { ForumHistoryCard } from "@/components/card-component/history-card/forumHistoryCard";
import { getBookmarkContent } from "@/hooks/api-hook/user/bookmark";
import toast from "react-hot-toast";

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

// Function to disable a history item via API
const disableHistoryItem = async (id: string) => {
  try {
    const response = await fetch(`/users/api/v1/history/${id}/disable`, {
      method: "PATCH",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error disabling history item:", error);
    throw error;
  }
};

export default function ReadingHistoryPage() {
  const queryClient = useQueryClient();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Fetch history data
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

  // Handle remove action
  const handleRemove = async (id: string) => {
    try {
      await disableHistoryItem(id);
      console.log("History item disabled:", id);

      // Refetch history data to update the UI
      queryClient.invalidateQueries({ queryKey: ["historyData"] });
    } catch (error) {
      console.error("Failed to disable history item:", error);
    }
  };

  // Handle share action
  const handleShare = async (id: string) => {
    try {
      const item = historyData.find((item: any) => item.id === id);
      const slug = item?.forumSlug || item?.contentSlug;
      if (!slug) {
        throw new Error("Slug not found");
      }
      const url = `${window.location.origin}/${item.forumSlug ? 'forum' : 'content'}/${slug}`;
      // Copy the specific URL to the clipboard
      await navigator.clipboard.writeText(url);
      // Show a success toast
      toast.success("អ្នកបានចម្លង url post នេះបានដោយជោគជ័យ");
    } catch (error) {
      // Handle errors (e.g., if the clipboard API is not supported)
      console.error("Failed to copy URL:", error);
      toast.error("Failed to copy URL");
    }
  };

  // Handle tag click
  const handleTagClick = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Handle clear history
  const handleClearHistory = () => {
    setSelectedTags([]);
  };

  // Group history data by createdAt
  const groupedHistory = groupByDate(historyData || []);

  return (
    <div className=" h-screen mx-auto w-full  mb-5 px-2">
      <div className="w-full p-4 md:col-span-4 lg:col-span-4">
        <Tabs defaultValue="reading">
          <div>
            <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-primary py-3">
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
            {isLoading ? (
                <p>Loading...</p>
            ) : (
              Object.entries(groupedHistory).map(([date, items]) => (
                <div key={date} className="space-y-4 text-primary">
                  <h2 className="lg:text-sm md:text-sm text-xs font-semibold">{date}</h2>
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
                            onRemove={() => handleRemove(item.id)} // Pass the handleRemove function
                            onShare={() => handleShare(item.id)}
                            createdAt={item?.createdAt}
                            title={item?.slug}
                            content={item?.content}
                            slug={item?.forumSlug || item?.contentSlug}
                            tags={""}
                          />
                          {matchingContent && (
                            <ForumHistoryCard
                              key={matchingContent.id}
                              upvotes={Number(matchingContent?.upvotes)}
                              onRemove={() =>
                                handleRemove(matchingContent.id) // Pass the handleRemove function
                              }
                              onShare={() =>
                                handleShare(matchingContent.id)
                              }
                              createdAt={matchingContent?.createdAt}
                              title={matchingContent?.slug}
                              content={matchingContent?.content}
                              slug={matchingContent?.slug}
                              tags={""}
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
