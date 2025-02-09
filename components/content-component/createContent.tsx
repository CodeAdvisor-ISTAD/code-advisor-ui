"use client";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { any, z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import makeAnimated from "react-select/animated";
// import { tags } from "./option";
import RichTextEditor from "@/components/text-editor/textEditor";
import Preview from "@/components/text-editor/preview";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UseFetchContentTags } from "@/hooks/api-hook/content/use-tag";
import { useMutation } from "@tanstack/react-query";
import { createContent } from "@/hooks/api-hook/content/content-api";
import PrismLoader from "../text-editor/prismLoader";
import errorMap from "zod/locales/en.js";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "ចំណងជើងត្រូវមានយ៉ាងហោចណាស់ 5 តួអក្សរ",
  }),
  // cover: z.instanceof(File).optional(),
  cover: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "ទំហំឯកសារត្រូវតែតូចជាង 5MB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: "ប្រភេទឯកសារត្រូវតែជា JPEG, PNG, ឬ JPG",
      }
    ),

  slug: z
    .string()
    .min(5, {
      message: "Slug ត្រូវមានយ៉ាងហោចណាស់ 5 តួអក្សរ",
    })
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
      message: "ទម្រង់ Slug មិនត្រឹមត្រូវ។ ប្រើអក្សរតូច លេខ និងសញ្ញាកាត់ (-) ។",
    }),

  keyword: z
    .string()
    .min(5, {
      message: "ពាក្យគន្លឹះត្រូវមានយ៉ាងហោចណាស់ 5 តួអក្សរ",
    })
    .regex(/^[a-z]+(,[a-z]+)*$/, {
      message:
        "ពាក្យគន្លឹះត្រូវប្រើអក្សរតូច និងសញ្ញាក្បៀស (,) ។ មិនអនុញ្ញាតឱ្យមានចន្លោះឬអក្សរធំ",
    }),

  tag: z
    .array(z.string())
    .min(1, { message: "យ៉ាងហោចណាស់ត្រូវការស្លាកមួយ" })
    .max(5, { message: "អ្នកអាចជ្រើសរើសស្លាកបានត្រឹមតែ 5 ប៉ុណ្ណោះ" }),
  content: z.string().min(10, {
    message: "ការពិពណ៌នាត្រូវមានយ៉ាងហោចណាស់ 10 តួអក្សរ",
  }),
});

