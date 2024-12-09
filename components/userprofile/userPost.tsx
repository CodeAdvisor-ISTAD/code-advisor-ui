"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/userprofile/tabs";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/userprofile/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

export default function UserPost() {
  return (
    <div className="mt-[85px]">
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
            <CardTitle className="font-khFont text-2xl pb-6">
              ប្រវត្តិ
            </CardTitle>
            <CardDescription>
              Everything is difficult until you know how to do it 🐳
            </CardDescription>
          </Card>
        </TabsContent>
        {/* empty post */}
        <TabsContent value="password" className="">
          <Card className="items-center w-[680px] p-6 rounded-lg bg-white">
            <CardTitle className="font-khFont text-2xl pb-6 text-center">
              ទិន្នន័យរបស់អ្នកមិនទាន់មានទេ
            </CardTitle>
            <CardDescription>
              <p className="pb-[15px] font-khFont w-[446px] ml-[110px] text-center text-[14px] text-gray-600">
                នៅពេលដែលអ្នកធ្វើការចែករំលែក
                អ្នកបានផ្តល់ឱកាសឲ្យអ្នកដទៃបានសិក្សារៀនសូត្រ
                ហើយអ្នកខ្លួនឯងក៏ទទួលបានការពង្រឹងសមត្ថភាពបន្ថែមដូចគ្នា។
              </p>
              <p className="font-khFont w-[446px] ml-[112px] text-center text-[16px] text-primary">
                សូមចុចលើប៊ូតុង បង្កើតថ្មី​ ដើម្បីចែករំលែកមាតិការបស់អ្នក
              </p>
            </CardDescription>
            <Button className="font-khFont ml-[300px] text-center mt-4 text-gray-100">
              បង្កើតថ្មី
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
