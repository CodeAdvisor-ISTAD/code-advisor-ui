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
import { useEffect, useState } from "react";

// Define the form schema
const formSchema = z.object({
  reason: z.string().min(1, { message: "សូមជ្រើសរើសប្រភេទរបាយការណ៍" }),
  url: z.string().url({ message: "សូមបញ្ចូល URL ត្រឹមត្រូវ" }),
  description: z
    .string()
    .min(10, { message: "សូមបញ្ចូលសារយ៉ាងតិច ១០ តួអក្សរ" }),
});


export default function ReportForm() {
  const [loading, setLoading] = useState(false);
  const userId = "123";
  const ownerId = "123";

  const currentUrl = window.location.href;

  // Initialize the form with default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
      url: currentUrl, // Set the current URL as the default value
      description: "",
    },
  });

  const router = useRouter();
  const params = useParams(); // Get dynamic params

  // Extract params values from slug
  const type = params.slug?.[0] === "comment" ? "comment" : "content";
  const contentId = params.slug?.[1] || "";
  const commentId = type === "comment" ? params.slug?.[2] || "" : "";

  console.log("Type:", type); // "content" or "comment"
  console.log("Content ID:", contentId); // e.g., "6795c8a465314844e79028dd"
  console.log("Comment ID:", commentId);

  console.log("Type of report: ", type);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const slug = Array.isArray(params.slug)
      ? params.slug.join("/")
      : params.slug || ""; // Ensure slug is a string

    const reportData = {
      type,
      contentId, // Assuming `contentId` is defined in the component scope
      commentId, // Assuming `commentId` is defined in the component scope
      slug, // Ensure slug is a string
      ownerId, // Assuming `ownerId` is defined in the component scope
      userId, // Assuming `userId` is defined in the component scope
      reason: values.reason, // Adjusted to match the schema's field name
      description: values.description, // Corrected the typo in 'description'
      url: values.url || undefined, // Optional field
    };

    try {
      setLoading(true);
      const response = await createReport(reportData as any);
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
      <div className="min-h-screen w-full pb-6 pt-[80px] flex justify-center px-8">
        <div className="w-full max-w-2xl">
          {/* Heading */}
          <h1 className="text-2xl font-bold md:text-3xl">របាយការណ៍</h1>
          <p className="mt-2 text-sm md:text-base">
            សូមអរគុណសម្រាប់ការរាយការណ៍អំពើមិនត្រឹមត្រូវ
            ឬអាកប្បកិរិយាដែលផ្ទុយពីលក្ខខណ្ឌរបស់យើង។
          </p>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-6"
            >
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
                          <FormLabel className="text-sm md:text-base">
                            ស្ប៉ាមឬបញ្ហាផ្សេងៗ
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="ការរំលោភបំពានឬមាតិកាមិនសមរម្យ" />
                          </FormControl>
                          <FormLabel className="text-sm md:text-base">
                            ការរំលោភបំពានឬមាតិកាមិនសមរម្យ
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="សិទ្ធិ បញ្ញាឬកម្មសិទ្ធិបញ្ញា" />
                          </FormControl>
                          <FormLabel className="text-sm md:text-base">
                            សិទ្ធិ បញ្ញាឬកម្មសិទ្ធិបញ្ញា
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="សុវត្ថិភាពឬការគំរាមកំហែង" />
                          </FormControl>
                          <FormLabel className="text-sm md:text-base">
                            សុវត្ថិភាពឬការគំរាមកំហែង
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="ផ្សេងៗទៀត" />
                          </FormControl>
                          <FormLabel className="text-sm md:text-base">
                            ផ្សេងៗទៀត
                          </FormLabel>
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
                    <h5 className="text-sm md:text-base">លីង(យូ​អរអិល)</h5>
                    <FormControl>
                      <Input
                        placeholder="សូមបញ្ចូល URL"
                        {...field}
                        className="text-sm md:text-base"
                        disabled // Disable the input field
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <h5 className="text-sm md:text-base">សារ</h5>
                    <p className="text-sm md:text-base">
                      សូមផ្តល់ព័ត៌មានបន្ថែម ឬបរិបទដែលអាចជួយឱ្យយើងយល់
                      និងដោះស្រាយស្ថានភាពនេះ
                    </p>
                    <FormControl>
                      <Textarea
                        placeholder="សូមបញ្ចូលព័ត៌មានលម្អិតបន្ថែម..."
                        className="min-h-[100px] text-sm md:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="bg-primary text-white w-full md:w-auto"
              >
                ផ្ញើរបាយការណ៍
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </FormProvider>
  );
}
