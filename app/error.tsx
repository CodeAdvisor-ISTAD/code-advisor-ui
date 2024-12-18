"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XIcon, CircleIcon } from "lucide-react";
import { useEffect } from "react";

export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fullscreen background */}
      <div className="absolute inset-0 "></div>

      {/* Decorative elements */}
      <div className="absolute inset-0">
  <p className="absolute top-[40%] right-[38%] font-semibold text-[#000033]">
    OOPs!
  </p>
  <XIcon className="absolute top-[20%] left-[30%] w-6 h-6 text-primary" strokeWidth={8} />
  <XIcon className="absolute top-[40%] right-[36%] w-6 h-6 text-secondary" strokeWidth={5} />
  <XIcon className="absolute bottom-[30%] right-[20%] w-8 h-8 text-primary" strokeWidth={8} />
  <CircleIcon className="absolute top-[15%] right-[15%] w-10 h-10 text-primary" strokeWidth={3} />
  <CircleIcon className="absolute bottom-[20%] left-[25%] w-10 h-10 text-primary" strokeWidth={3} />
</div>

      {/* Unplugged cord illustration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 ml-14">
        <img
          src="/about-us/error.png"
          alt="Unplugged electrical cord illustration"
          className="w-60 h-auto"
        />
      </div>

      {/* Main content */}
      <div className="text-center z-10">
        <h1 className="text-[120px] font-bold text-[#000033] leading-none">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-[#000033] mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-2">
          we&apos;re sorry. the page you requested could not be found
        </p>
        <p className="text-gray-600 mb-4">Please go back to the home page</p>
        <Button
          asChild
          className="text-white bg-secondary hover:bg-primary rounded-sm"
          onClick={() => reset()}
        >
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
