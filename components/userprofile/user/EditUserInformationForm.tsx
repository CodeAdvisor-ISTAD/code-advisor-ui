"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/userprofile/form";

import { CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

export default function EditUserInformationForm() {
  const form = useForm({
    defaultValues: {
      familyName: "",
      givenName: "",
      username: "",
      gender: "",
      phoneNumber: "",
      bio: "",
      workPlace: "",
      pob: "",
      school: "",
      jobPosition: "",
      phone: "",
      dob: "",
      profileImage: "",
      isDeleted: false,
      coverColor: "",
    },
  });

  async function onSubmit(data: any) {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/edit_user_profiles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("User information updated successfully:", result);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  }

  return (
    <div>
      <Form children={undefined} {...form}></Form>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"></form>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col bg-white w-[510px]  items-center pb-[25px] pt-[25px] rounded-lg border">
            <CardTitle className="font-khFont text-2xl pb-6 pr-[390px]">
              អំពីអ្នក
            </CardTitle>
            {/* giving name field */}
            <FormField
              control={form.control}
              name="givenName"
              render={({ field }) => (
                <FormItem className="pb-[20px]">
                  {/*label Giving name */}
                  <FormLabel className="font-khFont text-base font-bold">
                    នាម
                  </FormLabel>
                  {/* input giving name */}
                  <FormControl>
                    <Input {...field} className="w-[450px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* family name field */}
            <FormField
              control={form.control}
              name="familyName"
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
            {/* Username field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="pb-[20px]">
                  <FormLabel className="font-khFont text-base font-bold">
                    ឈ្មោះគណនី
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="w-[450px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email field */}
            {/* <FormField
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
            /> */}
            {/* phone field */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="pb-[20px]">
                  <div className="flex flex-row items-center gap-1">
                    <FormLabel className="font-khFont text-base font-bold">
                      លេខទូរស័ព្ទ
                    </FormLabel>
                    {/* <p className="text-red-500">*</p> */}
                  </div>
                  <FormControl>
                    <Input {...field} className="w-[450px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* gender field */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="pb-[20px]">
                  <div className="flex flex-row items-center gap-1">
                    <FormLabel className="font-khFont text-base font-bold">
                      ភេទ
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input {...field} className="w-[450px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* dob field */}
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="pb-[20px]">
                  <div className="flex flex-row items-center gap-1">
                    <FormLabel className="font-khFont text-base font-bold">
                      ថ្ងៃ ខែ​ ឆ្នាំកំណើត
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input {...field} className="w-[450px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* pob field */}
            <FormField
              control={form.control}
              name="pob"
              render={({ field }) => (
                <FormItem className="pb-[20px]">
                  <div className="flex flex-row items-center gap-1">
                    <FormLabel className="font-khFont text-base font-bold">
                      ទីកន្លែងកំណើត
                    </FormLabel>
                    {/* <p className="text-red-500">*</p> */}
                  </div>
                  <FormControl>
                    <Input {...field} className="w-[450px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* job pisition field */}
            <FormField
              control={form.control}
              name="jobPosition"
              render={({ field }) => (
                <FormItem className="pb-[20px]">
                  <div className="flex flex-row items-center gap-1">
                    <FormLabel className="font-khFont text-base font-bold">
                      តួនាទី
                    </FormLabel>
                    {/* <p className="text-red-500">*</p> */}
                  </div>
                  <FormControl>
                    <Input {...field} className="w-[450px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* school field */}
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem className="pb-[20px]">
                  <div className="flex flex-row items-center gap-1">
                    <FormLabel className="font-khFont text-base font-bold">
                      សកលវិទ្យាល័យ
                    </FormLabel>
                    {/* <p className="text-red-500">*</p> */}
                  </div>
                  <FormControl>
                    <Input {...field} className="w-[450px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* work place field */}
            <FormField
              control={form.control}
              name="workPlace"
              render={({ field }) => (
                <FormItem className="pb-[20px]">
                  <div className="flex flex-row items-center gap-1">
                    <FormLabel className="font-khFont text-base font-bold">
                      ទីកន្លែងធ្វើការ
                    </FormLabel>
                    {/* <p className="text-red-500">*</p> */}
                  </div>
                  <FormControl>
                    <Input {...field} className="w-[450px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Other fields omitted for brevity */}
          {/* <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Information
          </button> */}
          </div>
        </form>
      </Form>
      
    </div>
  );
}
