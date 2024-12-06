"use client"
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
export default function UserInformation() {
    return (
        <div>
            <Card className="w-[510px] h-[151px] p-6 rounded-lg bg-white ">
          <CardTitle className="font-khFont text-2xl pb-6">
            ប្រវត្តិ
          </CardTitle>
          <CardDescription>
            Everything is difficult until you know how to do it 🐳
          </CardDescription>
        </Card>
        </div>
    )
}