"use client";
import React, { useState } from "react";
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
import { Textarea } from "@/components/userprofile/textarea";
import { useRouter } from "next/navigation";
import { UseFetchUserServiceProfile } from "@/hooks/api-hook/user-service";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColorPicker } from "./colorPicker";

interface EditUserInformationFormProps {
  onColorChange?: (color: string) => void;
  bgColor?: string;
}

export default function EditUserInformationForm(
  props: EditUserInformationFormProps
) {
  const router = useRouter();
  const { data } = UseFetchUserServiceProfile();
  const [profileImage, setProfileImage] = useState(data?.profileImage || ""); // Add profileImage state
  const [date, setDate] = React.useState<Date>();

  console.log(data);

  type FieldName =
    | "givenName"
    | "familyName"
    | "phoneNumber"
    | "gender"
    | "dob"
    | "pob"
    | "jobPosition"
    | "school"
    | "workPlace"
    | "bio"
    | "profileImage"
    | "isDeleted"
    | "coverColor";

  const form = useForm({
    defaultValues: {
      fullName: data?.fullName || "",
      familyName: data?.familyName || "",
      givenName: data?.givenName || "",
      gender: data?.gender || "",
      phoneNumber: data?.phoneNumber || "",
      bio: data?.bio || "",
      workPlace: data?.workPlace || "",
      pob: data?.pob || "",
      school: data?.school || "",
      jobPosition: data?.jobPosition || "",
      dob: data?.dob || "",
      profileImage: data?.profileImage || "",
      isDeleted: data?.isDeleted || false,
      coverColor: data?.coverColor || "",
    },
  });

  console.log(form.getValues());

  async function onSubmit(data: any) {
    console.log("firstName", data);
    try {
      const response = await fetch("/users/api/v1/user_profiles", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...data, profileImage }), // Include updated profileImage
      });

      if (!response.ok) {
        const errorMessage = `HTTP error! status: ${response.status}, statusText: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("User information updated successfully:", result);
      router.push(`/user-profile/${result?.username}`);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  }

  const handleRedirect = () => {
    router.push(`/user-profile/${data?.username}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-center gap-[15px]">
          <div className="flex flex-col bg-white w-[510px] h-full items-center pb-[25px] pt-[25px] rounded-lg border">
            <div className="w-[200px] h-[55px] pr-[450px] relative">
              <CardTitle className="left-0 top-0 absolute text-[#000040] text-2xl">
                កែប្រែព័ត៌មានអំពីអ្នក
              </CardTitle>
              <div className="w-[28px] h-[2.5px] left-[1px] top-[27px] absolute bg-[#f31260]"></div>
            </div>
            {(
              [
                { name: "fullName", label: "គោត្តនាម នាម" },
                { name: "phoneNumber", label: "លេខទូរស័ព្ទ" },
                { name: "gender", label: "ភេទ" },
                { name: "dob", label: "ថ្ងៃ ខែ​ ឆ្នាំកំណើត" },
                { name: "pob", label: "ទីកន្លែងកំណើត" },
                { name: "jobPosition", label: "តួនាទី" },
                { name: "school", label: "សាលារៀន" },
              ] as { name: FieldName; label: string }[]
            ).map(({ name, label }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                rules={
                  name === ("fullName" as FieldName)
                    ? { required: `${label} is required` }
                    : {}
                }
                render={({ field }) => (
                  <FormItem className="pb-[20px]">
                    <div className="flex gap-1">
                      <FormLabel className="font-khFont text-base font-bold">
                        {label}
                      </FormLabel>
                      {name === ("fullName" as FieldName) && (
                        <p className="text-red-600">*</p>
                      )}
                    </div>
                    <FormControl>
                      {name === "dob" ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[450px] pl-3 justify-start text-left font-normal bg-white ring-black focus:ring-1",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 text-gray-800" />
                              {date ? (
                                format(date, "PPP")
                              ) : (
                                <span className="text-gray-700">
                                  ជ្រើសរើស​ ថ្ងៃ ខែ​ ឆ្នាំកំណើត
                                </span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(selectedDate) => {
                                setDate(selectedDate);
                                form.setValue(
                                  "dob",
                                  selectedDate
                                    ? format(selectedDate, "yyyy-MM-dd")
                                    : ""
                                );
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <Input
                          {...field}
                          value={String(field.value)}
                          className="w-[450px]"
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col bg-white w-[510px] items-center pb-[25px] pt-[25px] rounded-lg border">
              {(
                [{ name: "workPlace", label: "ទីកន្លែងធ្វើការ" }] as {
                  name: FieldName;
                  label: string;
                }[]
              ).map(({ name, label }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  // rules={{ required: `${label} is required` }}
                  render={({ field }) => (
                    <FormItem className="pb-[20px]">
                      <div className="flex gap-1">
                        <FormLabel className="font-khFont text-base font-bold">
                          {label}
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          value={String(field.value)}
                          className="w-[450px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormField
              control={form.control}
              name="bio"
              // rules={{ required: "Bio is required" }}
              render={({ field }) => (
                <FormItem className="flex flex-col bg-white w-[510px] justify-center items-center pb-[25px] pt-[25px] rounded-lg border">
                  <div className="w-[200px] h-[55px] pr-[450px] relative">
                    <CardTitle className="left-0 top-0 absolute text-[#000040] text-2xl">
                      កែប្រែការពិពណ៌នាអំពីអ្នក
                    </CardTitle>
                    <div className="w-[28px] h-[2.5px] left-[1px] top-[27px] absolute bg-[#f31260]"></div>
                  </div>
                  <FormControl>
                    <Textarea {...field} className="w-[450px]" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              // rules={{ required: "Bio is required" }}
              render={({ field }) => (
                <FormItem className="flex flex-col bg-white w-[510px] justify-center items-center pb-[25px] pt-[25px] rounded-lg border">
                  <div className="w-[200px] h-[55px] pr-[450px] relative">
                    <CardTitle className="left-0 top-0 absolute text-[#000040] text-2xl">
                      កែប្រែផ្ទៃខាងក្រោយ
                    </CardTitle>
                    <div className="w-[28px] h-[2.5px] left-[1px] top-[27px] absolute bg-[#f31260]"></div>
                  </div>
                  {/* <ColorPicker
                    onColorChange={(color) => {
                      form.setValue("coverColor", color);
                      if (props.onColorChange) {
                        props.onColorChange(color);
                      }
                    }}
                    initialColor={form.getValues("coverColor")}
                  /> */}
                  <ColorPicker
                    onColorChange={(color) => {
                      form.setValue("coverColor", color);
                      if (props.onColorChange) {
                        props.onColorChange(color);
                      }
                    }}
                    initialColor={form.getValues("coverColor")}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleRedirect}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                ចាកចេញ
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded"
              >
                រក្សាទុក
              </button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
