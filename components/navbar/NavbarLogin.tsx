"use client";
import { Dropdown, DropdownItem, Navbar, NavbarBrand } from "flowbite-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { FiBell, FiEdit2 } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Notification } from "@/types/notifications";
import { WebSocketService } from "@/lib/websocket";
import { useEffect, useState } from "react";
import { fetchNotifications } from '@/lib/api';
import {useUser} from "@/lib/context/userContext";
import { useSearch } from "@/lib/context/SearchContext";

export function NavbarLogin({ user }: { user: any }) {
    const route = useRouter();
    const { searchValue, setSearchValue } = useSearch();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [lastCheckedTime, setLastCheckedTime] = useState<number>(
        typeof window !== 'undefined' ? Number(localStorage.getItem('lastNotificationCheck') || '0') : 0
    );

  const [userUuid, setUserUuid] = useState(user?.uuid || "");

  useEffect(() => {
    if (!user || !user.uuid) {
      return;
    }

    const userUuid = user.uuid;

    const wsService = new WebSocketService(
      "http://127.0.0.1:8168/notifications/ws",
      userUuid
    );

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

    route.push("/notification");
  };

  return (
    <div className="flex z-[100] items-center px-4 justify-between h-[72px] mx-[80px]">
      {/* Logo */}
      <section>
        <Link href="/" aria-label="Go to home page">
          <Image src="/logo1.png" alt="logo" width={100} height={100} />
        </Link>
      </section>

            {/* Search Bar */}
            <div className="flex flex-1 justify-center">
                <div className="relative w-[800px]">
                    <input               
                        onChange={(e) => setSearchValue(e.target.value)}
                        type="text"
                        placeholder="ស្វែងរក"
                        className="w-full h-[35px] text-sm rounded-[5px] border border-gray-300 pl-4 pr-10 focus:outline-none"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-[5px]">
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
      <div className="flex items-center mx-8">
        <div className="bg-primary px-4 rounded-md text-white">
          <Dropdown
            inline
            label={
              <div className="flex items-center space-x-2 bg-primary py-2 rounded-md text-white shadow hover:bg-primary-dark">
                <span className="text-sm font-medium">បង្កើតថ្មី</span>
                <FiEdit2 className="text-white" />
              </div>
            }
          >
            <DropdownItem className="text-black">
              <span onClick={() => route.push("/content/new")}>
                បង្កើតអត្ថបទ
              </span>
            </DropdownItem>
            <DropdownItem className="text-black">
              <Link href="/forum/new">បង្កើត Forum</Link>
            </DropdownItem>
          </Dropdown>
        </div>

        {/* Notification Icon */}
        <button
          className="relative text-primary mx-8"
          onClick={handleNotificationClick}
        >
          <FiBell className="h-7 w-7" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

                {/* User Avatar */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="h-8 w-8 cursor-pointer">
                            <AvatarImage src={user?.profileImage} alt="User avatar"/>
                            <AvatarFallback></AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                        <a href={`/user-profile/${user?.username}`}>
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4"/>
                                    <span>ប្រវត្តិរូប</span>
                                </DropdownMenuItem>
                            </a>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4"/>
                                <span>ដាស់ផ្ទាំងគ្រប់គ្រង</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center">
                                        <Moon className="mr-2 h-4 w-4"/>
                                        <span>មុខងារងងឹត</span>
                                    </div>
                                    <Switch/>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className="text-red-600">
                            <LogOut className="mr-2 h-4 w-4"/>
                            <span onClick={() => route.push("http://127.0.0.1:9090/logout")}>
                                ចាកចេញ
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export default NavbarLogin;
