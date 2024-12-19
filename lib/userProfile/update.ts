import { useForm } from "react-hook-form";

export default function updatedInformationForm() {
    const form = useForm({
      defaultValues: {
        familyName: "",
        givenName: "",
        username: "",
        gender: "",
        phoneNumber: "",
        bio: "",
        workPlace: "",
        pob: "",
        school: "",
        jobPosition: "",
        phone: "",
        dob: "",
        profileImage: "",
        isDeleted: false,
        coverColor: "",
      },
    });
  
  async function onSubmit(data: any) {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/edit_user_profiles/lazizhia",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("User information updated successfully:", result);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  }
}
  