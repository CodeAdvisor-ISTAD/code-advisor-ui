import { Card } from "@/components/ui/card";
import { ArrowUp, BadgeCheck } from "lucide-react";

function convertToKhmerNumerals(number: number): string {
  const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
  return number
    .toString()
    .split("")
    .map((digit) => khmerDigits[parseInt(digit)])
    .join("");
}
import verifyExpertAward from "@/public/award-images/Verify Expert.png";
import topContributorAward from "@/public/award-images/Top Contributor.png";
import mentorAward from "@/public/award-images/Mentor.png";
import expertAward from "@/public/award-images/Expert.png";
import seniorAward from "@/public/award-images/Senior.png";
import contributorAward from "@/public/award-images/Contributor.png";
import learnerAward from "@/public/award-images/learner.png";
function determineLevel(achievement) {
  const totalPoints = achievement?.achievement?.totalPoints || 0;

  if (totalPoints >= 5000) {
    return { image: verifyExpertAward.src }; // Verify Expert
  } else if (totalPoints >= 4000) {
    return { image: topContributorAward.src }; // Top Contributor
  } else if (totalPoints >= 3000) {
    return { image: mentorAward.src }; // Mentor
  } else if (totalPoints >= 2000) {
    return { image: expertAward.src }; // Expert
  } else if (totalPoints >= 1000) {
    return { image: seniorAward.src }; // Senior
  } else if (totalPoints >= 500) {
    return { image: contributorAward.src }; // Contributor
  } else {
    return { image: learnerAward.src }; // Fallback for <200
  }
}

export default function AwardCard(achievement) {
  // const [achievementData, setAchievementData] = useState(null);
  // useEffect(() => {
  //   setAchievementData(achievement.achievement);
  // }, [achievement]);
  // console.log("achievementData", achievementData);

  return (
    <Card className="lg:p-6 p-4 flex items-center justify-between w-full">
      <div className="flex flex-col items-center gap-1">
        <span className="text-5xl font-bold">
          {convertToKhmerNumerals(
            achievement?.achievement?.totalPoints
              ? achievement?.achievement?.totalPoints
              : 0
          )}
          {/* {convertToKhmerNumerals(achievement.score)} */}
        </span>
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-red-500 text-base font-bold">ពិន្ទុសរុប</span>
            <ArrowUp className="h-12 w-9 text-green-500" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
      </div>
      <div className="flex flex-col justify-center items-center">
        <img
          src={determineLevel(achievement).image}
          alt="badge"
          className="h-20 w-20"
        />
        <span className="text-navy font-semibold">
          {achievement?.achievement?.currentLevel}
        </span>
        <p className="text-lg font-semibold"></p>
      </div>
    </Card>
  );
}
