import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";

export function PublicAchievementComponent() {
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    // Load the initial state from local storage
    const savedState = localStorage.getItem("isPublic");
    if (savedState !== null) {
      setIsPublic(JSON.parse(savedState));
    }
  }, []);

  const handleSwitchChange = async (checked: boolean) => {
    setIsPublic(checked);
    localStorage.setItem("isPublic", JSON.stringify(checked));

    // Choose the endpoint based on the checked state
    const endpoint = checked
      ? "/users/api/v1/achievement_levels/is-unpublished"
      : "/users/api/v1/achievement_levels/is-public";

    try {
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      console.log(`Status updated to: ${checked ? "Public" : "Unpublished"}`);
    } catch (error) {
      console.error("Error updating status:", error);
      // Revert the switch state if the request fails
      setIsPublic(!checked);
      localStorage.setItem("isPublic", JSON.stringify(!checked));
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Label
        htmlFor="publish-mode"
        className="font-semibold flex flex-row items-center gap-1"
      >
        {isPublic ? (
          <EyeOff className="w-5 h-5 " />
        ) : (
          <Eye className="w-5 h-5" />
        )}
        {/* {isPublic ? "បិទសមិទ្ធផល" : "បង្ហាញសមិទ្ធផល"}  */}
      </Label>

      <Switch
        id="publish-mode"
        checked={isPublic}
        onCheckedChange={handleSwitchChange}
      />
    </div>
  );
}
