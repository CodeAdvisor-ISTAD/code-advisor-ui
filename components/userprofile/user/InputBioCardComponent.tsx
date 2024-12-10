"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/userprofile/form";
import { CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/userprofile/textarea";

import { useForm } from "react-hook-form";

export default function InputBioCardComponent() {
  const form = useForm();
  return (
    <div>
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem className="flex flex-col bg-white w-[510px] justify-center items-center pb-[25px] pt-[25px] rounded-lg border">
            <div className="">
              <CardTitle className="font-khFont text-2xl pb-6">
                ប្រវត្តិ
              </CardTitle>
              <FormControl>
                <Textarea {...field} className="w-[450px]" />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
