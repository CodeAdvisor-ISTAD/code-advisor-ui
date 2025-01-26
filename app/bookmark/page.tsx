"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import {
  fetchContentBookmark,
  getBookmarkContent,
} from "@/hooks/api-hook/user/bookmark";
import { ArticleCardBookmark } from "@/components/card-component/bookmark/article-card";

export default function BookmarkPage({ contentSlug }: { contentSlug: string }) {
  // Fetch bookmark data
  const { data: contentBookmarkData } = useQuery({
    queryKey: ["contentBookmark"],
    queryFn: () => fetchContentBookmark(),
  });

  // Get content all content slugs

  const contentSlugs = contentBookmarkData?.content?.map(
    (item: any) => item.contentSlug
  );
  
  // get content data by slug
  const { data: contentBookmarkBySlug } = useQuery({
    queryKey: ["contentBookmarkBySlug", contentSlugs],
    queryFn: () =>
      Promise.all(
        contentSlugs.map((slug: string) => getBookmarkContent(slug, 0, 10))
      ),
    enabled: !!contentSlugs?.length,
  });

  console.log("contentSlug:", contentBookmarkBySlug);
  return (
    <div className="h-screen container mx-auto max-w-5xl ml-[364px] mb-5 mt-[76px]">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold md:text-xl text-primary">Bookmark</h1>

        <Tabs defaultValue="article" className="w-full">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger
              value="article"
              className="text-primary flex-1 sm:flex-none"
            >
              Article
            </TabsTrigger>
            <TabsTrigger
              value="forum"
              className="text-primary flex-1 sm:flex-none"
            >
              Forum
            </TabsTrigger>
          </TabsList>

          <TabsContent value="article">
            <div className="grid grid-cols-1 gap-3">
              {contentBookmarkBySlug?.map((bookmark: any, index: number) => (
                <ArticleCardBookmark
                  key={index}
                  title={bookmark.title}
                  description={bookmark.description}
                  tags={bookmark.tags}
                  tags1={bookmark.tags1}
                  thumbnail={bookmark.thumbnail}
                  createdDate={bookmark.createdDate}
                  slug={bookmark.slug}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}