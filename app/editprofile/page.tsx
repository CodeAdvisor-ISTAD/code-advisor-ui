"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/userprofile/textarea";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/userprofile/hover-card";

import { CardDescription, CardFooter, CardTitle } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/userprofile/form";
import EditUserInformationForm from "@/components/userprofile/EditUserInformationForm";
import { ColorPicker } from "@/components/userprofile/colorPicker";

// Define the form validation schema using zod
const formSchema = z.object({
  bio: z.string(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  username: z.string().min(2),
  university: z.string(),
  fullName: z.string(),
  country: z.string(),
  email: z.string().email(),
  backgroundColor: z.string(),
});

// Infer the form schema type
type FormSchema = z.infer<typeof formSchema>;

// ProfileEdit component allows users to edit their profile information
export default function ProfileEdit(): JSX.Element {
  // State to manage the profile image
  const [image, setImage] = useState<string>("/placeholder.svg");
  // State to manage the background color
  const [bgColor, setBgColor] = useState<string>("#000040");
  // State to manage the visibility of the color input
  const [showColorInput, setShowColorInput] = useState<boolean>(false);

  // Initialize the form with default values and validation schema
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: "Everything is difficult until you know how to do it 💫",
      firstName: "Lyzhia",
      lastName: "Eung",
      username: "lyzhia",
      university: "Royal University Of PhnomPenh",
      fullName: "Eung Lyzhia",
      email: "lyzhia@168",
      backgroundColor: "#000040",
    },
  });

  // Handles form submission and logs the form values
  const onSubmit: SubmitHandler<FormSchema> = (values) => {
    console.log(values);
  };

  // Reads the selected image file and updates the profile image state
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Updates the background color state
  const handleColorChange = (color: string) => {
    setBgColor(color.startsWith('#') ? color : `#${color}`);
  };

  return (
    <div className="w-[1224px] mx-auto p-4">
      {/* Profile header with background color */}
      <div
        className="relative w-[1224px] flex justify-center h-48 rounded-lg mb-16"
        style={{ backgroundColor: bgColor }}
      >
        {/* Profile image section */}
        <div className="flex flex-row absolute -bottom-28 left-8">
          <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden border-4 border-white bg-white">
            <Image src={image} alt="Profile" fill className="object-cover" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="avatarInput"
            />
            <Image
              src="/edit-icon.svg"
              alt="Edit"
              className="absolute bottom-2 right-2 cursor-pointer"
              width={24}
              height={24}
              onClick={() => document.getElementById("avatarInput")?.click()}
            />
          </div>
          {/* Profile details section */}
          <div className="flex items-center justify-between absolute -right-48 top-28">
            <div className="">
              <div className="flex ">
                <h2 className="text-2xl font-bold">Eung Lyzhia</h2>
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer">
                    ✨
                  </HoverCardTrigger>
                  <HoverCardContent>ITE-Student</HoverCardContent>
                </HoverCard>
              </div>
              <p className="text-sm text-muted-foreground">@lyzhia</p>
              <p className="text-sm text-muted-foreground​ font-khFont">
                គាត់គឺជា Senior
              </p>
            </div>
          </div>
        </div>
        {/* Background color input and edit button */}
        <div className="absolute top-4 right-4 flex gap-2 items-center">
          {showColorInput && (
            <div className="relative">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                #
              </span>
              <Input
                id="colorInput"
                type="text"
                placeholder="Hex color"
                value={bgColor.slice(1)} // Remove the "#" for display
                onChange={(e) => {
                  const input = e.target.value
                    .replace(/[^0-9A-Fa-f]/g, "")
                    .slice(0, 6);
                  handleColorChange(`#${input}`);
                }}
                className="w-32 pl-6"
                maxLength={6}
              />
            </div>
          )}
        </div>
      </div>

      {/* Form section */}
      <div className="flex flex-row justify-center mt-[125px] gap-[15px]">
        <EditUserInformationForm />
        {/* Additional profile settings */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="onSubmit={form.handleSubmit(onSubmit)} space-y-6"
          >
            {/* Bio field */}
            <FormField
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
            />
            <FormField
              control={form.control}
              name="backgroundColor"
              render={({ field }) => (
                <FormItem className="flex flex-col bg-white w-[510px] justify-center items-center pb-[25px] pt-[25px] rounded-lg border-2">
                  <div className="">
                    <CardTitle className="font-khFont w-[450px] text-2xl pb-6 text-start">
                      ផ្ទាំងខាងក្រោយ
                    </CardTitle>
                    <FormControl>
                      <ColorPicker
                        initialColor={bgColor}
                        onColorChange={handleColorChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="text-end ">
              <Button type="submit" className="text-white mr-2">
                Save
              </Button>
              <Button type="button" className="text-white">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
