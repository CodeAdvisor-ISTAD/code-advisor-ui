"use client";
import ErrorComponent from "@/app/error";
import Owner from "@/components/userprofile/user/Owner";
import Viewer from "@/components/userprofile/user/ViewerComponent";
import {
  getOwnUserProfile,
  getUserByUsername,
} from "@/hooks/api-hook/user/user-service";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import {useRouter} from "next/navigation";

const UserProfile = () => {
  const params = useParams();
  const paramName = params?.username; // Access the username parameter
  const router = useRouter();
  const { data: owner } = useQuery({
    queryKey: ["profile"],
    queryFn: getOwnUserProfile,
  }); // Fetch the user profile

  console.log("profile:", params?.username);

  const { data: user, error } = useQuery({
    queryKey: ["profile-viewer"],
    queryFn: () => getUserByUsername(paramName as string),
  }); // Fetch the user profile

  if (user?.error?.code === 404) {
    return <ErrorComponent error={new Error("User not found")} reset={function (): void {
      
    } } />;
  }
    if (owner?.username === paramName) {
      return <Owner />;
    } else {
      return (
        <Viewer
          username={Array.isArray(paramName) ? paramName[0] : paramName}
        />
      );
    }
};

export default UserProfile; // Correct default export
