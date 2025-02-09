"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { createReport } from "@/hooks/api-hook/engagement/engagement-api";
import { useState } from "react";

const formSchema = z.object({
  reason: z.string().min(1, { message: "សូមជ្រើសរើសប្រភេទរបាយការណ៍" }),
  url: z.string().url({ message: "សូមបញ្ចូល URL ត្រឹមត្រូវ" }),
  descriptoin: z.string().min(10, { message: "សូមបញ្ចូលសារយ៉ាងតិច ១០ តួអក្សរ" }),
});

export default function ReportForm() {
  const [loading, setLoading] = useState(false);
  const userId ="123"
  const ownerId ="123"

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
      url: "",
      descriptoin: "",
    },
  });

  const router = useRouter();
  const params = useParams(); // Get dynamic params

// Extract params values from slug
const type = params?.slug?.[0] === "comment" ? "comment" : "content";
const contentId = params?.slug?.[1] || "";
const commentId = type === "comment" ? params?.slug?.[2] || "" : "";

console.log("Type:", type);         // "content" or "comment"
console.log("Content ID:", contentId); // e.g., "6795c8a465314844e79028dd"
console.log("Comment ID:", commentId); 

  console.log("Type of report: ", type)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const slug = params && Array.isArray(params.slug) ? params.slug.join("/") : params?.slug?.toString() || ""; // Ensure slug is a string
  
    const reportData = {
      type,
      contentId, // Assuming `contentId` is defined in the component scope
      commentId, // Assuming `commentId` is defined in the component scope
      slug, // Ensure slug is a string
      ownerId, // Assuming `ownerId` is defined in the component scope
      userId, // Assuming `userId` is defined in the component scope
      reason: values.reason, // Adjusted to match the schema's field name
      description: values.descriptoin, // Corrected the typo in 'description'
      url: values.url || undefined, // Optional field
    };
  
    try {
      setLoading(true);
      const response = await createReport(reportData);
      console.log("Report created successfully:", response);
      ("Report submitted successfully!");
    } catch (error) {
      console.error("Failed to submit report:", error);
    } finally {
      setLoading(false);
    }
  
    // Navigate back to the content page
    router.push(`/content/${contentId}`);
  }
  

  return (
    <FormProvider {...form}>
      <div className="min-h-screen w-full pb-6 pt-[80px] flex justify-center">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-bold">របាយការណ៍</h1>
          <p>
            សូមអរគុណសម្រាប់ការរាយការណ៍អំពើមិនត្រឹមត្រូវ
            ឬអាកប្បកិរិយាដែលផ្ទុយពីលក្ខខណ្ឌរបស់យើង។
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Report reason */}
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2"
                      >
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="ស្ប៉ាមឬបញ្ហាផ្សេងៗ" />
                          </FormControl>
                          <FormLabel>ស្ប៉ាមឬបញ្ហាផ្សេងៗ</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="ការរំលោភបំពានឬមាតិកាមិនសមរម្យ" />
                          </FormControl>
                          <FormLabel>ការរំលោភបំពានឬមាតិកាមិនសមរម្យ</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="សិទ្ធិ បញ្ញាឬកម្មសិទ្ធិបញ្ញា" />
                          </FormControl>
                          <FormLabel>សិទ្ធិ បញ្ញាឬកម្មសិទ្ធិបញ្ញា</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="សុវត្ថិភាពឬការគំរាមកំហែង" />
                          </FormControl>
                          <FormLabel>សុវត្ថិភាពឬការគំរាមកំហែង</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="ផ្សេងៗទៀត" />
                          </FormControl>
                          <FormLabel>ផ្សេងៗទៀត</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* URL Field */}
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <h5>URL</h5>
                    <FormControl>
                      <Input placeholder="សូមបញ្ចូល URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* description Field */}
              <FormField
                control={form.control}
                name="descriptoin"
                render={({ field }) => (
                  <FormItem>
                    <h5>សារ</h5>
                    <p>
                      សូមផ្តល់ព័ត៌មានបន្ថែម ឬបរិបទដែលអាចជួយឱ្យយើងយល់
                      និងដោះស្រាយស្ថានភាពនេះ
                    </p>
                    <FormControl>
                      <Textarea
                        placeholder="សូមបញ្ចូលព័ត៌មានលម្អិតបន្ថែម..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="bg-primary text-white">
                ផ្ញើរបាយការណ៍
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </FormProvider>
  );
}