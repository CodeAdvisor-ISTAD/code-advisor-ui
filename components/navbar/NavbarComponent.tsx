'use client';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/context/userContext";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/hooks/api-hook/auth/use-profile";
import { NavbarLogin } from "./NavbarLogin";

interface NavbarComponentProps {
  onSearch: (query: string) => void;
}

export default function NavbarComponent({ onSearch }: NavbarComponentProps) {
  const route = useRouter();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
  });
  const { setUser } = useUser();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);

    if (newQuery.trim() === "") {
      onSearch(""); // Show all when search is cleared
    }
  };

  const handleSearchSubmit = () => {
    router.push(`/all-content?query=${encodeURIComponent(searchQuery)}`);
  };


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleLogoClick = () => {
    setSearchQuery('');
    onSearch('');
  };

  if(user) {
    return <NavbarLogin user={user} onSearch={onSearch} />
  }else{
    return (
      <>
        <div className="flex z-[100] items-center px-4 justify-between h-[72px] mx-[80px]">
          {/* Logo */}
          <section>
            <Link href="/" aria-label="Go to home page" onClick={handleLogoClick}>
              <Image src="/logo1.png" alt="logo" width={100} height={100} />
            </Link>
          </section>

          {/* Search Bar */}
          <div className="flex flex-1 justify-center">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="ស្វែងរក"
                className="w-full h-[35px] text-sm rounded-[5px] border border-gray-300 pl-4 pr-10 focus:outline-none"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-[5px]"
               onClick={handleSearchSubmit}
               >
              
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
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

          {/* Action Buttons */}
          <div className="flex h-[50px]">
            <Button
              onClick={() => route.push('/oauth2/authorization/code-advisor')}
              className="m-[8px] text-white bg-primary rounded-[5px] hover:bg-primary-dark transition-colors"
            >
              Login
            </Button>
            <Button
              onClick={() => route.push('http://202.178.125.77:9090/register')}
              className="m-[8px] text-white bg-primary rounded-[5px] hover:bg-primary-dark transition-colors"
            >
              Register
            </Button>
          </div>
        </div>
      </>
    )
  }
}