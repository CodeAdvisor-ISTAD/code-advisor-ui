"use client";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import RichTextEditor from "@/components/text-editor/textEditor";
import Preview from "@/components/text-editor/preview";
import { UseFetchForumTags } from "@/hooks/api-hook/forum/tags-api";
import { useMutation } from "@tanstack/react-query";
import { createForum } from "@/hooks/api-hook/forum/forum-api";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const formSchema = z.object({
    title: z.string().min(5, {
        message: "ចំណងជើងត្រូវមានយ៉ាងហោចណាស់ 5 តួអក្សរ",
    }),
    cover: z.instanceof(File).optional(),
    slug: z.string().min(5, {
        message: "Slug ត្រូវមានយ៉ាងហោចណាស់ 5 តួអក្សរ",
    }),
    keyword: z.string().min(5, {
        message: "ពាក្យគន្លឹះត្រូវមានយ៉ាងហោចណាស់ 5 តួអក្សរ",
    }),
    tag: z
        .array(z.string())
        .min(1, { message: "យ៉ាងហោចណាស់ត្រូវការស្លាកមួយ" })
        .max(5, { message: "អ្នកអាចជ្រើសរើសស្លាកបានត្រឹមតែ 5 ប៉ុណ្ណោះ" }),
    introduction: z.string().min(10, {
        message: "ការពិពណ៌នាសំណួរត្រូវមានយ៉ាងហោចណាស់ 10 តួអក្សរ",
    }),
    expectedAnswers: z.string().min(10, {
        message: "ចំណងជើងត្រូវមានយ៉ាងហោចណាស់ 10 តួអក្សរ",
    }),
    description: z.string().min(10, {
        message: "ការពិពណ៌នាសំណួរត្រូវមានយ៉ាងហោចណាស់ 10 តួអក្សរ",
    }),
    isDrafted: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateNewForum = () => {
    const router = useRouter();
    const [slug, setSlug] = useState("");

    const { data, isError } = UseFetchForumTags();

    const { mutate } = useMutation({
        mutationFn: createForum,
        onMutate: () => {
            return { slug };
        },
        onSuccess: (data, variables, context) => {
            // Show success message
            toast.success(
                variables.isDrafted
                    ? "សំណួររបស់អ្នកត្រូវបានរក្សាទុកជាព្រាង"
                    : "សំណួររបស់អ្នកបានបោះពុម្ភផ្សាយដោយជោគជ័យ"
            );

            // Redirect only if it's not a draft
            if (!variables.isDrafted) {
                router.push(`/forum/${variables.slug}`);
            }
        },
        onError: (error, variables, context) => {

            // Show error message
            console.log("error : ", error);

            toast.error("មានបញ្ហាកើតឡើងនៅពេលបោះពុម្ភផ្សាយសំណួរ");
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
            introduction: "",
            expectedAnswers: "",
            description: "",
            isDrafted: false,
        },
    });

    const cleanContent = (content: string) => {
        return content.replace(/<p><\/p>/g, "<br>");
    };

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>, isDrafted: boolean) {
        const forumData: CreateForumType = {
            title: values.title,
            slug: values.slug,
            keywords: values.keyword,
            tagName: values.tag,
            introduction: values.introduction,
            expectedAnswers: values.expectedAnswers,
            description: values.description,
            isDrafted: isDrafted,
        };

        // 3. Call the mutation function with the form data.
        setSlug(values.slug);

        mutate(forumData);
    }

    return (
        <div className="container px-0 items-center mx-auto pb-6  xs:px-[30px] md:px-[80px] lg:px-[100px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                {/* Create New Content */}
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
                        ដោះស្រាយបញ្ហារបស់អ្នកនៅទីនេះ
                    </h2>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <Form {...form}>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                }}
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
                                                បញ្ចូលទិន្នន័យបង្ហាញលើ URL
                                                សម្រាប់អត្ថបទរបស់អ្នក
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

                                {/* Description */}
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-primary text-xl font-bold">
                                                ពត័មានបន្ថែម
                                            </FormLabel>
                                            <FormDescription className="text-sm">
                                                បញ្ចូលពត័មានបន្ថែមសម្រាប់ពញ្ហាដែលអ្នកបានជួបប្រទះ
                                            </FormDescription>
                                            <FormControl>
                                                <Input
                                                    placeholder="ឧទាហរណ៍:  ការរៀបចំ, គ្រប់គ្រង, និងរក្សាទុកទិន្នន័យ "
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
                                    name="introduction"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-primary text-xl font-bold">
                                                បញ្ហាដែលអ្នកជួបប្រទះ
                                            </FormLabel>
                                            <FormDescription className="text-sm">
                                                សរសេរអំពីបញ្ហាដែលអ្នកបានជួបប្រទះ
                                            </FormDescription>
                                            <FormControl>
                                                <RichTextEditor
                                                    content={field.value}
                                                    onChange={(value: any) => {
                                                        field.onChange(value);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Text Editor */}
                                <FormField
                                    control={form.control}
                                    name="expectedAnswers"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-primary text-xl font-bold">
                                                ចម្លើយដែលអ្នកចង់បាន
                                            </FormLabel>
                                            <FormDescription className="text-sm">
                                                សរសេរអំពីចម្លើយដែលអ្នកចង់បាន
                                            </FormDescription>
                                            <FormControl>
                                                <RichTextEditor
                                                    content={field.value}
                                                    onChange={(value: any) => {
                                                        field.onChange(value);
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
                                                    components={
                                                        animatedComponents
                                                    }
                                                    isMulti
                                                    options={tags}
                                                    placeholder="ជ្រើសរើសស្លាក"
                                                    maxMenuHeight={125}
                                                    value={tags.filter((tag) =>
                                                        field.value?.includes(
                                                            tag.value
                                                        )
                                                    )}
                                                    onChange={(
                                                        selectedOptions
                                                        : any) => {
                                                        field.onChange(
                                                            selectedOptions.map(
                                                                (option) =>
                                                                    option.value
                                                            )
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
                                        onClick={() =>
                                            form.handleSubmit((data) =>
                                                onSubmit(data, false)
                                            )()
                                        }
                                        className="w-full sm:w-auto text-white"
                                    >
                                        បោះពុម្ភផ្សាយ
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            form.handleSubmit((values) =>
                                                onSubmit(values, true)
                                            )()
                                        }
                                        type="submit"
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
                        {/* Content section */}
                        <div className="p-4 md:p-6">
                            <h1 className="text-xl md:text-2xl font-bold text-primary mb-4">
                                {form.watch("title") || "ចំណងជើង"}
                            </h1>

                            {/* Content */}
                            <div>
                                <h2 className="text-lg md:text-xl font-bold text-primary mt-6 mb-4">
                                    បញ្ហាដែលអ្នកបានជួបប្រទះ
                                </h2>
                                <Preview
                                    content={cleanContent(
                                        form.watch("introduction") ||
                                        "បញ្ហាដែលអ្នកបានជួបប្រទះ"
                                    )}
                                />
                            </div>

                            {/* Expected Answers */}
                            <div>
                                <h2 className="text-lg md:text-xl font-bold text-primary mt-6 mb-4">
                                    ចម្លើយដែលអ្នកចង់បាន
                                </h2>
                                <Preview
                                    content={cleanContent(
                                        form.watch("expectedAnswers") ||
                                        "ចម្លើយដែលអ្នកចង់បាន"
                                    )}
                                />
                            </div>

                            {/* Tags */}
                            <div className="mt-4">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNewForum;