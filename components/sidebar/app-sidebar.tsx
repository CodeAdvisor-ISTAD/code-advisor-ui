"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Home,
  Inbox,
  Calendar,
  Settings,
  ChevronDown,
  History,
  Phone,
  Contact,
  FileQuestion,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { usePathname } from "next/navigation";
import Link from "next/link";

const items = [
  {
    id: 1,
    title: "អត្ថបទ",
    url: "#",
    icon: Home,
    subItems: [
      {
        id: 1,
        title: "ថ្មីៗ",
        url: "#",
      },
      {
        id: 2,
        title: "ពេញនិយម",
        url: "#",
      },
      {
        id: 3,
        title: "ស្លាក",
        url: "#",
      },
    ],
  },
  {
    id: 18,
    title: "សំណួរទូទៅ",
    url: "/forum",
    icon: FileQuestion,
    subItems: [
      {
        id: 1,
        title: "ថ្មីៗ",
        url: "/forum",
      },
      {
        id: 2,
        title: "ពេញនិយម",
        url: "/trending",
      },
      {
        id: 3,
        title: "ស្លាក",
        url: "/tag",
      },
    ],
  },
  {
    id: 2,
    title: "ការពិភាក្សា",
    url: "#",
    icon: Inbox,
  },
  {
    id: 3,
    title: "កត់ចាំណាំ",
    url: "#",
    icon: Calendar,
  },
  {
    id: 4,
    title: "ប្រវត្តិ",
    url: "#",
    icon: History,
  },
  {
    id: 5,
    title: "អំពីពួកយើង",
    url: "# ",
    icon: Contact,
  },
  {
    id: 6,
    title: "ទំនាក់ទំនង",
    url: "#",
    icon: Phone,
  },
  {
    id: 7,
    title: "ការកំណត់",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

<<<<<<< HEAD
    if (pathname === "/content/new" || pathname === "/user" || pathname === "/edituser" || pathname.startsWith("/content") ) {
=======
  if (
    pathname === "/content/new" ||
    pathname === "/user" ||
    pathname === "/edit-user" ||
    pathname.startsWith("/content") ||
    pathname.startsWith("/report")
  ) {
    return;
  }
    if (pathname === "/content/new" || pathname === "/user" || pathname === "/edit-user" || pathname.startsWith("/content") || pathname.startsWith("/about") ) {
>>>>>>> 8809e3425fe4e8ecee94a795021b264117265e02
        return;
    }

  return (
    <Sidebar className="ml-[100px]">
      <SidebarHeader className="p-4 ">
        <h2 className="text-lg font-semibold">CodeAdvisor</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup>
            <SidebarGroupContent>
              {items.map((item) => (
                <Collapsible key={item.id} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="text-[16px]">
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.title}
                        {item.subItems && (
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.id}>
                            <Link
                              href={item.url}
                              className="flex items-center px-4 py-1 hover:bg-gray-100 rounded-lg"
                            >
                              {subItem.title}
                            </Link>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
