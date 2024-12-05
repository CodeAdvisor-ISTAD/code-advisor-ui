import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Profile } from "../Profile";
import { Author, Content } from "@/types/engagement";

export function ContentSection({
  cover,
  title,
  tags,
  description,
  author,
}: Content) {
  return (
    <Card className="w-full">
      <img src={cover} className="w-full h-80 object-cover rounded-t-xl" />
      <div className="mx-8">
        <CardHeader>
          <h1 className="text-2xl font-bold py-2">{title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags?.map((tag, index) => (
              <span className="px-4 py-2 rounded-full text-white bg-gray-400 text-sm cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-500">
                <div key={index}>#{tag}</div>
              </span>
            ))}
          </div>
          <div className="py-4">
            <Profile
              imageUrl={author?.image}
              username={author?.userName}
              postDate="23 Jan 21"
            />
          </div>
        </CardHeader>
        <CardContent>{description}</CardContent>
      </div>
    </Card>
  );
}
