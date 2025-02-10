"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import {
  fetchContentBookmark,
  fetchForumBookmark,
  getBookmarkContent,
} from "@/hooks/api-hook/user/bookmark";
import { ArticleCardBookmark } from "@/components/card-component/bookmark/articleCard";
import { BookmarkForumCard } from "@/components/card-component/bookmark/bookmarkForum";
import { getForumBySlug } from "@/hooks/api-hook/forum/forum-api";
import BookmarkEmptyComponent from "@/components/card-component/bookmark/BookmarkEmptyComponent";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
export default function BookmarkPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 2000);
  }, []);
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

  // const forumSlugs = contentBookmarkData?.content
  //   ?.map((item: any) => item.forumSlug)
  //   .filter((slug: string | null | undefined | "") => slug !== null);
  // console.log("forumSlugs:", forumSlugs);
  const forumSlugs = (contentBookmarkData?.content || [])
    .map((item: any) => item.forumSlug)
    .filter((slug: string | null | undefined) => slug && slug.trim() !== "");

  // get forum data by slug

  // const { data: forumBookmarkBySlug } = useQuery({
  //   queryKey: ["forumBookmarkBySlug", forumSlugs],
  //   queryFn: () =>
  //     Promise.all(forumSlugs.map((slug: string) => getForumBySlug(slug))),
  //   enabled: !!forumSlugs?.length, // Fix: Use forumSlugs instead of contentSlugs
  // });
  // console.log("forumBookmarkBySlug:", forumBookmarkBySlug);
  const { data: forumBookmarkBySlug } = useQuery({
    queryKey: ["forumBookmarkBySlug", forumSlugs],
    queryFn: async () => {
      if (!forumSlugs || forumSlugs.length === 0) return []; // Ensure no invalid fetch
      return Promise.all(forumSlugs.map((slug) => getForumBySlug(slug)));
    },
    enabled: Array.isArray(forumSlugs) && forumSlugs.length > 0, // Ensure it's always an array
  });

  return (
    <div className="w-full lg:pl-5 xl:px-3 px-2">
      {/* <div className="lg:col-span-1 md:col-span-3"></div> */}
      {!loading ? (
        <div className="">
          <h1 className="lg:text-3xl md:text-2xl text-xl font-bold py-3 ">
            កំណត់ត្រារបស់អ្នក
          </h1>
          <Tabs defaultValue="article" className="w-full mx-auto">
            <TabsList className="w-auto">
              <TabsTrigger
                value="article"
                className=" flex-1 sm:flex-none"
              >
                អត្ថបទ
              </TabsTrigger>
              <TabsTrigger
                value="forum"
                className=" flex-1 sm:flex-none"
              >
                សំនួរ-ចម្លើយ
              </TabsTrigger>
            </TabsList>
            {/* article */}
            <TabsContent value="article">
              <div className="grid grid-cols-1 gap-3">
                {(contentBookmarkBySlug?.length ?? 0) > 0 ? (
                  (contentBookmarkBySlug ?? []).map((bookmark: any, index: number) => (
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
                  ))
                ) : (
                  <BookmarkEmptyComponent />
                )}
              </div>
            </TabsContent>
            {/* forum */}
            {/* <TabsContent value="forum">
            <div className="grid grid-cols-1 gap-3 ">
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
          </TabsContent> */}
            <TabsContent value="forum">
              <div className="grid grid-cols-1 gap-3">
                {(forumBookmarkBySlug ?? []).length > 0 ? (
                  (forumBookmarkBySlug ?? []).map((bookmark: any, index: number) => (
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
                  ))
                ) : (
                  // <p className="text-gray-500">គ្មានសំនួរដែលបានចំណាំ</p>
                  <BookmarkEmptyComponent />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="lg:col-span-4 md:col-span-4">
          <Skeleton className="w-[250px] lg; lg:h-8 h-5 mt-2 "></Skeleton>
          <div defaultValue="article" className="w-full mx-auto">
            <Skeleton className="w-[200px] lg:h-7 h-4 mt-2"></Skeleton>
          </div>
          <Skeleton className="w-full lg:h-72 h-56 mt-2"></Skeleton>
        </div>
      )}
    </div>
  );
}
