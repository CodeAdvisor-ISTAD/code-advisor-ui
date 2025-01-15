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
import { CardForumComponent } from "@/components/userprofile/user/CardForumComponent";
import { CardsData } from "@/lib/information";
import EmptyCard from "./EmptyCardComponent";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getQuestionByAuthorName, getQuestionByOwner, totalAnswersByQuestion, totalUpVotes } from "@/hooks/api-hook/forum/forum-api";

export default function UserPost({ username }: { username: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  // Fetch data from CardsData
  // const { forumData, loading, error } = CardsData();

  console.log("username : ", username);

  const {data: forumData} = useQuery({
    queryKey: ["ForumOwner"],
    queryFn: () => getQuestionByAuthorName(username,0,10),
  })

  useEffect(() => {
    // Update filtered data whenever `forumData` changes
    if (forumData) {
      setFilteredData(forumData.content);
    }
  }, [forumData]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter data based on the search query
    if (forumData) {
      const filtered = forumData.filter(
        (card: any) =>
          card.title.toLowerCase().includes(query.toLowerCase()) ||
          card.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // Use useQueries to fetch upvotes for each forum post
  const upvoteQueries = useQueries({
    queries: (filteredData ?? []).map((forum) => ({
      queryKey: ["totalUpVotes", forum.slug],
      queryFn: () => totalUpVotes(forum.slug),
      enabled: !!forum.slug, // Only run query if we have a slug
    })),
  });

//   const { data: totalAnswer } = useQuery({
//     queryKey: ["totalAnswers", slug], // Unique key for all answers
//     queryFn: () => totalAnswersByQuestion(slug),
// })
  const totalAnswer = useQueries({
    queries: (filteredData ?? []).map((forum) => ({
      queryKey: ["totalAnswers", forum.slug],
      queryFn: () => totalAnswersByQuestion(forum.slug),
      enabled: !!forum.slug, // Only run query if we have a slug
    })),
  });

  return (
    <div className="mt-[95px]">
      <Tabs defaultValue="forum" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="forum">សំនួររបស់អ្នក</TabsTrigger>
          <TabsTrigger value="content">មាតិការបស់អ្នក</TabsTrigger>
        </TabsList>
        <div className="flex items-center w-[680px] space-x-3 pt-1 pb-0.5">
          <Command className="border h-9 rounded-lg flex justify-center">
            <Input
              type="text"
              placeholder="ស្វែងរកទៅតាមចំណងជើង"
              className="h-9 px-4 text-sm border rounded-md w-full"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Command>
          <Select>
            <SelectTrigger className="w-[300px] text-start h-9 bg-white rounded-lg">
              <SelectValue placeholder="កាលបរិច្ឆេទ" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="rounded-sm">
                <SelectItem value="1">៧ ថ្ងៃមុន</SelectItem>
                <SelectItem value="2">១ ខែមុន</SelectItem>
                <SelectItem value="3">២ ខែមុន</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <TabsContent value="forum">
          <div className="grid grid-cols-1 w-[680px] gap-2 max-w-7xl mx-auto">
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((card: any, index: number) => (
                <CardForumComponent
                  key={card.id}
                  slug={card.slug}
                  timestamp={card.createdAt}
                  title={card.title}
                  content={card.description}
                  views={card.views}
                  comments={totalAnswer[index]?.data?.total ?? card.comments}
                  upvotes={upvoteQueries[index]?.data?.totalVotes ?? card.upvotes}
                />
              ))
            ) : (
              <EmptyCard />
            )}
          </div>
        </TabsContent>
        <TabsContent value="content">
          <EmptyCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
