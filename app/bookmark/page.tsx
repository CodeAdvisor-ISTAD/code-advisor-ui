"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import {
  fetchContentBookmark,
  fetchForumBookmark,
  getBookmarkContent,
} from "@/hooks/api-hook/user/bookmark";
import { ArticleCardBookmark } from "@/components/card-component/bookmark/article-card";
import { BookmarkForumCard } from "@/components/card-component/bookmark/bookmark-forum";
import { getForumBySlug } from "@/hooks/api-hook/forum/forum-api";
export default function BookmarkPage() {
  // Get content bookmark data
  const { data: contentBookmarkData } = useQuery({
    queryKey: ["contentBookmark"],
    queryFn: () => fetchContentBookmark(),
  });
  console.log("contentBookmarkData:", contentBookmarkData);
  // Get all slugs in bookmark
  const contentSlugs = contentBookmarkData?.content
    ?.map((item: any) => item.contentSlug)
    .filter((slug: string | null) => slug !== null);
  console.log("contentSlugs:", contentSlugs);
  // get content data by slug
  const { data: contentBookmarkBySlug } = useQuery({
    queryKey: ["contentBookmarkBySlug", contentSlugs],
    queryFn: () =>
      Promise.all(
        contentSlugs.map((slug: string) => getBookmarkContent(slug, 0, 10))
      ),
    enabled: !!contentSlugs?.length,
  });
  console.log("contentBookmarkBySlug:", contentBookmarkBySlug);
  // Get all slugs in bookmark
  const forumSlugs = contentBookmarkData?.content
    ?.map((item: any) => item.forumSlug)
    .filter((slug: string | null) => slug !== null);
  console.log("forumSlugs:", forumSlugs);
  // get forum data by slug
  const { data: forumBookmarkBySlug } = useQuery({
    queryKey: ["forumBookmarkBySlug", forumSlugs],
    queryFn: () =>
      Promise.all(forumSlugs.map((slug: string) => getForumBySlug(slug))),
    enabled: !!forumSlugs?.length, // Fix: Use forumSlugs instead of contentSlugs
  });
  console.log("forumBookmarkBySlug:", forumBookmarkBySlug);
  return (
    <div className="h-screen container mx-auto max-w-5xl ml-[385px] mb-5 mt-[76px]">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-primary py-3">
          កំណត់ត្រារបស់អ្នក
        </h1>
        <Tabs defaultValue="article" className="w-full">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger
              value="article"
              className="text-primary flex-1 sm:flex-none"
            >
              អត្ថបទ
            </TabsTrigger>
            <TabsTrigger
              value="forum"
              className="text-primary flex-1 sm:flex-none"
            >
              សំនួរ-ចម្លើយ
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
          <TabsContent value="forum">
            <div className="grid grid-cols-1 gap-3">
              {forumBookmarkBySlug?.map((bookmark: any, index: number) => (
                <BookmarkForumCard
                  key={index}
                  title={bookmark.title}
                  content={bookmark.content}
                  createdAt={bookmark.createdAt}
                  slug={bookmark.slug}
                  views={bookmark.views}
                  comments={0}
                  upvotes={0}
                  tags={[]}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
