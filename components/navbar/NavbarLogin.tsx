"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiBell, FiEdit2 } from "react-icons/fi";
import { Dropdown, DropdownItem } from "flowbite-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WebSocketService } from "@/lib/websocket";
import { fetchNotifications } from "@/lib/api";
import { useUser } from "@/lib/context/userContext";
import { Notification } from "@/types/notifications";
import MobileSidebarLogin from "@/components/sidebar/sidebarLogin";
import { ToggleTheme } from "@/components/switch-theme/toggleTheme";
import { useTheme } from "next-themes";

interface NavbarLoginProps {
  user: any;
}

export function NavbarLogin({ user }: NavbarLoginProps) {
  const { theme } = useTheme();
  const [isMobileSidebarLoginOpen, setMobileSidebarLoginOpen] = useState(false);
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [lastCheckedTime, setLastCheckedTime] = useState<number>(
    typeof window !== "undefined"
      ? Number(localStorage.getItem("lastNotificationCheck") || "0")
      : 0
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleLogoClick = () => {
    setSearchQuery('');
    // Optionally, reset search results when logo is clicked
  };

  const handleSearchSubmit = () => {
    router.push(`/all-content?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    if (!user || !user.uuid) {
      return;
    }

    const userUuid = user?.uuid;

    const wsService = new WebSocketService("/notifications/ws", userUuid);

    wsService.onNotification((notification) => {
      setNotifications((prev) => [notification, ...prev]);
      const notificationTime = new Date(notification.createdAt).getTime();
      if (notificationTime > lastCheckedTime) {
        setUnreadCount((prev) => prev + 1);
      }
    });
    wsService.connect();

    const loadInitialNotifications = async () => {
      try {
        const initialNotifications = await fetchNotifications(userUuid);
        setNotifications(initialNotifications);

        const newNotificationsCount = initialNotifications.filter(
          (notification) =>
            new Date(notification.createdAt).getTime() > lastCheckedTime &&
            !notification.read
        ).length;

        setUnreadCount(newNotificationsCount);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    loadInitialNotifications();

    return () => {
      wsService.disconnect();
    };
  }, [user, lastCheckedTime]);

  const handleNotificationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentTime = Date.now();
    setLastCheckedTime(currentTime);
    setUnreadCount(0);

    if (typeof window !== "undefined") {
      localStorage.setItem("lastNotificationCheck", currentTime.toString());
    }

    router.push("/notification");
  };

  return (
    <div className="flex items-center border mb-2 bg-white justify-between h-[72px] px-6 md:px-[100px]">
      {/* Logo */}
      <section>
        <Link href="/" aria-label="Go to home page" onClick={handleLogoClick}>
          {theme === "dark" ? (
            <Image src="/Logo-dark.png" alt="logo" width={100} height={100} />
          ) : (
            <Image src="/logo1.png" alt="logo" width={100} height={100} />
          )}
        </Link>
      </section>

      {/* Search Bar */}
      <div className="flex flex-1 justify-center">
        <div className="relative w-full max-w-[800px]">
          <input
            type="text"
            placeholder="ស្វែងរក"
            className="w-full h-[35px] text-sm rounded-[5px] border border-gray-300 pl-4 pr-10 focus:outline-none dark:border-black"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-[5px]"
            onClick={handleSearchSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m2.85-6.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-3">
        {/* Hide Dark Mode Toggle on md and below */}
        <div className="hidden md:flex">
          <ToggleTheme />
        </div>

        {/* Create Dropdown */}
        <div className="bg-primary rounded-md text-white px-3 hidden md:flex dark:bg-secondary">
          <Dropdown
            inline
            label={
              <div className="flex items-center space-x-2  py-2 rounded-md text-white shadow hover:bg-primary-dark ">
                <span className="text-sm font-medium">បង្កើតថ្មី</span>
                <FiEdit2 className="text-white" />
              </div>
            }
          >
            <DropdownItem className="text-black dark:hover:bg-secondary">
              <span onClick={() => router.push("/content/new")}>
                បង្កើតអត្ថបទ
              </span>
            </DropdownItem>
            <DropdownItem className="text-black dark:hover:bg-secondary">
              <Link href="/forum/new">បង្កើតពិភាក្សា</Link>
            </DropdownItem>
          </Dropdown>
        </div>

        {/* Notification Icon */}
        <button
          className="relative text-primary "
          onClick={handleNotificationClick}
        >
          <FiBell className="h-5 w-5 md:h-7 md:w-7 md:ml-0 ml-2 dark:text-secondary " />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer hidden md:block">
              <AvatarImage src={user?.profileImage} alt="User avatar" />
              <AvatarFallback />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <a href={`/user-profile/${user?.username}`}>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>ប្រវត្តិរូប</span>
                </DropdownMenuItem>
              </a>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span
                onClick={() => router.push("http://202.178.125.77:9090/logout")}
              >
                ចាកចេញ
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <MobileSidebarLogin onClose={() => setMobileSidebarLoginOpen(false)} />
    </div>
  );
}
