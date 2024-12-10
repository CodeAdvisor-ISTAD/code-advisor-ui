"use client";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
export default function Bio() {
  return (
    <div>
      <Card className="w-[510px] h-[151px] p-6 rounded-lg bg-white ">
        <div className="w-[57px] h-[55px] relative">
          <CardTitle className="left-0 top-0 absolute text-[#000040] text-2xl">
            ប្រវត្តិរូប
          </CardTitle>
          <div className="w-[16px] h-[2.5px] left-[13px] top-[27px] absolute bg-[#f31260]"></div>
        </div>
        <CardDescription>
          Everything is difficult until you know how to do it 🐳
        </CardDescription>
      </Card>
    </div>
  );
}
