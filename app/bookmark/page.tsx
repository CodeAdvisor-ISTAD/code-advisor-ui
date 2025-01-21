"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookmarkCard } from "@/components/card-component/bookmark/bookmark-card";
import { ArticleCard } from "@/components/card-component/bookmark/article-card";
import { useQuery } from "@tanstack/react-query";
import { getBookmarkedContent } from "@/hooks/api-hook/content/content-api";
import { getContentByAuthorUuid } from "@/hooks/api-hook/content/content-api";

export default function BookmarkPage({ authorUuid }: { authorUuid: string }) {
  const [articles, setArticles] = useState<any[]>([]);
  const [forumPosts, setForumPosts] = useState<any[]>([]);
  const [filteredContentData, setFilteredContentData] = useState<any[]>([]);

  // Fetch bookmarked content
  const { data: contentBookmark } = useQuery({
    queryKey: ["ContentBookmark"],
    queryFn: () => getBookmarkedContent(),
  });

  // Fetch content by author UUID
  const { data: contentData } = useQuery({
    queryKey: ["ContentOwner"],
    queryFn: () => getContentByAuthorUuid(authorUuid, 0, 10),
  });

  // Combine and filter articles that are bookmarked
  useEffect(() => {
    if (contentData) {
      setFilteredContentData(contentData.content);
    }
    if (contentBookmark && contentData) {
      const bookmarkedArticles = contentData.filter((content: any) =>
        contentBookmark.some(
          (bookmark: any) =>
            bookmark.id === content.id && bookmark.type === "article"
        )
      );
      setArticles(bookmarkedArticles);

      const bookmarkedForumPosts = contentData.filter((content: any) =>
        contentBookmark.some(
          (bookmark: any) =>
            bookmark.id === content.id && bookmark.type === "forum"
        )
      );
      setForumPosts(bookmarkedForumPosts);
    }
  }, [contentBookmark, contentData]);

  const handleToggleArticleBookmark = (id: number) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === id
          ? { ...article, isBookmarked: !article.isBookmarked }
          : article
      )
    );
  };

  const handleToggleForumPostBookmark = (id: number) => {
    setForumPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, isBookmarked: !post.isBookmarked } : post
      )
    );
  };

  return (
    <><div className="container mx-auto max-w-5xl ml-[364px] mb-5 mt-[76px] h-screen"></div><div className="space-y-2">
      <h1 className="text-2xl font-bold md:text-xl text-primary">
        កំណត់ចំណាំ
      </h1>

      <Tabs defaultValue="article" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger
            value="article"
            className="text-primary flex-1 sm:flex-none"
          >
            មាតិកា
          </TabsTrigger>
          <TabsTrigger
            value="forum"
            className="text-primary flex-1 sm:flex-none"
          >
            សំណួរ-ចម្លើយ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="article">
          {contentBookmark && contentData ? (
            articles.length > 0 ? (
              <div className="grid gap-2 sm:grid-cols-3">
                {articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    id={article.authorUuid}
                    title={article.title}
                    description={article.description}
                    tags={article.tags}
                    image={article.thumbnail}
                    onToggleBookmark={() => handleToggleArticleBookmark(article.id)}
                    tags1={""}
                    created_date={article.created_date} />
                ))}
              </div>
            ) : (
              <p>No bookmarked articles found.</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </TabsContent>

        <TabsContent value="forum" className="space-y-4 h-screen">
          {forumPosts.length > 0 ? (
            forumPosts.map((post) => (
              <BookmarkCard
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.description}
                tags={post.tags}
                image={post.thumbnail}
                tags1={""}
                created_date={""} />
            ))
          ) : (
            <p>No bookmarked forum posts found.</p>
          )}
        </TabsContent>
      </Tabs>
    </div></>
  );
}
