// app/allpage/page.tsx
"use client";

import ISTADCard from "@/components/card-component/card-trending/Card-Istad";
import Recommendations from "@/components/card-component/card-trending/TrendingComponent";
import { CardList } from "@/components/card-component/card/CardList";
import { ForumList } from "@/components/card-component/forum-card/ForumList";
import { useSearchParams } from "next/navigation";
import React from "react";

type Keyword = {
  label: string;
  value: string;
};

export default function AllPage() {
  const searchParams = useSearchParams();
  const query = searchParams ? searchParams.get("query") : null;

  const technology1: string[] = [
    "javascript",
    "spring-boot",
    "css",
    "self-hosting",
    "frontend",
    "career",
    "security",
    "typescript",
    "performan",
    "ui-design",
  ];

  const technology2: string[] = [
    "javascript",
    "spring-boot",
    "css",
    "self-hosting",
    "frontend",
    "career",
    "security",
    "typescript",
    "performan",
    "ui-design",
  ];

  const keywords: Keyword[] = [
    { label: "app-development", value: "app-development" },
    { label: "architecture", value: "architecture" },
    { label: "automation", value: "automation" },
    { label: "aws", value: "aws" },
    { label: "api development", value: "api development" },
    { label: "agile methodology", value: "agile methodology" },
    { label: "algorithms", value: "algorithms" },
    { label: "analytics", value: "analytics" },
    { label: "augmented reality", value: "augmented reality" },
    { label: "backend", value: "backend" },
    { label: "bigdata", value: "bigdata" },
    { label: "blockchain", value: "blockchain" },
    { label: "business", value: "business" },
    { label: "blogging", value: "blogging" },
    { label: "branding", value: "branding" },
    { label: "budgeting", value: "budgeting" },
    { label: "biotech", value: "biotech" },
    { label: "books", value: "books" },
    { label: "cloudcomputing", value: "cloudcomputing" },
    { label: "cybersecurity", value: "cybersecurity" },
    { label: "contentcreation", value: "contentcreation" },
    { label: "cryptocurrency", value: "cryptocurrency" },
    { label: "creativity", value: "creativity" },
    { label: "climatechange", value: "climatechange" },
    { label: "career", value: "career" },
    { label: "cinematography", value: "cinematography" },
    { label: "community", value: "community" },
  ];

  // Group keywords by the first letter
  const groupedKeywords: Record<string, string[]> = keywords.reduce(
    (acc, keyword) => {
      const firstLetter = keyword.label[0].toLowerCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(keyword.label);
      return acc;
    },
    {} as Record<string, string[]>
  );

  return (
      <main className="pt-[80px] flex flex-col md:flex-row mb-10">
        {/* Left Section: CardList and ForumList */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          {/* CardList Section */}
          <div className="w-full md:w-[700px] ml-0 md:ml-[200px] md:p-0 p-9 md:mt-0 -mt-9">
            <CardList searchQuery={query || ""} />
          </div>

          {/* ForumList Section */}
          <div className="w-full md:w-[700px] ml-0 md:ml-[200px]">
            <ForumList searchQuery={query || ""} />
          </div>
        </div>

        {/* Right Section: TechAndKeywordList */}
        <div className="container mx-auto md:mr-[200px] md:ml-2 mt-6 md:mt-0 ">
          {/* Tags Section */}
          <div className="bg-white rounded-md shadow-sm h-[53px] flex items-center px-4 mb-2 dark:bg-darkPrimary dark:shadow-primary">
            <p className="text-secondary font-bold text-[20px]">ស្លាក #</p>
          </div>

          {/* Popular and Famous Tags */}
          <div className="bg-white rounded-md shadow-sm p-6 dark:bg-darkPrimary dark:shadow-primary">
            <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
              <div className="flex-1">
                <h2 className="text-lg font-bold mb-4 text-secondary">ស្លាកពេញនិយម</h2>
                <ul className="list-disc pl-14 space-y-1">
                  {technology1.map((tech, index) => (
                      <li key={index} className="text-sm pb-2">
                        <a
                            href={`/content/tags/${tech}`}
                            className="hover:underline hover:text-primary"
                        >
                          {tech}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold mb-4 text-secondary ">ស្លាកល្បីៗ</h2>
                <ul className="list-disc pl-14 space-y-1">
                  {technology2.map((tech, index) => (
                      <li key={index} className="text-sm pb-2">
                        <a
                            href={`/content/tags/${tech}`}
                            className="hover:underline hover:text-primary"
                        >
                          {tech}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Keywords Section */}
          <div className="mt-2 bg-white rounded-md shadow-sm p-6 dark:bg-darkPrimary dark:shadow-primary ">
            <h2 className="text-lg font-bold mb-4 text-secondary">ពាក្យគន្លឹះ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(groupedKeywords).map(([letter, items]) => (
                  <div key={letter}>
                    <h3 className="text-md font-bold text-secondary mb-2">
                      {letter.toUpperCase()}
                    </h3>
                    <ul className="list-disc pl-4 space-y-1">
                      {items.map((item, index) => (
                          <li key={index} className="text-sm pb-2">
                            <a
                                href={`/content/tags/${item}`}
                                className="hover:underline hover:text-primary"
                            >
                              {item}
                            </a>
                          </li>
                      ))}
                    </ul>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </main>  );
}
