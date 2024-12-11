import { UserInformation } from "@/types/user";
import { ReactNode } from "react";

export const staticUserProfile: UserInformation = {
  familyName: "Doe",
  givenName: "John",
  username: "john.doe",
  gender: "Male",
  pob: "",
  school: "",
  email: "john.doe@example.com",
  jobPosition: "",
  workPlace: "",
  phoneNumber: "",
  address: "",
  dob: "1990-01-01",
};


export interface ProfileImageProps {
  disableButton?: ReactNode;
}

// Get data of user information
//   export async function getUserInformation(): Promise<UserInformation[]> {
//     return staticUserProfile;
//   }
