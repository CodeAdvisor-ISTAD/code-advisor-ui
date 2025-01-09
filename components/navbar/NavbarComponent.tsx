"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarLogin from "./NavbarLogin";
import { useUser } from "@/lib/context/userContext";
import { UserData } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/hooks/api-hook/auth/use-profile";

export default function NavbarComponent() {
    const route = useRouter();
    // const [user, setUser] = useState(null);

    // const getUser = async () => {
    //     const response = await fetch("/profile");
    //     const data = await response.json();
    //     setUser(data);
    // };

    // console.log(user);

    // useEffect(() => {
    //     getUser();
    // }, []);
    const { data: user } = useQuery({
        queryKey: ["profile"],
        queryFn: fetchUserProfile,
    })
    const { setUser } = useUser();

    useEffect(() => {
        if (user) {
            setUser(user);
        }
    }, [user, setUser]);

    return (
        <>
            {user === null ? (
                <div className="flex z-[100] items-center px-4 justify-between h-[72px] mx-[80px]">
                    {/* Logo */}
                    <section>
                        <Link href="/" aria-label="Go to home page">
                            <Image
                                src="/logo1.png"
                                alt="logo"
                                width={100}
                                height={100}
                            />
                        </Link>
                    </section>

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

                    {/* Action Buttons */}
                    <div className="flex h-[50px] ">
                        <Button
                            onClick={() =>
                                route.push("/oauth2/authorization/code-advisor")
                            }
                            className="m-[8px] text-white bg-primary rounded-[5px]"
                        >
                            Login
                        </Button>
                        <Button
                            onClick={() =>
                                route.push("http://127.0.0.1:9090/register")
                            }
                            className="m-[8px] text-white bg-primary rounded-[5px]"
                        >
                            Register
                        </Button>
                    </div>
                </div>
            ) : (
                <NavbarLogin user={user} />
            )}
        </>
    );
}
