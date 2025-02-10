"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Dropdown, DropdownItem } from "flowbite-react";

import { Link } from "lucide-react";
import { FiEdit2 } from "react-icons/fi";

export default function OwnerEmptyCard() {
  const route = useRouter();
  return (
    <Card className="w-full lg:p-6 p-3 rounded-lg bg-white dark:bg-darkSecondary flex flex-col items-center">
      <CardTitle className="font-khFont lg:text-2xl lg:pb-6 text-lg pb-3 text-center ">
        ទិន្នន័យរបស់អ្នកមិនទាន់មានទេ
      </CardTitle>
      <CardDescription className="flex flex-col justify-center items-center text-center lg:w-[450px] w-[375px]">
        <p className="pb-[15px] font-khFont flex justify-center text-center text-sm ">
          នៅពេលដែលអ្នកធ្វើការចែករំលែក
          អ្នកបានផ្តល់ឱកាសឲ្យអ្នកដទៃបានសិក្សារៀនសូត្រ
          ហើយអ្នកខ្លួនឯងក៏ទទួលបានការពង្រឹងសមត្ថភាពបន្ថែមដូចគ្នា។
        </p>
        <p className="font-khFont flex justify-center text-center text-[16px] ">
          សូមចុចលើប៊ូតុង បង្កើតថ្មី​ ដើម្បីចែករំលែកមាតិការបស់អ្នក
        </p>
      </CardDescription>
      {/* <Button className="font-khFont ml-[300px] text-center mt-4 text-gray-100">
        បង្កើតថ្មី
      </Button> */}
      {/* Action Icons */}
      <div className="flex items-center mx-8 mt-3">
        <div className="bg-primary dark:bg-secondary px-4 rounded-md text-white ">
          <Dropdown
            inline
            label={
              <div className="flex items-center space-x-2 py-2 rounded-md text-white hover:bg-primary-dark">
                <span className="text-sm font-medium">បង្កើតថ្មី</span>
                <FiEdit2 className="text-white " />
              </div>
            }
          >
            <DropdownItem className="text-black">
              <span onClick={() => route.push("/content/new")}>
                បង្កើតអត្ថបទ
              </span>
            </DropdownItem>
            <DropdownItem className="text-black">
              <span onClick={() => route.push("/forum/new")}>បង្កើត Forum</span>
              {/* <a href="/forum/new">បង្កើត Forum</a> */}
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
    </Card>
  );
}
