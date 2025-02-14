"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecommendationProps {
  type: "Latest" | "Trending";
  item?: string[];
}

interface ContentItem {
  slug: string;
  title: string;
}

export default function Recommendations({ type, item }: RecommendationProps) {
  const [items, setItems] = useState<ContentItem[]>([]);

  useEffect(() => {
    if (item) {
      // Map provided item titles to expected format
      const mappedItems = item.map((title, index) => ({
        slug: `item-${index}`, // Replace this with actual slug logic if needed
        title,
      }));
      setItems(mappedItems);
    } else {
      // Fetch data from API
      const fetchData = async () => {
        let url = "";
        if (type === "Latest") {
          url =
            "https://elastic.panda.engineer/content-service.contents/_search?q=isDeleted:false AND isDraft:false&sort=created_date:desc&size=10&pretty";
        } else if (type === "Trending") {
          url =
            "https://elastic.panda.engineer/content-service.contents/_search?q=isDeleted:false AND isDraft:false AND tags:java&size=10&pretty";
        }

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();

          if (data?.hits?.hits) {
            const items = data.hits.hits.map(
              (hit: {
                _id: string;
                _source: { title: string; slug?: string };
              }) => ({
                slug: hit._source.slug || hit._id, // Prefer slug, fallback to _id
                title: hit._source.title,
              })
            );
            setItems(items);
          } else {
            console.error("Unexpected API response structure:", data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [type, item]);

  // Slice the items array to only include the first 4 items
  const displayedItems = items.slice(0, 4);

  return (
    <Card className="rounded-[5px] dark:bg-darkPrimary md:hidden hidden lg:hidden xl:block">
      <div className="">
        <CardHeader className="-mb-8">
          <CardTitle className="flex font-normal items-center gap-2 text-2xl text-primary dark:text-white">
            <Star className="h-6 w-6 fill-red-500 text-red-500" />
            {type}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 dark:text-white">
            {displayedItems.map((item) => (
              <li
                key={item.slug}
                className="flex items-start gap-2 dark:text-white "
              >
                <span className="mt-4 h-2 w-2 shrink-0 rounded-full bg-primary dark:text-white" />
                <Link
                  href={`/content/${item.slug}`}
                  className="text-primary p-[0.3rem] rounded-[5px] cursor-pointer hover:underline dark:text-white"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </div>
    </Card>
  );
}
