import React, { useEffect, useState } from "react";

import { Card, CardTitle } from "@/components/ui/card";
import { staticUserProfile } from "@/lib/information";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/userprofile/table";

export default function UserInformationCardComponent(userInformation) {
  const user = userInformation.userInformation || staticUserProfile;

  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full lg:p-6 p-3 rounded-lg bg-white dark:bg-darkSecondary">
        <div className="w-[80px] lg:h-[55px] h-[35px] relative">
          <CardTitle className="left-0 top-0 absolute lg:text-2xl text-lg">
            អំពីអ្នក
          </CardTitle>
          <div className="lg:w-[28px] w-[20px] h-[2.5px] left-[1px] lg:top-[27px] top-[22px] absolute bg-[#f31260] dark:[#FB0A5D] "></div>
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="lg:text-lg text-sm pb-[10px]">
                នាម
              </TableCell>
              <TableCell className="text-right lg:text-lg text-sm pb-[10px] font-bold">
                {user?.fullName ? user?.fullName : "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="lg:text-lg text-sm pb-[10px]">
                ឈ្មោះគណនី
              </TableCell>
              <TableCell className="text-right lg:text-lg text-sm pb-[10px] font-bold">
                {user.username || "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="lg:text-lg text-sm pb-[10px]">
                អុីម៉ែល
              </TableCell>
              <TableCell className="text-right lg:text-lg text-sm pb-[10px] font-bold">
                {user.email || "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="lg:text-lg text-sm pb-[10px]">
                លេខទូរស័ព្ទ
              </TableCell>
              <TableCell className="text-right font-roboto lg:text-lg text-sm pb-[10px] font-bold">
                {user.phoneNumber || "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="lg:text-lg text-sm pb-[10px]">
                ភេទ
              </TableCell>
              <TableCell className="text-right font-khFont lg:text-lg text-sm pb-[10px] font-bold">
                {user.gender || "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="lg:text-lg text-sm pb-[10px]">
                ថ្ងៃ ខែ​ ឆ្នាំកំណើត
              </TableCell>
              <TableCell className="text-right font-khFont lg:text-lg text-sm pb-[10px] font-bold">
                {user.dob
                  ? new Date(user.dob)
                      .toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })
                      .replace(/ /g, " - ")
                  : "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="lg:text-lg text-sm pb-[10px]">
                ទីកន្លែងកំណើត
              </TableCell>
              <TableCell className="text-right font-khFont lg:text-lg text-sm pb-[10px] font-bold">
                {user.pob || "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="lg:text-lg text-sm pb-[10px]">
                តួនាទី
              </TableCell>
              <TableCell className="text-right font-roboto lg:text-lg text-sm pb-[10px] font-bold">
                {user.jobPosition || "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="lg:text-lg text-sm pb-[10px] ">
                ទីកន្លែងធ្វើការ
              </TableCell>
              <TableCell className="text-right font-roboto lg:text-lg text-sm pb-[10px] font-bold">
                {user.workPlace || "មិនមានទិន្នន័យ"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
