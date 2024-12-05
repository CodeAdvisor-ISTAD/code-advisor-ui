import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { getContents } from "@/lib/api";
import { Badge, Link } from "lucide-react";

export default async function Home() {
  const contents = await getContents();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Content Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((content) => (
          <a  href={`/content/${content.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <img
                  src={content.cover}
                  alt={content.title}
                  width={600}
                  height={400}
                  className="rounded-t-lg object-cover h-48 w-full"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2">{content.title}</CardTitle>
                <p className="text-sm text-gray-600 mb-4">
                  {content.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {content.tags?.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  By {content.author?.userName}
                </p>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
