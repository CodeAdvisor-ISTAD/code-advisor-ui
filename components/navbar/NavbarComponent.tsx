// NavbarComponent.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/context/userContext";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/hooks/api-hook/auth/use-profile";
import { NavbarLogin } from "./NavbarLogin";
import { Menu } from "lucide-react";
import MobileSidebar from "@/components/sidebar/sidebar";

interface NavbarComponentProps {
  onSearch: (query: string) => void;
}

export default function NavbarComponent({ onSearch }: NavbarComponentProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
      onSearch("");
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
    setSearchQuery("");
    onSearch("");
  };

  // If user is logged in, show the logged-in version of the navbar
  if (user) {
    return <NavbarLogin user={user} onSearch={onSearch} />;
  } else {
    return (
        <>
          <div className="flex items-center justify-between px-4 mx-4 lg:mx-[80px] h-[72px]">
            <section className="flex items-center">
              <Link href="/" aria-label="Go to home page" onClick={handleLogoClick}>
                <Image src="/logo1.png" alt="logo" width={100} height={100} />
              </Link>
            </section>
            {/* Search Bar */}
            <div className="flex flex-1 justify-center">
              <div className="relative w-full max-w-2xl mr-10 md:mx-0">
                <input
                    type="text"
                    placeholder="ស្វែងរក"
                    className="w-full h-[35px] text-sm rounded-[5px] border border-gray-300 pl-4 pr-10  focus:outline-none"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                />
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
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
            {/* Action Buttons visible only on desktop */}
            <div className="hidden md:flex gap-2">
              <Button
                  onClick={() =>
                      router.push("/oauth2/authorization/code-advisor")
                  }
                  className="text-white bg-primary rounded hover:bg-primary-dark"
              >
                Login
              </Button>
              <Button
                  onClick={() =>
                      router.push("http://202.178.125.77:9090/register")
                  }
                  className="text-white bg-primary rounded hover:bg-primary-dark"
              >
                Register
              </Button>
            </div>
            {/* Hamburger button moved to the right */}    {/* Hamburger Button */}
            <MobileSidebar onClose={()=>setMobileSidebarOpen(false)}/>

          </div>

          {/* Render mobile sidebar if toggled */}
          {isMobileSidebarOpen && (
              <MobileSidebar onClose={() => setMobileSidebarOpen(false)} />
          )}
        </>
    );
  }
}
