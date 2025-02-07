"use client";
import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, Menu } from "lucide-react";
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
    Home,
    Inbox,
    Calendar,
    Settings,
    History,
    Phone,
    Contact,
    FileQuestion,
} from "lucide-react";
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";

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
    // { id: 6, title: "ទំនាក់ទំនង", url: "#", icon: Phone },
    // { id: 7, title: "ការកំណត់", url: "#", icon: Settings },
];

interface MobileSidebarProps {
    onClose: () => void;
}

export default function MobileSidebar({ onClose }: MobileSidebarProps) {
    // @ts-ignore
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="mr-4 md:hidden absolute  right-0 bg-white">
                    <Menu className="w-10 h-10" />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px]">
                <SheetHeader>
                    <SheetTitle>CodeAdvisors</SheetTitle>
                </SheetHeader>
                <SidebarMenu>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            {items.map((item) => (
                                <Collapsible key={item.id} className="group/collapsible" disabled={!item.subItems}>
                                    <SidebarMenuItem>
                                        {item.subItems ? (
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton className="flex items-center text-[16px] px-4 py-2 hover:bg-gray-100 rounded-lg">
                                                    <item.icon className="w-4 h-4 mr-2" />
                                                    {item.title}
                                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                        ) : (
                                            <Link
                                                href={item.url}
                                                className="flex items-center text-[16px] px-4 py-2 hover:bg-gray-100 rounded-lg"
                                            >
                                                <item.icon className="w-4 h-4 mr-4" />
                                                {item.title}
                                            </Link>
                                        )}

                                        {item.subItems && (
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.subItems.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.id}>
                                                            <Link
                                                                href={subItem.url}
                                                                className="flex items-center px-4 py-1 hover:bg-gray-100 rounded-lg"
                                                            >
                                                                {subItem.title}
                                                            </Link>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        )}
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarMenu>

                {/* Login/Register buttons moved below items */}
                <div className="p-4 border-t">
                    <Button
                        onClick={() => {
                            onClose();
                            window.location.href = "/oauth2/authorization/code-advisor";
                        }}
                        className="w-full text-white bg-primary rounded hover:bg-primary-dark mb-2"
                    >
                        Login
                    </Button>
                    <Button
                        onClick={() => {
                            onClose();
                            window.location.href = "http://202.178.125.77:9090/register";
                        }}
                        className="w-full text-white bg-primary rounded hover:bg-primary-dark"
                    >
                        Register
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
