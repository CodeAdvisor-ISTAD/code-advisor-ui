import { useQuery } from "@tanstack/react-query";



export const fetchUserProfileAuthMe = async () => {
  try {
    const response = await fetch("/identity/api/v1/auth/me");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error; // Rethrow for error handling
  }
};

async function fetchUserProfile() {
  const response = await fetch("/identity/api/v1/auth/me");
  if (response.ok) {
    const data = await response.json();
    console.log("data", data);
    return data;
  } else {
    return null;
  }
}

export const UseFetchProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });
};
