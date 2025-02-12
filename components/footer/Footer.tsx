"use client";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Footer() {
  return (
      <footer className="bg-white dark:bg-darkPrimary">
        <div className="container px-4 py-6 mx-auto">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
            {/* Partner Logos */}
            <div className="sm:col-span-1 flex flex-col items-center text-center">
              <h3 className="mb-3 text-lg font-semibold">ឧបត្ថម្ភដោយ</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Image
                      src="/ptc.jpg"
                      alt="PTC Logo"
                      width={60}
                      height={60}
                      className="object-contain dark:bg-black"
                  />
                  <Image
                      src="/cbrd.png"
                      alt="CBRD Fund Logo"
                      width={150}
                      height={150}
                      className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Center Section - CSTAD Logo */}
            <div className="sm:col-span-1 flex flex-col items-center text-center">
              <h3 className="mb-3 text-lg font-semibold">រៀបចំដោយ</h3>
              <Image
                  src="/logoIstad.png"
                  alt="CSTAD Logo"
                  width={150}
                  height={150}
                  className="object-contain"
              />
            </div>

            {/* Navigation Links */}
            <div className="sm:col-span-1 flex flex-col items-center text-center">
              <h3 className="mb-3 text-lg font-semibold">តំណភ្ជាប់ទំព័រ</h3>
              <nav className="flex flex-col space-y-1">
                <Link href="/about" className="hover:underline text-md">
                  អំពីពួកយើង
                </Link>
                <Link href="/all-content" className="hover:underline text-md">
                  អត្ថបទ
                </Link>
                <Link href="/forum" className="hover:underline text-md">
                  ពិភាក្សា
                </Link>
              </nav>
            </div>

            {/* Additional Links */}
            <div className="sm:col-span-1 flex flex-col items-center text-center">
              <h3 className="mb-3 text-lg font-semibold">ច្បាប់</h3>
              <nav className="flex flex-col space-y-1">
                <Link href="" className="hover:underline text-md">
                  លក្ខខណ្ឌប្រើប្រាស់
                </Link>
                <Link href="/policy" className="hover:underline text-md">
                  គោលការណ៍ភាពឯកជន
                </Link>
              </nav>
            </div>

            {/* Social Media Links */}
            <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center text-center">
              <h3 className="mb-3 text-lg font-semibold">តំណភ្ជាប់បណ្តេាលសង្គម</h3>
              <div className="flex flex-col space-y-1">
                <Link
                    href="https://www.facebook.com/istad.co"
                    className="flex items-center gap-2 hover:underline text-md"
                    target="blank"
                >
                  <FaFacebook className="h-5 w-5 fill-primary " />
                  <span>Facebook</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 hover:underline text-md">
                  <FaTwitter className="h-5 w-5 fill-primary" />
                  <span>Twitter</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 hover:underline text-md">
                  <FaEnvelope className="h-5 w-5 fill-primary" />
                  <span>Email</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
            © 2024 Copyright CodeAdvisors by ISTAD. All rights reserved.™
          </div>
        </div>
      </footer>
  );
}