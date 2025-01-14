"use client";
import Owner from "@/components/userprofile/role/Owner";
import Viewer from "@/components/userprofile/role/ViewerComponent";
import { UseFetchProfile } from "@/hooks/api-hook/user-service";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const params = useParams();
  const paramName = params?.username; // Access the username parameter
  const { data: user } = UseFetchProfile();

  console.log("paramName", paramName);

  if (user?.username === paramName) {
    return <Owner />;
  } else {
    return <Viewer username={Array.isArray(paramName) ? paramName[0] : paramName} />;
  }
};

export default UserProfile; // Correct default export
