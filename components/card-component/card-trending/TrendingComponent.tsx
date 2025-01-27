import { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecommendationProps {
  type: "Latest" | "Trending";
  item?: string[]; // Add this line to accept the `item` prop
}

interface ContentItem {
  id: string;
  title: string;
}

export default function Recommendations({ type, item }: RecommendationProps) {
  const [items, setItems] = useState<ContentItem[]>([]);

  useEffect(() => {
    if (item) {
      // If `item` is provided, map it to the expected format
      const mappedItems = item.map((title, index) => ({
        id: `item-${index}`,
        title,
      }));
      setItems(mappedItems);
    } else {
      // Otherwise, fetch data as usual
      const fetchData = async () => {
        let url = "";
        if (type === "Latest") {
          url = "http://167.172.78.79:9200/content-service.contents/_search?q=isDeleted:false AND isDraft:false&sort=created_date:desc&size=10&pretty";
        } else if (type === "Trending") {
          url = "http://167.172.78.79:9200/content-service.contents/_search?q=isDeleted:false AND isDraft:false AND tags:java&size=10&pretty";
        }

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();

          if (data && data.hits && data.hits.hits) {
            const items = data.hits.hits.map((hit: { _id: string; _source: ContentItem }) => ({
              id: hit._id,
              title: hit._source.title,
            }));
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
  }, [type, item]); // Add `item` to the dependency array

  // Slice the items array to only include the first 4 items
  const displayedItems = items.slice(0, 4);

  return (
      <Card className="rounded-[5px] ">
        <div className="py-2">
          <CardHeader>
            <CardTitle className="flex font-normal items-center gap-2 text-2xl text-primary">
              <Star className="h-6 w-6 fill-red-500 text-red-500" />
              {type}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {displayedItems.map((item) => (
                  <li key={item.id} className="flex items-start gap-2">
                    <span className="mt-4 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <Link href={`/content/${item.id}`} className="text-primary p-[0.3rem] rounded-[5px] cursor-pointer">
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