import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" bg-white pl-[100px] z-[100]">
      <div className="container px-6  md:py-8">
        <div className="grid grid-cols-1  md:grid-cols-5">
          {/* Partner Logos */}
          <div className="md:col-span-1  ">
            <h3 className="mb-4 text-lg font-semibold">អ្នកឧបត្ថម្ភដោយ</h3>
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <Image
                  src="/ptc.jpg"
                  alt="PTC Logo"
                  width={75}
                  height={75}
                  className="object-contain"
                />
                <Image
                  src="/cbrd.png"
                  alt="CBRD Fund Logo"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Center Section - CSTAD Logo */}
          <div className="md:col-span-1 ml-10">
            <h3 className="mb-4 text-lg font-semibold">រៀបចំដោយ</h3>
            <Image
              src="/istad.png"
              alt="CSTAD Logo"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>

          {/* Navigation Links */}
          <div className="space-y-4 ml-20">
            <h3 className="text-lg font-semibold">តំណភ្ជាប់ទំព័រ</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="hover:underline">
                អំពីពួកយើង
              </Link>
              <Link href="#" className="hover:underline">
                អត្ថបទ
              </Link>
              <Link href="#" className="hover:underline">
                ការពិភាក្សា
              </Link>
            </nav>
          </div>

          {/* Additional Links */}
          <div className="space-y-4 ml-8">
            <h3 className="text-lg font-semibold">ច្បាប់</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="hover:underline">
                លក្ខខណ្ឌប្រើប្រាស់
              </Link>
              <Link href="#" className="hover:underline">
                គោលការណ៍ភាពឯកជន
              </Link>
            </nav>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">តំណភ្ជាប់បណ្តេាលសង្គម</h3>
            <div className="flex-col space-y-2 ">
              <Link href="#" className=" flex gap-2 ">
                <FaFacebook className="h-6 w-6 fill-primary " />
                <span className="">Facebook</span>
              </Link>
              <Link href="#" className=" flex gap-2">
                <FaTwitter className="h-6 w-6  fill-primary" />
                <span className="">Twitter</span>
              </Link>
              <Link href="#" className=" flex gap-2">
                <FaEnvelope className="h-6 w-6  fill-primary" />
                <span className="">Email</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 border-t pt-4 text-center text-sm text-muted-foreground">
          © 2024 Copyright CodeAdvisors by ISTAD. All rights reserved.™
        </div>
      </div>
    </footer>
  );
}
