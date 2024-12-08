import React, { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/userprofile/table";

type UserProfile = {
  familyName: string;
  givenName: string;
  username: string;
  gender?: string;
  pob?: string;
  school?: string;
  email: string;
  jobPosition?: string;
  workPlace?: string;
  phoneNumber?: string; // Optional field
  address?: string;
  dob: string;
};

const staticUserProfile: UserProfile = {
  familyName: "Doe",
  givenName: "John",
  username: "john.doe",
  gender: "Male",
  pob: "Unknown",
  school: "Unknown",
  email: "john.doe@example.com",
  jobPosition: "Unknown",
  workPlace: "Unknown",
  phoneNumber: "Unknown",
  address: "Unknown",
  dob: "1990-01-01",
};

export default function UserInformation() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/edit_user_profiles/john.doe")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data: UserProfile) => {
        console.log(data);
        setUserProfile(data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setUserProfile(staticUserProfile); // Set static user profile on error
      });
  }, []);

  
  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {/* table of user info */}
        <Card className="w-[510px] p-6 rounded-lg bg-white">
          <CardTitle className="font-khFont text-2xl pb-6">អំពីអ្នក</CardTitle>
          <Table>
            <TableBody>
              {/* first name */}
              <TableRow>
                <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                  នាម
                </TableCell>
                <TableCell className="text-right font-khFont text-lg pb-[10px]">
                  {userProfile.givenName}
                </TableCell>
              </TableRow>
              {/* last name */}
              <TableRow>
                <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                  គោត្តមនាម
                </TableCell>
                <TableCell className="text-right font-khFont text-lg pb-[10px]">
                  {userProfile.familyName}
                </TableCell>
              </TableRow>
              {/* username */}
              <TableRow>
                <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                  ឈ្មោះគណនី
                </TableCell>
                <TableCell className="text-right font-khFont text-lg pb-[10px]">
                  {userProfile.username}
                </TableCell>
              </TableRow>
              {/* email */}
              <TableRow>
                <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                  អុីម៉ែល
                </TableCell>
                <TableCell className="text-right font-roboto text-lg pb-[10px]">
                  {userProfile.email}
                </TableCell>
              </TableRow>
              {/* phone number */}
              <TableRow>
                <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                  លេខទូរស័ព្ទ
                </TableCell>
                <TableCell className="text-right font-roboto text-lg pb-[10px]">
                  {userProfile.phoneNumber || "មិនស្គាល់"}
                </TableCell>
              </TableRow>
              {/* gender */}
              <TableRow>
                <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                  ភេទ
                </TableCell>
                <TableCell className="text-right font-khFont text-lg pb-[10px]">
                  {userProfile.gender || "មិនស្គាល់"}
                </TableCell>
              </TableRow>
              {/* date of birth */}
              <TableRow>
                <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                  ថ្ងៃ ខែ​ ឆ្នាំកំណើត
                </TableCell>
                <TableCell className="text-right font-khFont text-lg pb-[10px]">
                  {userProfile.dob || "មិនស្គាល់"}
                </TableCell>
              </TableRow>
              {/* place of birth */}
              <TableRow>
                <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                  ទីកន្លែងកំណើត
                </TableCell>
                <TableCell className="text-right font-khFont text-lg pb-[10px]">
                  {userProfile.pob || "មិនស្គាល់"}
                </TableCell>
              </TableRow>
              {/* Job Position */}
              <TableRow>
                <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                  តួនាទី
                </TableCell>
                <TableCell className="text-right font-roboto text-lg pb-[10px]">
                  {userProfile.jobPosition}
                </TableCell>
              </TableRow>
              {/* Workplace */}
              <TableRow>
                <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                  ទីកន្លែងធ្វើការ
                </TableCell>
                <TableCell className="text-right font-roboto text-lg pb-[10px]">
                  {userProfile.workPlace}
                </TableCell>
              </TableRow>
              {/* Address */}
              <TableRow>
                <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                  អាសយដ្ឋាន
                </TableCell>
                <TableCell className="text-right font-roboto text-lg pb-[10px]">
                  {userProfile.address || "មិនស្គាល់"}
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
