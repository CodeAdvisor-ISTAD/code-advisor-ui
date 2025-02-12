"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronDown, Menu, User, LogOut } from "lucide-react";
import { Home, Inbox, Calendar, Settings, History, Phone, Contact, FileQuestion } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ToggleTheme } from "@/components/switch-theme/toggleTheme";
import { AnimatePresence, motion } from "framer-motion";
import {usePathname, useRouter} from "next/navigation";
import { Dropdown, DropdownItem } from "flowbite-react";
import { FiBell, FiEdit2 } from "react-icons/fi";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import router from "next/router";
import { UserInformation } from "@/types/user";
import { getOwnUserProfile } from "@/hooks/api-hook/user/user-service";

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

interface MobileSidebarLoginProps {
    onClose: () => void;
}

export default function MobileSidebarLogin({ onClose }: MobileSidebarLoginProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});
    const [unreadCount, setUnreadCount] = useState<number>(0); // Add unread count state
    const [userInformation, setUserInformation] =
        useState<UserInformation | null>(null);

        useEffect(() => {
            async function fetchUserProfile() {
                const data = await getOwnUserProfile();
                setUserInformation(data);
            }
        
            fetchUserProfile();
          }, [userInformation]);

    const toggleMenu = (id: number) => {
        setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleNotificationClick = () => {
        // Define notification click behavior
        console.log("Notification clicked!");
        setUnreadCount(0); // Example: reset unread count on click
    };

    

    return (
        <Sheet>
            {/* Trigger Button */}
            {/* Menu Button */}
            <SheetTrigger asChild>
                <Button className="mr-4 md:hidden p-2" variant="ghost">
                    <Menu className="w-5 h-5 text-primary dark:text-white" />
                </Button>
            </SheetTrigger>

            {/* Sidebar Content */}
            <SheetContent className="w-[280px] p-0 dark:bg-darkPrimary">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>CodeAdvisors</SheetTitle>
                </SheetHeader>


                <div className="p-4">
                    {/* User Section (Avatar, Theme, Buttons) */}
                    <div className="flex items-center justify-between mb-4">


                        {/* Create Buttons */}
                        <div className="flex gap-2">
                            <Button
                                className="bg-primary text-white px-2 py-1 text-xs flex items-center gap-1 shadow-sm hover:bg-primary-dark"
                                onClick={() => router.push("/content/new")}
                            >
                                <span>បង្កើតអត្ថបទ</span>
                            </Button>
                            <Button
                                className="bg-primary text-white px-2 py-1 text-xs flex items-center gap-1 shadow-sm hover:bg-primary-dark"
                                onClick={() => router.push("/forum/new")}
                            >
                                <span>បង្កើតការពិភាក្សា</span>
                            </Button>

                        </div>
                        <DropdownMenu>

                            <ToggleTheme />

                            <DropdownMenuTrigger asChild>
                            <Avatar className="h-8 w-8 cursor-pointer">
                                <AvatarImage src={userInformation?.profileImage} alt="User avatar" />
                                <AvatarFallback />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-52" align="end">
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <a href={`/user-profile/${userInformation?.username}`}>
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>ប្រវត្តិរូប</span>
                                    </DropdownMenuItem>
                                </a>

                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span onClick={() => router.push("http://202.178.125.77:9090/logout")}>
                                        ចាកចេញ
                                    </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>


                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="rounded-lg overflow-hidden"
                            >
                                {item.subItems ? (
                                    <div>
                                        <button
                                            onClick={() => toggleMenu(item.id)}
                                            className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-100 transition-all dark:hover:bg-darkSecondary"
                                        >
                                            <div className="flex items-center gap-2">
                                                <item.icon className="text-xl" />
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
                                                                className="block p-2 hover:bg-gray-100 rounded-md transition dark:hover:bg-darkSecondary"
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
                                            <item.icon className="text-xl" />
                                            {item.title}
                                        </Link>
                                    </SheetClose>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </SheetContent>
        </Sheet>
    );
}