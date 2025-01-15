"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface ImageUrlDialogProps {
    onInsert: (url: string) => void;
}

export function ImageUrlDialog({ onInsert }: ImageUrlDialogProps) {
    const [url, setUrl] = useState("");
    const [open, setOpen] = useState(false);

    const handleInsert = () => {
        if (url) {
            onInsert(url);
            setUrl("");
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-background hover:bg-background">បញ្ចូល Link រូបភាព</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>បញ្ចូល URL រូបភាព</DialogTitle>
                    <DialogDescription>
                        សូមបញ្ចូល URL របស់រូបភាពដែលអ្នកចង់បន្ថែម។
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input
                        id="imageUrl"
                        placeholder="https://example.com/image.jpg"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button className="text-white" type="submit" onClick={handleInsert}>
                        បញ្ចូល
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
