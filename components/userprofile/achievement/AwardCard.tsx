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

import Image from "@/public/user-profile-image/badge.png";
function determineLevel(achievement): { image: string } {
  if (achievement?.achievement?.totalPoints >= 5000) {
    return { image: Image.src };
  } else if (achievement?.achievement?.totalPoints >= 3500 && achievement?.achievement?.totalPoints < 4999) {
    return { image: Image.src };
  } else if (achievement?.achievement?.totalPoints >= 100) {
    return { image: Image.src };
  } else {
    return { image: Image.src };
  }
}

export default function AwardCard(achievement){
  // const [achievementData, setAchievementData] = useState(null);
  // useEffect(() => {
  //   setAchievementData(achievement.achievement);
  // }, [achievement]);
  // console.log("achievementData", achievementData);

  return (
    <Card className="p-6 flex items-center justify-between w-full">
      <div className="flex flex-col items-center gap-1">
        <span className="text-5xl font-bold">
          {convertToKhmerNumerals(achievement?.achievement?.totalPoints ? achievement?.achievement?.totalPoints : 0)}
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
        <BadgeCheck className="h-6 w-6 text-white" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <img
          src={determineLevel(achievement).image}
          alt="badge"
          className="h-20 w-20"
        />
        <span className="text-navy font-semibold">{achievement?.achievement?.currentLevel}</span>
        <p className="text-lg font-semibold"></p>
      </div>
    </Card>
  );
}
