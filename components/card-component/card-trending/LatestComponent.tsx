import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LatestComponent() {
  const latest = [
    "Advanced CSS techniques for modern web design",
    "Learn Tailwind CSS for responsive layouts",
    "Master React state management with Redux",
  ];

  return (
    <Card className="w-[341px] h-[315px] rounded-[5px] shadow-sm">
      <CardHeader>
        <CardTitle className="font-normal flex items-center gap-2 text-2xl text-primary">
          <Star className="h-6 w-6 fill-red-500 text-red-500" />
          Recommend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {latest.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <p className="text-primary">{item}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
