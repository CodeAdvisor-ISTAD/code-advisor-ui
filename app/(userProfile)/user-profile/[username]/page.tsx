"use client";
import Owner from "@/components/userprofile/user/Owner";
import Viewer from "@/components/userprofile/user/ViewerComponent";
import { getOwnUserProfile } from "@/hooks/api-hook/user/user-service";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const params = useParams();
  const paramName = params?.username; // Access the username parameter
  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: getOwnUserProfile,
  }); // Fetch the user profile

  if (user?.username === paramName) {
    return <Owner />;
  } else {
    return (
      <Viewer username={Array.isArray(paramName) ? paramName[0] : paramName} />
    );
  }
};

export default UserProfile; // Correct default export
