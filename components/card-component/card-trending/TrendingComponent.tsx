import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecommendationProps {
  type: "Latest" | "Trending";
}

interface ContentItem {
  title: string;
  // Add other fields as needed
}

export default function Recommendations({ type }: RecommendationProps) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let url = "";
      if (type === "Latest") {
        url = "http://167.172.78.79:9200/content-service.contents/_search?q=isDeleted:false AND isDraft:false&sort=created_date:desc&size=10&pretty";
      } else if (type === "Trending") {
        url = "http://167.172.78.79:9200/content-service.contents/_search?q=isDeleted:false AND isDraft:false AND tags:java&size=10&pretty";
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        const items = data.hits.hits.map((hit: { _source: ContentItem }) => hit._source.title);
        setItems(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [type]);

  return (
    <Card className="rounded-[5px]">
      <div className="py-2">
        <CardHeader>
          <CardTitle className="flex font-normal items-center gap-2 text-2xl text-primary">
            <Star className="h-6 w-6 fill-red-500 text-red-500" />
            {type}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-primary">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </div>
    </Card>
  );
}