"use client";

import { CommentSection } from "@/components/engagement/comment/CommentSection";
import { ContentSection } from "@/components/engagement/content/ContentSection";
import { ContentSidebar } from "@/components/engagement/content/ContentSidebar";
import PrismLoader from "@/components/text-editor/prismLoader";
import { getContent } from "@/hooks/api-hook/content/content-api";
import { getComment } from "@/hooks/api-hook/engagement/engagement-api";
import { useUser } from "@/lib/context/userContext";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import Head from "next/head";
import { Metadata } from "next";



export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params); // Unwrap the params Promise
  const slug = resolvedParams.slug;
  const { user } = useUser();

  // Fetch content details using React Query
  const { data, isError, isLoading } = useQuery({
    queryKey: ["contentDetails", slug],
    queryFn: () => getContent(slug),
    enabled: !!slug, // Ensure query only runs when slug exists
  });

  // Destructure with default values
  const {
    contentId = "679f042faf0fca733f2edaf2",
    authorUUid = "author-67890",
    communityEngagement = { likeCount: 0, fireCount: 0, loveCount: 0 },
    bookmark = 0,
  } = data || {};

  const userId = user?.uuid || "6783b16f1b533f163cd7460d";
  const totalReactions =
    communityEngagement.likeCount +
    communityEngagement.fireCount +
    communityEngagement.loveCount;

  // Fetch comments by contentId
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ["comments", contentId], // Use unique key for comments
    queryFn: () => getComment(contentId), // Call the imported function
  });

  console.log("Comment list: ", comments);

  return (
    <>
      <Head>
        <title>{data?.title || "Default Title"}</title>
        <meta
          name="description"
          content={data?.content || "Default description for the page."}
        />
        <meta
          name="keywords"
          content={data?.keywords?.join(", ") || "default, keywords"}
        />
        <meta property="og:title" content={data?.title || "Default Title"} />
        <meta
          property="og:description"
          content={data?.content || "Default description for the page."}
        />
        <meta
          property="og:image"
          content={
            data?.thumbnail || "https://i.pinimg.com/736x/d0/e0/0d/d0e00dcece8115773e285495ef2e6949.jpg"
          }
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://code-advisors.istad.co/content/${slug}`}
        />
        {/* OpenGraph Tags (Facebook & LinkedIn) */}
        <meta property="og:title" content={data?.title} />
        <meta property="og:description" content={data?.description} />
        <meta property="og:image" content={data?.thumbnail} />
        <meta property="og:url" content={data?.url} />
        <meta property="og:type" content="article" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data?.title} />
        <meta name="twitter:description" content={data?.description} />
        <meta name="twitter:image" content={data?.image} />
        <meta name="twitter:site" content="@YourTwitterHandle" /> {/* Optional */}
        <meta name="twitter:creator" content="@AuthorTwitterHandle" /> {/* Optional */}

        {/* LinkedIn-Specific Tags */}
        <meta property="og:site_name" content="Your Site Name" />
        <meta property="article:author" content="Author Name" /> {/* Optional */}
        <meta property="article:published_time" content={data?.createdDate} /> {/* Optional */}
      </Head>
      <main className="flex mx-auto pb-4 bg-gray-100 dark:bg-darkPrimary w-full">
        <div className="w-full fixed bottom-0 md:bottom-auto flex items-center justify-center md:items-start md:justify-start px-[10px] md:px-[100px]">
          <ContentSidebar
            bookmark={bookmark}
            contentId={contentId}
            userId={userId}
            ownerId={authorUUid}
            slug={slug}
            totalReactions={totalReactions}
          />
        </div>
        <div className="px-[10px] md:pl-[100px]">
          <ContentSection
            thumbnail={data?.thumbnail}
            username={data?.username}
            title={data?.title}
            tags={data?.tag}
            reactions={data?.communityEngagement}
            description={data?.content}
            createdAt={data?.createdDate}
            slug={data?.slug} // Ensure you pass the correct slug
            keywords={data?.keywords ?? ""} // Pass your actual keywords if needed
            isDraft={false}
            isArchived={false}
            isDeleted={false}
            isLoading={isLoading}
          />
        </div>
        <CommentSection
          contentId={data?.contentId || contentId}
          ownerId={authorUUid}
          slug={slug}
          userId={userId}
          isLoading={isLoading}
        />

        <PrismLoader />
      </main>
    </>
  );
}