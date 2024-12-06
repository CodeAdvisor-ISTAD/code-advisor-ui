"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/userprofile/form";

import { CardDescription, CardFooter, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

export default function EditUserInformationForm() {
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Bio field */}
          {/* <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="flex flex-col bg-white w-[510px] justify-center items-center pb-[25px] pt-[25px] rounded-lg border-2">
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
              /> */}
          {/* Other form fields */}
          <div className="flex flex-col bg-white w-[510px] justify-center items-center pb-[25px] pt-[25px] rounded-lg border-2">
            <div className="">
              <CardTitle className="font-khFont text-2xl pb-6">
                អំពីអ្នក
              </CardTitle>
              {/* First name field */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="pb-[20px]">
                    <FormLabel className="font-khFont text-base font-bold">
                      នាម
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-[450px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Last name field */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="pb-[20px]">
                    <FormLabel className="font-khFont text-base font-bold">
                      គោត្តនាម
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-[450px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* University field */}
              <FormField
                control={form.control}
                name="university"
                render={({ field }) => (
                  <FormItem className="pb-[20px]">
                    <FormLabel className="font-khFont text-base font-bold">
                      មហាវិទ្យាល័យ
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-[450px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="pb-[20px]">
                    <FormLabel className="font-khFont text-base font-bold">
                      អ៊ីមែល
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-[450px]" type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Country field */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="pb-[20px]">
                    <div className="flex flex-row items-center gap-1">
                      <FormLabel className="font-khFont text-base font-bold">
                        ទីកន្លែងកំណើត
                      </FormLabel>
                      <p className="text-red-500">*</p>
                    </div>
                    <FormControl>
                      <Input {...field} className="w-[450px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
