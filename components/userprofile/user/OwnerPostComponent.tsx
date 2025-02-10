import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/userprofile/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/userprofile/select";
import { Command } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { CardForumComponent } from "@/components/forum-component/CardForumComponent";
import EmptyCard from "./OwnerEmptyCardComponent";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getQuestionByAuthorName,
  totalAnswersByQuestion,
  totalUpVotes,
} from "@/hooks/api-hook/forum/forum-api";
import { AuthorCardComponent } from "@/components/content-component/AuthorCardComponent";
import { getContentByAuthorUuid } from "@/hooks/api-hook/content/content-api";
import OwnerEmptyCard from "./OwnerEmptyCardComponent";

export default function OwnerPost({
  username,
  authorUuid,
}: {
  username: string;
  authorUuid: string;
}) {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filteredContentData, setFilteredContentData] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("4"); // Default to "All"

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const { data: forumData } = useQuery({
    queryKey: ["ForumOwner"],
    queryFn: () => getQuestionByAuthorName(username, 0, 10),
  });

  const { data: contentData, refetch: refetchDataContent } = useQuery({
    queryKey: ["ContentOwner"],
    queryFn: () => getContentByAuthorUuid(authorUuid, 0, 10),
  });

  const filterDataByDate = (data: any[], dateField: string) => {
    const currentDate = new Date();
    switch (selectedFilter) {
      case "1": // Last 7 days
        return data.filter((item) => {
          const itemDate = new Date(item[dateField]);
          return (
            currentDate.getTime() - itemDate.getTime() <=
            7 * 24 * 60 * 60 * 1000
          );
        });
      case "2": // Last 1 month
        return data.filter((item) => {
          const itemDate = new Date(item[dateField]);
          return (
            currentDate.getTime() - itemDate.getTime() <=
            30 * 24 * 60 * 60 * 1000
          );
        });
      case "3": // Last 6 months
        return data.filter((item) => {
          const itemDate = new Date(item[dateField]);
          return (
            currentDate.getTime() - itemDate.getTime() <=
            6 * 30 * 24 * 60 * 60 * 1000
          );
        });
      case "4": // All
      default:
        return data;
    }
  };

  useEffect(() => {
    if (forumData) {
      const filteredForums = filterDataByDate(forumData.content, "createdAt");
      setFilteredData(filteredForums);
    }

    if (contentData) {
      const filteredContent = filterDataByDate(
        contentData.content,
        "createdDate"
      );
      setFilteredContentData(filteredContent);
    }
  }, [forumData, contentData, selectedFilter]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter forum data by title and date
    if (forumData?.content) {
      const filteredForums = filterDataByDate(
        forumData.content,
        "createdAt"
      ).filter((card: any) => card.title.toLowerCase().includes(query));
      setFilteredData(filteredForums);
    }

    // Filter content data by title and date
    if (contentData?.content) {
      const filteredContent = filterDataByDate(
        contentData.content,
        "createdDate"
      ).filter((content: any) => content.title.toLowerCase().includes(query));
      setFilteredContentData(filteredContent);
    }
  };

  const upvoteQueries = useQueries({
    queries: (filteredData ?? []).map((forum) => ({
      queryKey: ["totalUpVotes", forum.slug],
      queryFn: () => totalUpVotes(forum.slug),
      enabled: !!forum.slug,
    })),
  });

  const totalAnswer = useQueries({
    queries: (filteredData ?? []).map((forum) => ({
      queryKey: ["totalAnswers", forum.slug],
      queryFn: () => totalAnswersByQuestion(forum.slug),
      enabled: !!forum.slug,
    })),
  });

  return (
    <div className="lg:mt-[95px] mt-[25px]">
      <Tabs defaultValue="forum">
        <TabsList>
          <TabsTrigger value="forum">សំនួររបស់អ្នក</TabsTrigger>
          <TabsTrigger
            value="content"
            onClick={() => {
              refetchDataContent();
            }}
          >
            មាតិការបស់អ្នក
          </TabsTrigger>
        </TabsList>
        <div className="flex space-x-2 pt-1 pb-0.5">
          <Command className="border h-9 rounded-lg">
            <Input
              type="text"
              placeholder="ស្វែងរកទៅតាមចំណងជើង"
              className="h-9 px-4 text-sm border rounded-md"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Command>
          <Select onValueChange={(value) => setSelectedFilter(value)}>
            <SelectTrigger className="text-start h-9 rounded-lg w-[250px]">
              <SelectValue placeholder="កាលបរិច្ឆេទ"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="rounded-sm">
                <SelectItem value="1">៧ ថ្ងៃចុងក្រោយ</SelectItem>
                <SelectItem value="2">១ ខែចុងក្រោយ</SelectItem>
                <SelectItem value="3">៦ ខែចុងក្រោយ</SelectItem>
                <SelectItem value="4">ទាំងអស់</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <TabsContent value="forum">
          <div className="grid grid-cols-1 w-full gap-2 max-w-7xl mx-auto">
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((card: any, index: number) => (
                <CardForumComponent
                  key={`${card.id}-${index}`}
                  slug={card.slug}
                  timestamp={card.createdAt}
                  title={card.title}
                  content={card.description}
                  views={card.views}
                  comments={totalAnswer[index]?.data?.total ?? card.comments}
                  upvotes={
                    upvoteQueries[index]?.data?.totalVotes ?? card.upvotes
                  }
                />
              ))
            ) : (
              <OwnerEmptyCard />
            )}
          </div>
        </TabsContent>
        <TabsContent value="content">
          <div className="grid grid-cols-1 w-full gap-2 max-w-7xl mx-auto pb-2">
            {filteredContentData && filteredContentData.length > 0 ? (
              filteredContentData.map((content: any, index: number) => (
                <AuthorCardComponent
                  key={`${content.id}-${index}`}
                  id={content.id}
                  slug={content.slug}
                  authorUuid={content.authorUuid}
                  title={content.title}
                  description={content.description}
                  tags={content.tags}
                  tags1={content.tags1}
                  image={content.thumbnail}
                  created_date={new Date(content.createdDate)
                    .toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                    .replace(",", " :")
                    .replace(/\b(am|pm)\b/g, (match) => match.toUpperCase())}
                />
              ))
            ) : (
              <OwnerEmptyCard />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
