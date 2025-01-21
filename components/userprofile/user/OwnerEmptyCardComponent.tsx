"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Dropdown, DropdownItem } from "flowbite-react";

import { Link } from "lucide-react";
import { FiEdit2 } from "react-icons/fi";

export default function OwnerEmptyCard() {
  const route = useRouter();
  return (
    <Card className="w-full p-6 rounded-lg bg-white flex flex-col items-center">
      <CardTitle className="font-khFont text-2xl pb-6 text-center ">
        ទិន្នន័យរបស់អ្នកមិនទាន់មានទេ
      </CardTitle>
      <CardDescription className="flex flex-col justify-center items-center text-center lg:w-[450px] w-[375px]">
        <p className="pb-[15px] font-khFont flex justify-center text-center text-[14px] text-gray-600">
          នៅពេលដែលអ្នកធ្វើការចែករំលែក
          អ្នកបានផ្តល់ឱកាសឲ្យអ្នកដទៃបានសិក្សារៀនសូត្រ
          ហើយអ្នកខ្លួនឯងក៏ទទួលបានការពង្រឹងសមត្ថភាពបន្ថែមដូចគ្នា។
        </p>
        <p className="font-khFont flex justify-center text-center text-[16px] text-primary">
          សូមចុចលើប៊ូតុង បង្កើតថ្មី​ ដើម្បីចែករំលែកមាតិការបស់អ្នក
        </p>
      </CardDescription>
      {/* <Button className="font-khFont ml-[300px] text-center mt-4 text-gray-100">
        បង្កើតថ្មី
      </Button> */}
      <div className="flex items-center justify-center mx-8 pt-6">
        <div className=" bg-primary px-4 rounded-md text-white">
          {" "}
          {/* Button with Dropdown */}
          <Dropdown
            inline
            label={
              <div className="flex items-center space-x-2 bg-primary py-2 rounded-md text-white shadow hover:bg-primary-dark">
                <span className="text-sm font-medium">បង្កើតថ្មី</span>
                <FiEdit2 className="text-white" />
              </div>
            }
          >
            <DropdownItem className="text-black">
              <span onClick={() => route.push("/content/new")}>
                បង្កើតអត្ថបទ
              </span>
            </DropdownItem>
            <DropdownItem className="text-black">
              <Link href="/forum/new">បង្កើត Forum</Link>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
    </Card>
  );
}
