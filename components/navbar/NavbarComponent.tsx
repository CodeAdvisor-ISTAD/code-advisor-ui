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
import { ToggleTheme } from "../switch-theme/toggleTheme";
import { useTheme } from "next-themes";
import MobileSidebar from "@/components/sidebar/sidebar";

interface NavbarComponentProps {
  onSearch: (query: string) => void;
}

export default function NavbarComponent() {
  const route = useRouter();
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
  });
  const { setUser } = useUser();
  const { theme } = useTheme();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);

    if (newQuery.trim() === "") {
      // Optionally, clear the search results when query is empty
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      route.push(`/all-content?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleLogoClick = () => {
    setSearchQuery('');
    // Optionally, reset search results when logo is clicked
  };

  if (user) {
    return <NavbarLogin user={user} />;
  } else {
    return (
        <>
          <div className="flex items-center border mb-2 bg-white justify-between h-[72px] md:px-[100px] dark:bg-darkPrimary">
            {/* Logo */}
            <section>
              <Link href="/" aria-label="Go to home page" onClick={handleLogoClick}>
                {theme === 'dark' ? (
                    <Image src="/Logo-dark.png" alt="logo" width={100} height={100} />
                ) : (
                    <Image src="/logo1.png" alt="logo" width={100} height={100} />
                )}
              </Link>
            </section>

            {/* Search Bar */}
            <div className="flex flex-1 justify-center">
              <div className="relative w-full max-w-2xl">
                <input
                    type="text"
                    placeholder="ស្វែងរក"
                    className="w-full h-[35px] text-sm rounded-[5px] border border-gray-300  pl-4 pr-10 focus:outline-none dark:border-darkSecondary"
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
            <div className="hidden md:flex space-x-4">
              <ToggleTheme />
              <Button
                  onClick={() => route.push('/oauth2/authorization/code-advisor')}
                  className="text-white bg-primary rounded-[5px] hover:bg-primary-dark transition-colors"
              >
                ចូលប្រើ
              </Button>
              <Button
                  onClick={() => route.push('https://identity.code-advisors.istad.co/register')}
                  className="text-white bg-primary rounded-[5px] hover:bg-primary-dark transition-colors"
              >
                បង្កើតគណនី
              </Button>
            </div>

            {/* Mobile Sidebar */}
            <MobileSidebar onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </>
    );
  }
}
