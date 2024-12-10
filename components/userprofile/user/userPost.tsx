"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/userprofile/tabs";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/userprofile/select";
import { Command, CommandInput } from "@/components/ui/command";
import EmptyCardComponent from "./EmptyCardComponent";
import { CardComponent } from "@/components/card-component/card/CardComponent";
import ForumCardList from "@/components/card-component/forum-card/ForumCardList";
import { ForumCardComponent } from "@/components/card-component/forum-card/ForumCardComponent";

export default function UserPost() {
  return (
    <div className="">
      <div className="mt-[95px]">
        <Tabs defaultValue="account" className="w-[400px]">
          {/* Tab for post {content, forum} */}
          <TabsList>
            <TabsTrigger value="account">មាតិការបស់អ្នក</TabsTrigger>
            <TabsTrigger value="password">សំនួររបស់អ្នក</TabsTrigger>
          </TabsList>
          {/* Search bar */}
          <div>
            <div className="flex items-center w-[680px] space-x-3 pt-4 pb-3">
              <Command className="border h-9 rounded-lg flex justify-center">
                <CommandInput placeholder="ស្វែងរក" className="h-9" />
              </Command>
              {/* Filter by day */}
              <Select>
                <SelectTrigger className="w-[300px] text-start h-9 bg-white rounded-lg ">
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
          </div>

          <TabsContent value="account">
            <Card className="w-[680px] p-6 rounded-lg bg-white ">
              <CardTitle className="text-2xl pb-6">ប្រវត្តិ</CardTitle>
              <CardDescription>
                Everything is difficult until you know how to do it 🐳
              </CardDescription>
            </Card>
            <ForumCardComponent
              avatar={""}
              username={""}
              timestamp={""}
              title={""}
              content={""}
              tags={[]}
              views={0}
              comments={0}
              upvotes={0}
            />
          </TabsContent>
          {/* empty post */}
          <EmptyCardComponent />
        </Tabs>
      </div>
    </div>
  );
}
