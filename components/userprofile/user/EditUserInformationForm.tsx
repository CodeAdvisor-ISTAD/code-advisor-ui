"use client";
import React, { useEffect } from "react";
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
import { ColorPicker } from "@/components/userprofile/user/colorPicker";

interface EditUserInformationFormProps {
  onColorChange?: (color: string) => void;
  bgColor?: string;
}

export default function EditUserInformationForm({
  onColorChange,
  bgColor = "#000040",
}: EditUserInformationFormProps) {
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
      familyName: "",
      givenName: "",
      gender: "",
      phoneNumber: "",
      bio: "",
      workPlace: "",
      pob: "",
      school: "",
      jobPosition: "",
      dob: "",
      profileImage: "",
      isDeleted: false,
      coverColor: bgColor,
    },
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/edit_user_profiles/lazizhia"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        form.reset(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [form]);

  const handleColorChange = (color: string) => {
    const formattedColor = color.startsWith("#") ? color : `#${color}`;
    form.setValue("coverColor", formattedColor);
    if (onColorChange) {
      onColorChange(formattedColor);
    }
  };

  async function onSubmit(data: any) {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/edit_user_profiles/lazizhia",
        {
          method: "PATCH",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-center gap-[15px]">
          {/* User Information */}
          <div className="flex flex-col bg-white w-[510px] items-center pb-[25px] pt-[25px] rounded-lg border">
            <CardTitle className="text-2xl pb-6 pr-[275px]">
              កែប្រែព័ត៌មានអំពីអ្នក
            </CardTitle>
            {/* Render fields dynamically */}
            {(
              [
                { name: "givenName", label: "នាម" },
                { name: "familyName", label: "គោត្តនាម" },
                { name: "phoneNumber", label: "លេខទូរស័ព្ទ" },
                { name: "gender", label: "ភេទ" },
                { name: "dob", label: "ថ្ងៃ ខែ​ ឆ្នាំកំណើត" },
                { name: "pob", label: "ទីកន្លែងកំណើត" },
                { name: "jobPosition", label: "តួនាទី" },
              ] as { name: FieldName; label: string }[]
            ).map(({ name, label }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem className="pb-[20px]">
                    <FormLabel className="font-khFont text-base font-bold">
                      {label}
                    </FormLabel>
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

          {/* Bio and Cover */}
          <div className="flex flex-col gap-4">
            {/* Bio Field */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="flex flex-col bg-white w-[510px] justify-center items-center pb-[25px] pt-[25px] rounded-lg border">
                  <CardTitle className="font-khFont text-2xl pr-[415px] pb-6">
                    ប្រវត្តិ
                  </CardTitle>
                  <FormControl>
                    <Textarea {...field} className="w-[450px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover Color Picker */}
            <FormField
              control={form.control}
              name="coverColor"
              render={({ field }) => (
                <FormItem className="flex flex-col bg-white w-[510px] justify-center items-center pb-[25px] pt-[25px] rounded-lg border">
                  <div className="w-28 h-[50px] relative mr-[340px]">
                    <CardTitle className="absolute text-primary w-[450px] text-2xl">
                      ផ្ទាំងខាងក្រោយ
                    </CardTitle>
                  </div>
                  <FormControl>
                    <ColorPicker
                      initialColor={field.value || "#000040"}
                      onColorChange={handleColorChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update Information
              </button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
