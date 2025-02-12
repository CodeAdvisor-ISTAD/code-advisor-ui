"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  TableOfContentsIcon
} from "lucide-react";

const items = [
  {
    id: 1,
    title: "អត្ថបទ",
    url: "/",
    icon: FileQuestion,
    subItems: [
      { id: 1, title: "ថ្មីៗ", url: "/" },
      { id: 2, title: "ពេញនិយម", url: "/" },
      { id: 3, title: "ស្លាក", url: "/content/tags" },
    ],
  },
  {
    id: 2,
    title: "សំណួរ",
    url: "/forums",
    icon: TableOfContentsIcon,
    subItems: [
      { id: 1, title: "ថ្មីៗ", url: "/forum" },
      { id: 2, title: "ពេញនិយម", url: "/forum" },
      { id: 3, title: "ស្លាក", url: "/content/tags" },
    ],
  },
  // { id: 3, title: "ការពិភាក្សា", url: "#", icon: Inbox },
  { id: 4, title: "កត់ចាំណាំ", url: "/bookmark", icon: Calendar },
  { id: 5, title: "ប្រវត្តិ", url: "/reading-history", icon: History },
  { id: 6, title: "អំពីពួកយើង", url: "/about", icon: Contact },
  // { id: 7, title: "ទំនាក់ទំនង", url: "#", icon: Phone },
  // { id: 8, title: "ការកំណត់", url: "#", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});

  const toggleMenu = (id: number) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="w-[256px] bg-white border rounded-sm p-5 sticky top-0 h-screen hidden md:block dark:bg-darkPrimary">
      <h2 className="text-xl font-bold">CodeAdvisors</h2>
      <div className="mt-6 space-y-2">
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
                          <Link
                            key={subItem.id}
                            href={subItem.url}
                            className="block p-2  hover:bg-gray-100 rounded-md transition dark:hover:bg-darkSecondary"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={item.url}
                  className={`flex items-center gap-2 p-3 rounded-md transition-all ${
                    pathname === item.url ? "bg-gray-100" : "hover:bg-gray-100 dark:hover:bg-darkSecondary"
                  }`}
                >
                  <item.icon className="text-xl" />
                  {item.title}
                </Link>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </aside>
  );
}
