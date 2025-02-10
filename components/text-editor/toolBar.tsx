"use client";
import { List } from "lucide-react";
import { Toggle } from "../ui/toggle";
import {
    Heading1,
    Heading2,
    Heading3,
    Code,
    Bold,
    Italic,
    Strikethrough,
    AlignCenter,
    AlignLeft,
    AlignRight,
    Highlighter,
    Upload,
} from "lucide-react";
import { ListOrdered } from "lucide-react";

import { Editor } from "@tiptap/react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "flowbite-react";
import { useRef, useState } from "react";
import { z } from "zod";
import { ImageUrlDialog } from "./imageUrlDialog";

// Zod Schema for file validation
const fileSchema = z
    .object({
        name: z.string(),
        size: z.number().max(5 * 1024 * 1024, "File must be less than 5MB"),
        type: z.enum(["image/png", "image/jpeg", "image/jpg", "image/webp"]),
    })
    .strict();

export default function ToolBar({ editor }: { editor: Editor }) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Add a ref for the file input
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!editor) return null;
    // const handleAddImageFromUrl = () => {
    //     const url = window.prompt("URL");
    //     if (url) {
    //         editor
    //             .chain()
    //             .focus()
    //             .insertContent(`<img src="${url}" alt="Image" />`)
    //             .run();
    //     }
    //     setIsModalOpen(false); // Close the modal after inserting the image
    // };

    const handleUploadImage = async (file: File) => {
        try {
            // Validate file with Zod
            const parsedFile = fileSchema.parse({
                name: file.name,
                size: file.size,
                type: file.type,
            });

            setUploading(true);

            const formData = new FormData();
            formData.append("file", file);

            // Replace with your upload endpoint
            const response = await fetch(
                "http://167.172.78.79:8090/api/v1/files/upload?file",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Failed to upload image");
            }

            const data = await response.json();
            const imageUrl = data.file_url; // Assume the server returns the uploaded image URL
            editor
                .chain()
                .focus()
                .insertContent(`<img src="${imageUrl}" alt="Image" />`)
                .run();
        } catch (error) {
            if (error instanceof z.ZodError) {
            } else {
                console.error("Image upload failed:", error);
            }
        } finally {
            setUploading(false);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleUploadImage(file);
        }
    };

    const openFilePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Programmatically trigger the file input
        }
    };

    const Options = [
        {
            icon: <Heading1 className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
            preesed: editor.isActive("heading", { level: 1 }),
        },
        {
            icon: <Heading2 className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
            preesed: editor.isActive("heading", { level: 2 }),
        },
        {
            icon: <Heading3 className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 3 }).run(),
            preesed: editor.isActive("heading", { level: 3 }),
        },
        {
            icon: <Bold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            preesed: editor.isActive("bold"),
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            preesed: editor.isActive("italic"),
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            preesed: editor.isActive("strike"),
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            preesed: editor.isActive({ textAlign: "left" }),
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            preesed: editor.isActive({ textAlign: "center" }),
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            preesed: editor.isActive({ textAlign: "right" }),
        },
        {
            icon: <List className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            preesed: editor.isActive("bulletList"),
        },
        {
            icon: <ListOrdered className="size-4" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            preesed: editor.isActive("orderedList"),
        },
        {
            icon: <Code className="size-4" />,
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
            preesed: editor.isActive("codeBlock"),
        },
        {
            icon: <Highlighter className="size-4" />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            preesed: editor.isActive("highlight"),
        },

        {
            icon: <Upload className="size-4" />,
            onClick: null, // Dropdown will handle the onClick
            dropdown: true, // Mark this option as a dropdown
            preesed: editor.isActive("highlight"),
        },
    ];

    return (
        <div className="border rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 top-10 z-50">
            {Options.map((option, i) => (
                <div key={i} className="inline-block">
                    {option.dropdown ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="bg-primary">{option.icon}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <ImageUrlDialog
                                        onInsert={(url) => {
                                            editor
                                                .chain()
                                                .focus()
                                                .insertContent(
                                                    `<img src="${url}" alt="Image" />`
                                                )
                                                .run();
                                        }}
                                    />
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onSelect={openFilePicker}>
                                    ជ្រើសរើសរូបភាព
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Toggle
                            size="sm"
                            pressed={option.preesed}
                            onPressedChange={option.onClick ?? undefined}
                        >
                            {option.icon}
                        </Toggle>
                    )}
                </div>
            ))}
            {/* Hidden file input for selecting images */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInputChange}
                disabled={uploading}
            />
        </div>
    );
}
