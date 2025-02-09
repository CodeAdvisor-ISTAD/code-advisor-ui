"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  formatKhmerDate,
  getForumDataHistory,
  getHistory,
} from "@/hooks/api-hook/user/history";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { HistoryItem } from "@/lib/reading";
import { HistoryFroumCardComponent } from "@/components/card-component/history-card/HistoryForumCardComponent";
import { getBookmarkContent } from "@/hooks/api-hook/user/bookmark";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import BookmarkEmptyComponent from "@/components/card-component/bookmark/BookmarkEmptyComponent";
import { HistoryContentCardComponent } from "@/components/card-component/history-card/HistoryContentCardComponent";

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

const disableHistoryItem = async (id: string) => {
  try {
    const response = await fetch(`/users/api/v1/history/${id}/disable`, {
      method: "PATCH",
    });

    // Check if response has content before parsing JSON
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // If the server returns 200 (No Content), return null
    if (response.status === 200) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error disabling history item:", error);
    throw error;
  }
};

export default function ReadingHistoryPage() {
  const queryClient = useQueryClient();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Fetch history data
  const { data: historyData } = useQuery({
    queryKey: ["historyData"],
    queryFn: () => getHistory(),
  });

  // console.log("historyData:", historyData);

  // // Extract slugs from historyData
  // const historySlugs = historyData
  //   ?.map((item: any) => item.contentSlug)
  //   .filter((slug: string | null) => slug !== null);

  // // Fetch history data by slug
  // const { data: historyBySlug } = useQuery({
  //   queryKey: ["forumHistoryBySlug", historySlugs],
  //   queryFn: () =>
  //     Promise.all(
  //       historySlugs.map((slug: string) => getHistoryData(slug, 0, 10))
  //     ),
  //   enabled: !!historySlugs?.length,
  // });

  // console.log("historyBySlug:", historyBySlug);

  // // Get content data by slug
  // const { data: contentHistoryBySlug } = useQuery({
  //   queryKey: ["contentHistoryBySlug", historySlugs],
  //   queryFn: () =>
  //     Promise.all(
  //       historySlugs.map((slug: string) => getBookmarkContent(slug, 0, 10))
  //     ),
  //   enabled: !!historySlugs?.length,
  // });

  // Handle remove action

  // Extract content & forum slugs separately
  const contentSlugs = historyData
    ?.map((item: any) => item.contentSlug)
    .filter((slug: string | null) => slug !== null);

  const forumSlugs = historyData
    ?.map((item: any) => item.forumSlug)
    .filter((slug: string | null) => slug !== null);

  // Fetch content data by slug
  const { data: contentHistoryBySlug } = useQuery({
    queryKey: ["contentHistoryBySlug", contentSlugs],
    queryFn: () =>
      Promise.all(
        contentSlugs.map((slug: string) => getBookmarkContent(slug, 0, 10))
      ),
    enabled: !!contentSlugs?.length,
  });

  // Fetch forum data by slug
  const { data: forumHistoryBySlug } = useQuery({
    queryKey: ["forumHistoryBySlug", forumSlugs],
    queryFn: () =>
      Promise.all(
        forumSlugs.map((slug: string) => getForumDataHistory(slug, 0, 10))
      ),
    enabled: !!forumSlugs?.length,
  });
  console.log("forumHistoryBySlug:", forumHistoryBySlug);

  // Handle remove action
  const handleRemove = async (id: string) => {
    try {
      // Optimistically update UI
      queryClient.setQueryData(["historyData"], (oldData: any) => {
        if (!oldData) return [];
        return oldData.filter((item: any) => item.id !== id); // Remove item locally
      });

      // Send request to disable item
      await disableHistoryItem(id);
      console.log("History item disabled:", id);

      // Refetch history data to ensure consistency
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
      const url = `${window.location.origin}/${
        item.forumSlug ? "forum" : "content"
      }/${slug}`;
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

  // Handle clear history
  const handleClearHistory = () => {
    setSelectedTags([]);
  };

  // Group history data by createdAt
  const groupedHistory = groupByDate(historyData || []);

  return (
    <div className="w-full">
      {/* <div className="md:col-span-3 lg:col-span-1"></div> */}
      <div className="w-full xl:p-4 lg:pl-4 px-3">
        {loading ? (
          <div className="lg:col-span-4 md:col-span-4 ">
            {/* Loading Skeleton 1 */}
            <Skeleton className="lg:w-[275px] md:w-[300px] w-[200px]  lg:h-8 md:h-9 h-6 mt-2 "></Skeleton>
            <Skeleton className="lg:w-[250px] md:w-[275px] w-[175px] lg:h-6 md:h-7 h-5 mt-2 "></Skeleton>
            <Skeleton className="w-full lg:h-32 md:h-36 h-16 mt-2 "></Skeleton>
            {/* Loading Skeleton 2 */}
            <Skeleton className="lg:w-[250px] md:w-[275px] w-[175px] lg:h-6 md:h-7 h-5 mt-2 "></Skeleton>
            <Skeleton className="w-full lg:h-32 md:h-36 h-16 mt-2 "></Skeleton>
            {/* Loading Skeleton 3 */}
            <Skeleton className="lg:w-[250px] md:w-[275px] w-[175px] lg:h-6 md:h-7 h-5 mt-2 "></Skeleton>
            <Skeleton className="w-full lg:h-32 md:h-36 h-16 mt-2 "></Skeleton>
            {/* Loading Skeleton 4 */}
            <Skeleton className="lg:w-[250px] md:w-[275px] w-[175px] lg:h-6 md:h-7 h-5 mt-2 "></Skeleton>
            <Skeleton className="w-full lg:h-32 md:h-36 h-16 mt-2 "></Skeleton>
            {/* Loading Skeleton 5 */}
            <Skeleton className="lg:w-[250px] md:w-[275px] w-[175px] lg:h-6 md:h-7 h-5 mt-2 "></Skeleton>
            <Skeleton className="w-full lg:h-32 md:h-36 h-16 mt-2 "></Skeleton>
            {/* Loading Skeleton 6 */}
            <Skeleton className="lg:w-[250px] md:w-[275px] w-[175px] lg:h-6 md:h-7 h-5 mt-2 "></Skeleton>
            <Skeleton className="w-full lg:h-32 md:h-36 h-16 mt-2 "></Skeleton>
            {/* Loading Skeleton 7 */}
            <Skeleton className="lg:w-[250px] md:w-[275px] w-[175px] lg:h-6 md:h-7 h-5 mt-2 "></Skeleton>
            <Skeleton className="w-full lg:h-32 md:h-36 h-16 mt-2 "></Skeleton>
          </div>
        ) : (
          <Tabs defaultValue="reading">
            <div>
              <h1 className="lg:text-3xl md:text-2xl text-xl font-bold py-3">
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
              {Object.entries(groupedHistory).length > 0 ? (
                Object.entries(groupedHistory).map(([date, items]) => (
                  <div key={date} className="space-y-4">
                    <h2 className="lg:text-sm md:text-sm text-xs font-semibold">
                      {formatKhmerDate(date)}
                    </h2>
                    <div className="space-y-2">
                      {items.map((item: any) => {
                        const matchingContent = contentHistoryBySlug?.find(
                          (content: any) => content.slug === item.contentSlug
                        );

                        const matchingForum = forumHistoryBySlug?.find(
                          (forum: any) => forum.slug === item.forumSlug
                        );

                        return (
                          <div key={item.id}>
                            {matchingForum && (
                              <HistoryFroumCardComponent
                                upvotes={Number(matchingForum?.upvotes)}
                                onRemove={() => handleRemove(item.id)}
                                onShare={() => handleShare(item.id)}
                                createdAt={matchingForum?.createdAt}
                                title={matchingForum?.title}
                                content={matchingForum?.content}
                                slug={matchingForum?.slug}
                                tags={""}
                              />
                            )}
                            {matchingContent && (
                              <HistoryContentCardComponent
                                upvotes={Number(matchingContent?.upvotes)}
                                onRemove={() => handleRemove(item.id)}
                                onShare={() => handleShare(item.id)}
                                createdAt={matchingContent?.createdDate}
                                title={matchingContent?.title}
                                content={matchingContent?.content}
                                slug={matchingContent?.slug}
                                tags={""}
                                thumbnail={""}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <BookmarkEmptyComponent />
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
