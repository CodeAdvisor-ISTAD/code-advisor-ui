"use client";
import ErrorComponent from "@/app/error";
import Owner from "@/components/userprofile/user/Owner";
import Viewer from "@/components/userprofile/user/ViewerComponent";
import {
  getOwnUserProfile,
  getUserByUsername,
} from "@/hooks/api-hook/user/user-service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";
import LoadingPage from "@/app/loading";

const UserProfile = () => {
  const params = useParams();
  const paramName = params?.username; // Access the username parameter
  const router = useRouter();

  // Fetch the owner's profile
  const {
    data: owner,
    isLoading: isOwnerLoading,
    error: ownerError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getOwnUserProfile,
  });

  // Fetch the user's profile based on the username parameter
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ["profile-viewer", paramName],
    queryFn: () => getUserByUsername(paramName as string),
    enabled: !!paramName, // Only run the query if paramName is available
  });

  // Handle loading states
  if (isOwnerLoading || isUserLoading) {
    return <LoadingPage />;
  }

  // Handle errors
  // if (ownerError || userError) {
  //   return <ErrorComponent error={new Error("Failed to fetch user data")} reset={() => {}} />;
  // }

  // Handle 404 error for user not found
  if (user?.error?.code === 404) {
    return <ErrorComponent error={new Error("User not found")} reset={() => {}} />;
  }

  // Render the Owner component if the owner's username matches the paramName
  if (owner?.username === paramName) {
    return <Owner />;
  }

  // Render the Viewer component if the owner's username does not match the paramName
  return (
    <Viewer
      username={Array.isArray(paramName) ? paramName[0] : paramName ?? ""}
    />
  );
};

export default UserProfile;