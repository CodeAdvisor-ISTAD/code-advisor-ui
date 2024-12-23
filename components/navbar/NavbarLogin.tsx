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
import { FiSearch, FiBell, FiEdit2 } from "react-icons/fi";

export function NavbarLogin() {
  return (
    <Navbar
      fluid
      rounded
      className="flex z-[100] items-center px-4 justify-between h-[72px] mx-[80px]"
    >
      {/* Navbar Brand */}
      <NavbarBrand href="/">
        <div className="mr-16">
          <Image
            src="/logo1.png" // Replace with your logo path
            alt="Code Advisors Logo"
            width={100}
            height={100}
          />
        </div>
      </NavbarBrand>

      {/* Search Bar */}
      <div className="flex flex-1 justify-center">
        <div className="relative w-[800px]">
          <input
            type="text"
            placeholder="ស្វែងរក"
            className="w-full h-[35px] text-sm rounded-[5px] border border-gray-300 pl-4 pr-10 focus:outline-none "
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-[5px] ">
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
      <div className="flex items-center mx-8  ">
        <div className=" bg-primary px-4  rounded-md text-white">
          {" "}
          {/* Button with Dropdown */}
          <Dropdown
            inline
            label={
              <button className="flex items-center space-x-2 bg-primary py-2 rounded-md text-white shadow hover:bg-primary-dark">
                <span className="text-sm font-medium">បង្កើតថ្មី</span>
                <FiEdit2 className="text-white" />
              </button>
            }
          >
            <DropdownItem className="text-black">បង្កើតអត្ថបទ</DropdownItem>
            <DropdownItem className="text-black">បង្កើត Forum</DropdownItem>
          </Dropdown>
        </div>

        {/* Notification Icon */}
        <a href="/notification">
        <button  className="relative text-primary mx-8 ">
          <FiBell className="h-7 w-7" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-xs text-white"></span>
        </button></a>

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="/user.jpg" alt="User avatar" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            {/* <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">ប្រវត្តិរូប</p>
              <p className="text-xs text-muted-foreground">name@example.com</p>
            </div>
          </DropdownMenuLabel> */}
            <DropdownMenuSeparator />
          
            <DropdownMenuGroup>
            <a href="/user">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>ប្រវត្តិរូប</span>
              </DropdownMenuItem>
              </a>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>ដាស់ផ្ទាំងគ្រប់គ្រង</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <Moon className="mr-2 h-4 w-4" />
                    <span>មុខងារងងឹត</span>
                  </div>
                  <Switch />
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>ចាកចេញ</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Navbar>
  );
}

export default NavbarLogin;
