import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NavbarComponent() {
    return (
        <div className="flex z-[100] items-center px-4 justify-between h-[72px] mx-[80px]">
            {/* Logo */}
            <section>
                <Image src="/logo1.png" alt="logo" width={100} height={100} />
            </section>

            {/* Search Section */}
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
                <Button className="m-[8px] text-white bg-primary rounded-[5px]">
                    ចុះឈ្មោះ
                </Button>
                <Button className="m-[8px] text-white bg-primary rounded-[5px]">
                    ចូលប្រើ
                </Button>
            </div>
        </div>
    );
}
