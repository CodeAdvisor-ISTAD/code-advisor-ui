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
    url: "/bookmark",
    icon: Calendar,
  },
  {
    id: 4,
    title: "ប្រវត្តិ",
    url: "/reading-history",
    icon: History,
  },
  {
    id: 5,
    title: "អំពីពួកយើង",
    url: "/about",
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

  if (
    pathname === "/content/new" ||
    pathname === "/user" ||
    pathname ==="/edituser" ||
    (pathname.startsWith("/content") && !pathname.includes("/content/tags")) ||
    pathname ==="/about" ||
    pathname.startsWith("/report") ||
    pathname === "/notification"
  ) {
    return;
  }

  return (
    <Sidebar className="ml-[100px] h-auto">
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold">CodeAdvisor</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup>
            <SidebarGroupContent>
              {items.map((item) => (
                <Collapsible
                  key={item.id}
                  className="group/collapsible"
                  disabled={!item.subItems} // Disable collapsible if no sub-items
                >
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
      </SidebarContent>
    </Sidebar>
  );
  
  
}