const CreateNewContent = () => {
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState(""); // State for RichTextEditor
  const router = useRouter();
  const { data, isLoading, isError, error } = UseFetchContentTags();
  const [slug, setSlug] = useState("");

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://media.panda.engineer/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        toast.error("បរាជ័យក្នុងការផ្ទុករូបភាព សូមព្យាយាមម្តងទៀត");
        setImagePreview("https://placehold.co/600x217?text=No+Image+Uploaded");
      }

      const result = await response.json();
      setImageUrl(result.file_url);
      // alert("THis is the url: " + result.file_url);
      return result.file_url; // Assuming the API returns the file URL
    } catch (error) {
      // console.error("Error uploading file:", error);
      throw error;
    }
  };

  const { mutate } = useMutation({
    mutationFn: createContent,
    onMutate: () => {
      return { slug };
    },
    onSuccess: (data, variables, context) => {
      toast.success("អត្ថបទត្រូវបានបោះពុម្ភផ្សាយដោយជោគជ័យ");
      router.push(`/content/${variables.slug}`);
    },
    onError: (error, variables, context) => {
      toast.error("បរាជ័យក្នុងការបោះពុម្ភផ្សាយអត្ថបទ" + error);
    },
  });

  // Transform the data into the desired format (if needed)
  const transformedTags: TagOption[] =
    data?.map((tag: { name: string }) => ({
      value: tag.name,
      label: tag.name,
    })) || [];

  // Fallback tags if fetching fails
  const fallbackTags: TagOption[] = [
    { value: "java", label: "java" },
    { value: "spring-boot", label: "spring-boot" },
    { value: "react", label: "react" },
  ];

  // Set the tags to the transformed tags or fallback tags
  const tags = isError ? fallbackTags : transformedTags;

  const animatedComponents = makeAnimated();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      keyword: "",
      tag: [],
      cover: undefined,
      content: "",
    },
  });

  // Real-time upload function
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Display image preview
      uploadFile(file);
      setImagePreview(URL.createObjectURL(file));
      setUploading(true); // Start uploading
      setTimeout(() => {
        setUploading(false); // Simulate upload completion
      }, 1000); // Simulate 1-second upload
    }
  };

  const cleanContent = (content: string) => {
    return content.replace(/<p><\/p>/g, "<br>");
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Prepare data for posting
    const postData: CreateContentType = {
      title: values.title,
      content: cleanContent(values.content),
      thumbnail: imageUrl,
      slug: values.slug,
      keywords: values.keyword,
      tags: values.tag,
      isDraft: false,
    };

    if (postData.thumbnail === null) {
      toast.error("សូមបញ្ចូលរូបភាពសម្រាប់អត្ថបទរបស់អ្នក");
      return;
    }

    mutate(postData);

    setSlug(values.slug);
  }

  return (
    <div className="container px-0 py-6 items-center mx-auto pb-6 xs:px-[30px] md:px-[80px] lg:px-[100px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        {/* Create New Content */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
            បង្កើតអត្ថបទថ្មី
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary text-xl font-bold">
                        ចំណងជើង
                      </FormLabel>
                      <FormDescription className="text-sm">
                        បញ្ចូលចំណងជើងរបស់អ្នក
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="ឧទាហរណ៍:  Bootiful Spring Boot 3.4: Spring Batch"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Cover Field */}
                <FormField
                  control={form.control}
                  name="cover"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary text-xl font-bold">
                        រូបភាព
                      </FormLabel>
                      <FormDescription className="text-sm">
                        ដាក់រូបសម្រាប់អត្ថបទ (1200 x 630)
                      </FormDescription>
                      <FormControl>
                        <div>
                          <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                field.onChange(file);
                                handleFileChange(e);
                              }
                            }}
                            disabled={uploading}
                          />
                          <label
                            htmlFor="file-upload"
                            className={`inline-block w-full sm:w-auto px-4 py-2 text-center font-medium text-white rounded-md cursor-pointer ${
                              uploading
                                ? "bg-gray-400"
                                : "bg-primary hover:bg-primary-dark"
                            }`}
                          >
                            {uploading ? "Uploading..." : "ជ្រើសរើសរូបភាព"}
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                      {uploading && (
                        <p className="text-sm text-gray-500">Uploading...</p>
                      )}
                    </FormItem>
                  )}
                />

                {/* Slug */}
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary text-xl font-bold">
                        ទិន្នន័យបង្ហាញលើ URL (Slug)
                      </FormLabel>
                      <FormDescription className="text-sm">
                        បញ្ចូលទិន្នន័យបង្ហាញលើ URL សម្រាប់អត្ថបទរបស់អ្នក
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="ឧទាហរណ៍:  bootiful-spring-boot-3.4-spring-batch"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Text Editor */}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary text-xl font-bold">
                        ការពិពណ៌នា
                      </FormLabel>
                      <FormDescription className="text-sm">
                        ចែករំលែកគំនិតរបស់អ្នក
                      </FormDescription>
                      <FormControl>
                        <RichTextEditor
                          content={editorContent}
                          onChange={(value: any) => {
                            field.onChange(value);
                            setEditorContent(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Keyword */}
                <FormField
                  control={form.control}
                  name="keyword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary text-xl font-bold">
                        ពាក្យគន្លឹះ
                      </FormLabel>
                      <FormDescription className="text-sm">
                        បញ្ចូលរូបពាក្យគន្លឹះសម្រាប់អត្ថបទរបស់អ្នក
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="ឧទាហរណ៍:  spring, spring-boot, spring-batch"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tags */}
                <FormField
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary text-xl font-bold">
                        ស្លាក #
                      </FormLabel>
                      <FormDescription className="text-sm">
                        បញ្ចូលរូបស្លាកសម្រាប់អត្ថបទរបស់អ្នក
                      </FormDescription>
                      <FormControl>
                        <Select
                          closeMenuOnSelect={true}
                          components={animatedComponents}
                          isMulti
                          options={tags}
                          placeholder="ជ្រើសរើសស្លាក"
                          maxMenuHeight={125}
                          value={tags.filter((tag) =>
                            field.value?.includes(tag.value)
                          )}
                          onChange={(selectedOptions: any) => {
                            field.onChange(
                              selectedOptions.map((option: any) => option.value)
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row-reverse gap-3 justify-start">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto text-white"
                    onClick={() => form.handleSubmit(onSubmit)}
                  >
                    បោះពុម្ភផ្សាយ
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto text-primary"
                  >
                    សេចក្តីព្រាង
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* Preview */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
            លទ្ធផលបង្ហាញ
          </h2>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image section */}
            <div>
              {imagePreview ? (
                <div className="w-full h-48 md:h-64 lg:h-72">
                  <img
                    src={imagePreview}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-[630px] md:h-64 lg:h-72 xs:h-[180px] sm:h-[250px]">
                  <img
                    src="https://placehold.co/600x217?text=No+Image+Uploaded"
                    alt="Placeholder image"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Content section */}
            <div className="p-4 md:p-6">
              <h1 className="text-xl md:text-2xl font-bold text-primary mb-4">
                {form.watch("title") || "ចំណងជើង"}
              </h1>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {form.watch("tag")?.length > 0 ? (
                    form.watch("tag")?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-sm bg-white text-primary border border-secondary rounded-md"
                      >
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className="px-2 py-1 text-sm bg-white text-primary border border-secondary rounded-md">
                      #ស្លាក
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div>
                <Preview
                  content={cleanContent(
                    form.watch("content") ||
                      "ការពិពណ៌នានេះនឹងត្រូវបានបង្ហាញនៅទីនេះ"
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewContent;
