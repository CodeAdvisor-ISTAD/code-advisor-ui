import { useQuery } from "@tanstack/react-query";

async function fetchUserServiceProfile() {
  const response = await fetch("/users/api/v1/user_profiles/me");
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
}

export const UseFetchUserServiceProfile = () => {
  return useQuery({
    queryKey: ["userServiceProfile"],
    queryFn: fetchUserServiceProfile,
  });
};

export const fetchUserProfile = async () => {
  try {
    const response = await fetch("/users/api/v1/user_profiles/me");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error; // Rethrow for error handling
  }
};

export const UseFetchProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });
};


export const getUserByUsername = async (username: string) => {
  try {
    const response = await fetch(`/users/api/v1/user_profiles/${username}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error; // Rethrow for error handling
  }
}