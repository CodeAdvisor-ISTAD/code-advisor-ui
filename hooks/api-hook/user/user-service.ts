// fetch user profile
const getOwnUserProfile = async function fetchUserServiceProfile() {
  const response = await fetch("/users/api/v1/user_profiles/me");
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw data;
  }
}

// viewer profile
const getUserByUsername = async (username: string) => {
  try {
    const response = await fetch(`/users/api/v1/user_profiles/${username}`);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      console.error("Error fetching user profile:", data);
      return data;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error; // Rethrow for error handling
  }
}


// update user profile
const updateUserProfile = async function updateUserProfile(userProfile) {
  try {
    const response = await fetch("/users/api/v1/user_profiles", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userProfile),
    });

    if (!response.ok) {
      throw new Error("Error updating user profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error; // Rethrow for error handling
  }
}

const uploadProfileImage = async function uploadProfileImage(fileImageUrl) {
  try {
    const response = await fetch("/users/api/v1/user_profiles/upload", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fileImageUrl),
    });

    return await response.json();
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error; // Rethrow for error handling
  }
}

const findUserProfileByUuid = async function findUserProfileByUuid(uuid : string) {
  try {
    const response = await fetch(`/users/api/v1/user_profiles/${uuid}/profile`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error; // Rethrow for error handling
  }
}

export { getOwnUserProfile, getUserByUsername, updateUserProfile, uploadProfileImage, findUserProfileByUuid };