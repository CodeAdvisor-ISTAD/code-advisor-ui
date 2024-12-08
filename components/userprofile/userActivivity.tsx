import React from "react";
import { DataBlockBlue, DataBlockGreen, DataBlockPink, DataBlockPurple, DataBlockYellow } from "@/components/userprofile/UserDatapoint";

export default function UserActivityPoints() {
  return (
    <div className="w-full max-w-3xl space-y-4 justify-center items-center flex flex-col">
      <div className="flex items-center w-[400px] justify">
        <DataBlockPink number="៥៦" text="ធ្លាប់ចូលចិត្ត" />
        <div className="flex w-full items-center">
          <div className="h-1 w-full bg-pink-500 rounded-sm"></div>
        </div>
        <DataBlockBlue number="៥៦" text="ធ្លាប់ចូលចិត្ត" />
        <div className="flex w-full items-center">
          <div className="h-1 w-full bg-blue-500 rounded-sm"></div>
        </div>
        <DataBlockGreen number="៥៦" text="ធ្លាប់ចូលចិត្ត" />
        <div className="flex w-full items-center">
          <div className="h-1 w-full bg-green-600 rounded-sm"></div>
        </div>
        <DataBlockYellow number="៥៦" text="ធ្លាប់ចូលចិត្ត" />
        <div className="flex w-full items-center">
          <div className="h-1 w-full bg-orange-400 rounded-sm"></div>
        </div>
        <DataBlockPurple number="៥៦" text="ធ្លាប់ចូលចិត្ត" />
      </div>
    </div>
  );
}
const UserActivityComponent = () => {
  return <UserActivityPoints />;
};
