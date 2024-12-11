import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import type { UserInformation } from "@/types/user";
import { staticUserProfile } from "@/lib/userProfile/information";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/userprofile/table";

export default function UserInformationCardComponent() {
  const userStatic = staticUserProfile;
  const [userInformation, setUserInformation] =
    React.useState<UserInformation | null>(null);

  React.useEffect(() => {
    fetch("http://localhost:8080/api/v1/edit_user_profiles/john.doe")
      .then((response) => response.json())
      .then((data) => setUserInformation(data));
  }, []);

  if (!userInformation) {
    return (
      <div>
        <div className="flex flex-col gap-4">
          {/* table of user info */}
          <Card className="w-[510px] p-6 rounded-lg bg-white">
            <div className="w-[75px] h-[55px] relative">
              <CardTitle className="left-0 top-0 absolute text-[#000040] text-2xl">
                អំពីអ្នក
              </CardTitle>
              <div className="w-[28px] h-[2.5px] left-[1px] top-[27px] absolute bg-[#f31260]"></div>
            </div>
            <Table>
              <TableBody>
                {/* first name */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    នាម
                  </TableCell>
                  <TableCell className="text-right font-khFont text-lg pb-[10px]">
                    {userStatic.givenName}
                  </TableCell>
                </TableRow>
                {/* last name */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    គោត្តមនាម
                  </TableCell>
                  <TableCell className="text-right font-khFont text-lg pb-[10px]">
                    {userStatic.familyName}
                  </TableCell>
                </TableRow>
                {/* username */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    ឈ្មោះគណនី
                  </TableCell>
                  <TableCell className="text-right font-khFont text-lg pb-[10px]">
                    {userStatic.username}
                  </TableCell>
                </TableRow>
                {/* email */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    អុីម៉ែល
                  </TableCell>
                  <TableCell className="text-right font-roboto text-lg pb-[10px]">
                    {userStatic.email}
                  </TableCell>
                </TableRow>
                {/* phone number */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    លេខទូរស័ព្ទ
                  </TableCell>
                  <TableCell className="text-right font-roboto text-lg pb-[10px]">
                    {userStatic.phoneNumber || "មិនស្គាល់"}
                  </TableCell>
                </TableRow>
                {/* gender */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    ភេទ
                  </TableCell>
                  <TableCell className="text-right font-khFont text-lg pb-[10px]">
                    {userStatic.gender || "មិនស្គាល់"}
                  </TableCell>
                </TableRow>
                {/* date of birth */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    ថ្ងៃ ខែ​ ឆ្នាំកំណើត
                  </TableCell>
                  <TableCell className="text-right font-khFont text-lg pb-[10px]">
                    {userStatic.dob || "មិនស្គាល់"}
                  </TableCell>
                </TableRow>
                {/* place of birth */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    ទីកន្លែងកំណើត
                  </TableCell>
                  <TableCell className="text-right font-khFont text-lg pb-[10px]">
                    {userStatic.pob || "មិនស្គាល់"}
                  </TableCell>
                </TableRow>
                {/* Job Position */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    តួនាទី
                  </TableCell>
                  <TableCell className="text-right font-roboto text-lg pb-[10px]">
                    {userStatic.jobPosition}
                  </TableCell>
                </TableRow>
                {/* Workplace */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    ទីកន្លែងធ្វើការ
                  </TableCell>
                  <TableCell className="text-right font-roboto text-lg pb-[10px]">
                    {userStatic.workPlace}
                  </TableCell>
                </TableRow>
                {/* Address */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    អាសយដ្ឋាន
                  </TableCell>
                  <TableCell className="text-right font-roboto text-lg pb-[10px]">
                    {userStatic.address || "មិនស្គាល់"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
        {/* tabs */}
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex flex-col gap-4">
          {/* table of user info */}
          <Card className="w-[510px] p-6 rounded-lg bg-white">
            <div className="w-[75px] h-[55px] relative">
              <CardTitle className="left-0 top-0 absolute text-[#000040] text-2xl">
                អំពីអ្នក
              </CardTitle>
              <div className="w-[28px] h-[2.5px] left-[1px] top-[27px] absolute bg-[#f31260]"></div>
            </div>
            <Table>
              <TableBody>
                {/* first name */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    នាម
                  </TableCell>
                  <TableCell className="text-right font-khFont text-lg pb-[10px]">
                    {userInformation.givenName}
                  </TableCell>
                </TableRow>
                {/* last name */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    គោត្តមនាម
                  </TableCell>
                  <TableCell className="text-right font-khFont text-lg pb-[10px]">
                    {userInformation.familyName}
                  </TableCell>
                </TableRow>
                {/* username */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    ឈ្មោះគណនី
                  </TableCell>
                  <TableCell className="text-right font-khFont text-lg pb-[10px]">
                    {userInformation.username}
                  </TableCell>
                </TableRow>
                {/* email */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    អុីម៉ែល
                  </TableCell>
                  <TableCell className="text-right font-roboto text-lg pb-[10px]">
                    {userInformation.email}
                  </TableCell>
                </TableRow>
                {/* phone number */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    លេខទូរស័ព្ទ
                  </TableCell>
                  <TableCell className="text-right font-roboto text-lg pb-[10px]">
                    {userInformation.phoneNumber || "មិនស្គាល់"}
                  </TableCell>
                </TableRow>
                {/* gender */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    ភេទ
                  </TableCell>
                  <TableCell className="text-right font-khFont text-lg pb-[10px]">
                    {userInformation.gender || "មិនស្គាល់"}
                  </TableCell>
                </TableRow>
                {/* date of birth */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    ថ្ងៃ ខែ​ ឆ្នាំកំណើត
                  </TableCell>
                  <TableCell className="text-right font-khFont text-lg pb-[10px]">
                    {userInformation.dob || "មិនស្គាល់"}
                  </TableCell>
                </TableRow>
                {/* place of birth */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    ទីកន្លែងកំណើត
                  </TableCell>
                  <TableCell className="text-right font-khFont text-lg pb-[10px]">
                    {userInformation.pob || "មិនស្គាល់"}
                  </TableCell>
                </TableRow>
                {/* Job Position */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    តួនាទី
                  </TableCell>
                  <TableCell className="text-right font-roboto text-lg pb-[10px]">
                    {userInformation.jobPosition}
                  </TableCell>
                </TableRow>
                {/* Workplace */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    ទីកន្លែងធ្វើការ
                  </TableCell>
                  <TableCell className="text-right font-roboto text-lg pb-[10px]">
                    {userInformation.workPlace}
                  </TableCell>
                </TableRow>
                {/* Address */}
                <TableRow>
                  <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                    អាសយដ្ឋាន
                  </TableCell>
                  <TableCell className="text-right font-roboto text-lg pb-[10px]">
                    {userInformation.address || "មិនស្គាល់"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
        {/* tabs */}
      </div>
    );
  }
}
