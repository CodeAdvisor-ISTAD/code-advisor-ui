"use client";
import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, Menu } from "lucide-react";
import { Home, Inbox, Calendar, Settings, History, Phone, Contact, FileQuestion } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ToggleTheme } from "@/components/switch-theme/toggleTheme";
import { AnimatePresence, motion } from "framer-motion";
import {usePathname, useRouter} from "next/navigation";

// Define the same items array as in AppSidebar
const items = [
    {
        id: 1,
        title: "អត្ថបទ",
        url: "/home",
        icon: Home,
        subItems: [
            { id: 1, title: "ថ្មីៗ", url: "/home" },
            { id: 2, title: "ពេញនិយម", url: "#" },
            { id: 3, title: "ស្លាក", url: "/content/tags" },
        ],
    },
    {
        id: 18,
        title: "សំណួរទូទៅ",
        url: "",
        icon: FileQuestion,
        subItems: [
            { id: 1, title: "ថ្មីៗ", url: "/forum" },
            { id: 2, title: "ពេញនិយម", url: "/forum" },
            { id: 3, title: "ស្លាក", url: "/forum/tags" },
        ],
    },
    { id: 2, title: "ការពិភាក្សា", url: "#", icon: Inbox },
    { id: 3, title: "កត់ចាំណាំ", url: "/bookmark", icon: Calendar },
    { id: 4, title: "ប្រវត្តិ", url: "/reading-history", icon: History },
    { id: 5, title: "អំពីពួកយើង", url: "/about", icon: Contact },
];

interface MobileSidebarProps {
    onClose: () => void;
}

export default function MobileSidebar({ onClose }: MobileSidebarProps) {
    const route = useRouter();
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});

    const toggleMenu = (id: number) => {
        setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (

        <Sheet  >
            {/* Trigger Button */}
            <SheetTrigger asChild>
                <Button className="mr-4 md:hidden " variant="ghost">

                    <Menu className="w-6 h-6 text-primary dark:text-white" />
                </Button>
            </SheetTrigger>

            {/* Sheet Content - Sidebar Menu */}
            <SheetContent className="w-[300px] p-0 dark:text-white dark:bg-darkPrimary ">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle className="dark:text-white">CodeAdvisors</SheetTitle>
                </SheetHeader>
                <div className="p-4 ">

                    <div className="flex justify-end  ">
                        <ToggleTheme /></div>

                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="rounded-lg overflow-hidden dark:text-white"
                            >
                                {item.subItems ? (
                                    <div>
                                        <button
                                            onClick={() => toggleMenu(item.id)}
                                            className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-100 transition-all dark:hover:bg-darkSecondary dark:text-white"
                                        >
                                            <div className="flex items-center gap-2">
                                                <item.icon className="text-xl dark:text-white" />
                                                {item.title}
                                            </div>
                                            <ChevronDown
                                                className={`transition-transform ${
                                                    openMenus[item.id] ? "rotate-180" : "rotate-0"
                                                }`}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {openMenus[item.id] && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="ml-5 mt-2 space-y-2"
                                                >
                                                    {item.subItems.map((subItem) => (
                                                        <SheetClose asChild key={subItem.id}>
                                                            <Link
                                                                href={subItem.url}
                                                                className="block p-2 hover:bg-gray-100 rounded-md transition dark:hover:bg-darkSecondary dark:text-white"
                                                            >
                                                                {subItem.title}
                                                            </Link>
                                                        </SheetClose>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <SheetClose asChild>
                                        <Link
                                            href={item.url}
                                            className={`flex items-center gap-2 p-3 rounded-md transition-all ${
                                                pathname === item.url ? "bg-gray-100" : "hover:bg-gray-100 dark:hover:bg-darkSecondary"
                                            }`}
                                        >
                                            <item.icon className="text-xl dark:text-white" />
                                            {item.title}
                                        </Link>
                                    </SheetClose>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Login/Register buttons moved below items */}
                <div className="p-4 border-t ">
                    <div className="mb-2">
                    </div>
                    <SheetClose asChild>
                        <Button
                            onClick={() => {
                                onClose();
                                route.push('/oauth2/authorization/code-advisor');
                            }}
                            className="w-full text-white bg-primary rounded-[5px] hover:bg-primary-dark transition-colors mb-2"
                        >
                            ចូលប្រើ
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button
                            onClick={() => {
                                onClose();
                                route.push('https://identity.code-advisors.istad.co/register');
                            }}
                            className="w-full text-white bg-primary rounded-[5px] hover:bg-primary-dark transition-colors"
                        >
                            បង្កើតគណនី
                        </Button>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    );
}