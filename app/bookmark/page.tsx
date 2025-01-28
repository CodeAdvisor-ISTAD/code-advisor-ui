'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookmarkCard } from "@/components/card-component/bookmark/bookmark-card"
import { ArticleCard } from "@/components/card-component/bookmark/article-card"

const mockArticles = [
  {
    id: 1,
    title: "Top 5 JavaScript Features You're Not Using Enough",
    description: "In this blog post we'll learn about Dependency Injection (DI) and how to use it. We can do this using constructor and setter injection. Also...",
    image: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
    tags: ["#java", "#javascript", "#programming"],
    url: "/content/1"
  },
  {
    id: 2,
    title: "Docker Tutorial: Master Docker from Scratch",
    description: "In this blog post we'll learn about Dependency Injection (DI) and how to use it. We can do this using constructor and setter injection. Also...",
    image: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
    tags: ["#java", "#javascript", "#programming"],
    url: "/content/2"
  },
  {
    id: 3,
    title: "Docker Tutorial: Master Docker from Scratch",
    description: "In this blog post we'll learn about Dependency Injection (DI) and how to use it. We can do this using constructor and setter injection. Also...",
    image: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
    tags: ["#java", "#javascript", "#programming"],
    url: "/content/3"
  },
  {
    id: 4,
    title: "Docker Tutorial: Master Docker from Scratch",
    description: "In this blog post we'll learn about Dependency Injection (DI) and how to use it. We can do this using constructor and setter injection. Also...",
    image: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
    tags: ["#java", "#javascript", "#programming"],
    url: "/content/4"
  },
  {
    id: 5,
    title: "Top 5 JavaScript Features You're Not Using Enough",
    description: "In this blog post we'll learn about Dependency Injection (DI) and how to use it. We can do this using constructor and setter injection. Also...",
    image: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
    tags: ["java", "javascript", "programming"],
    isBookmarked: true
  },
  {
    id: 6,
    title: "Top 5 JavaScript Features You're Not Using Enough",
    description: "In this blog post we'll learn about Dependency Injection (DI) and how to use it. We can do this using constructor and setter injection. Also...",
    image: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
    tags: ["java", "javascript", "programming"],
    isBookmarked: true
  },
  {
    id: 5,
    title: "Top 5 JavaScript Features You're Not Using Enough",
    description: "In this blog post we'll learn about Dependency Injection (DI) and how to use it. We can do this using constructor and setter injection. Also...",
    image: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
    tags: ["java", "javascript", "programming"],
    isBookmarked: true
  },
  {
    id: 6,
    title: "Top 5 JavaScript Features You're Not Using Enough",
    description: "In this blog post we'll learn about Dependency Injection (DI) and how to use it. We can do this using constructor and setter injection. Also...",
    image: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
    tags: ["java", "javascript", "programming"],
    isBookmarked: true
  },
  // Add more mock articles as needed
]

const mockForumPosts = [
  {
    id: 1,
    author: {
      name: "Linuxoid",
      avatar: "/placeholder.svg"
    },
    title: "What is a difference between Java and JavaScript?",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum vitae etiam lectus amet enim.",
    tags: ["java", "javascript", "programming"],
    metrics: {
      views: 125,
      likes: 15,
      comments: 155
    },
    timeAgo: "25 min ago",
    url: "/forum/1"
  },
  // Add more mock forum posts as needed
]

export default function BookmarkPage() {
  const [articles, setArticles] = useState(mockArticles)
  const [forumPosts, setForumPosts] = useState(mockForumPosts)

  return (
    <div className="container mx-auto max-w-5xl ml-[364px] mb-5 mt-[76px]">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold md:text-xl text-primary">Bookmark</h1>
        
        <Tabs defaultValue="article" className="w-full">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="article" className="text-primary flex-1 sm:flex-none">Article</TabsTrigger>
            <TabsTrigger value="forum" className="text-primary flex-1 sm:flex-none">Forum</TabsTrigger>
          </TabsList>
          
          <TabsContent value="article">
            <div className="grid gap-2 sm:grid-cols-3">
              {articles.map((article) => (
                <a href={article.url} key={article.id}>
                  <ArticleCard
                    title={article.title}
                    description={article.description}
                    tags={article.tags}
                    thumbnail={article.image}
                    isBookmarked={true} // or false, depending on your logic
                    onToggleBookmark={() => {}} // provide the appropriate function
                  />
                </a>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="forum" className="space-y-4 h-screen">
            {forumPosts.map((post) => (
              <a href={post.url} key={post.id}>
                <BookmarkCard
                  author={post.author}
                  title={post.title}
                  description={post.description}
                  tags={post.tags}
                  metrics={post.metrics}
                  timeAgo={post.timeAgo}
                  isBookmarked={true} // or false, depending on your logic
                  onToggleBookmark={() => {}} // provide the appropriate function
                />
              </a>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}