import {
 
    Dropdown,
    DropdownItem,
    DropdownHeader,
    Navbar,
    NavbarBrand,
  } from "flowbite-react";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { LogOut, Moon, Settings, User } from 'lucide-react'
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { Switch } from "@/components/ui/switch"
  import Image from "next/image";
  import { FiSearch, FiBell, FiEdit2 } from "react-icons/fi";
  
  export function NavbarLogin() {
    return (
      <Navbar fluid rounded className="bg-white shadow-md">
        {/* Navbar Brand */}
        <NavbarBrand href="/">
          <div className="flex items-center px-4 justify-between h-[72px] mx-[80px]">
            <Image
              src="/logo.jpg" // Replace with your logo path
              alt="Code Advisors Logo"
              width={100}
              height={100}
            />
          </div>
        </NavbarBrand>
  
        {/* Search Bar */}
        <div className="flex flex-1 justify-center ">
          <div className="relative w-[800px]">
            <input
              type="text"
              placeholder="ស្វែងរក"
              className="w-full h-[35px] text-sm rounded-[5px]  border border-gray-300 bg-gray-100 py-2 pl-10 pr-3 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
          </div>
        </div>
  
        {/* Action Icons */}
        <div className="flex items-center space-x-6 md:order-2 ">
         
         <div className=" bg-primary px-4  rounded-md text-white"> {/* Button with Dropdown */}
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
          <button className="relative text-primary  ">
            <FiBell className="h-7 w-7" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              
            </span>
          </button>
  
          {/* User Avatar */}
          <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src="/8jpg.jpg" alt="User avatar" />
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
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>ប្រវត្តិរូប</span>
            </DropdownMenuItem>
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
  