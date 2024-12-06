import React, { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/userprofile/table";

interface UserProfile {
  familyName: string;
  givenName: string;
  email: string;
  jobPosition: string;
  workPlace: string;
  phoneNumber?: string; // Optional field
  address?: string;
}

export default function UserInformation() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/edit_user_profiles")
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
        setError("Error fetching user profile");
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

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
              <TableRow>
                <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                  នាម
                </TableCell>
                <TableCell className="text-right font-khFont text-lg pb-[10px]">
                  {userProfile.givenName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                  គោត្តមនាម
                </TableCell>
                <TableCell className="text-right font-khFont text-lg pb-[10px]">
                  {userProfile.familyName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                  អុីម៉ែល
                </TableCell>
                <TableCell className="text-right font-roboto text-lg pb-[10px]">
                  {userProfile.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-khFont font-bold text-lg pb-[10px]">
                  តួនាទី
                </TableCell>
                <TableCell className="text-right font-roboto text-lg pb-[10px]">
                  {userProfile.jobPosition}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-khFont font-bold text-lg pb-[10px]"></TableCell>
                <TableCell className="text-right font-roboto text-lg pb-[10px]">
                  {userProfile.workPlace}
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
