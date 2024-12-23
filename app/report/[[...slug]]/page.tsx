"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  reportType: z.string().min(1, {
    message: "សូមជ្រើសរើសប្រភេទរបាយការណ៍",
  }),
  url: z.string().url({
    message: "សូមបញ្ចូល URL ត្រឹមត្រូវ",
  }),
  message: z.string().min(10, {
    message: "សូមបញ្ចូលសារយ៉ាងតិច ១០ តួអក្សរ",
  }),
});

export default function ReportForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportType: "",
      url: "",
      message: "",
    },
  });

  const router = useRouter();
  const params = useParams(); // Get the dynamic params

  // Extract the values from params
  const type = params.slug ? params.slug[0] : ""; // 'content' or 'comment'
  const contentId = params.slug ? params.slug[1] : ""; // Content ID
  const commentId = params.slug ? params.slug[2] : ""; // Comment ID, if available

  console.log("Type:", type); // 'content' or 'comment'
  console.log("Content ID:", contentId);
  console.log("Comment ID:", commentId);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/content/${contentId}`); // Go to content page
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="min-h-screen w-full pb-6 pt-[80px] flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">របាយការណ៍</h1>

            <p>
              សូមអរគុណសម្រាប់ការរាយការណ៍អំពើមិនត្រឹមត្រូវ
              ឬអាកប្បកិរិយាដែលផ្ទុយពីលក្ខខណ្ឌរបស់យើង។យើងមានការប្តេជ្ញាជ្រាបជាដាច់ខាតក្នុងការរក្សាបរិយាកាសដ៏មានសុវត្ថិភាព
              និងស្នាក់នៅស្វាគមន៍សម្រាប់ទាំងអស់។
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="reportType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-2"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="spam" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              ស្ប៉ាមឬបញ្ហាផ្សេងៗ
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="inappropriate" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              ការរំលោភបំពានឬមាតិកាមិនសមរម្យ
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="copyright" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              សិទ្ធិ បញ្ញាឬកម្មសិទ្ធិបញ្ញា
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="security" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              សុវត្ថិភាពឬការគំរាមកំហែង
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="other" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              ផ្សេងៗទៀត
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <h5>របាយការណ៍ URL</h5>
                      <FormControl>
                        <Input placeholder="https://" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
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
                <Button
                  onClick={handleReportSubmit}
                  type="submit"
                  className="bg-primary text-white"
                >
                  ផ្ញើរបាយការណ៍
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
