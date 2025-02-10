import React from "react";
import {
  DataBlockBlue,
  DataBlockGreen,
  DataBlockPink,
  DataBlockPurple,
  DataBlockYellow,
} from "@/components/userprofile/achievement/UserDatapoint";
import { arabicToKhmer } from "@/lib/information";

export default function UserActivityPoints(achievement) {
  console.log(
    "UserActivityPoints",
    achievement?.achievement?.interaction_total
  );

  const dataBlocks = [
    {
      component: DataBlockPink,
      number: achievement?.achievement?.interaction_total || 0,
      text: "ធ្លាប់ចូលចិត្ត",
      color: "bg-pink-500",
    },
    {
      component: DataBlockBlue,
      number: achievement?.achievement?.ask_question_total || 0,
      text: "ធ្លាប់បានសួរ",
      color: "bg-blue-500",
    },
    {
      component: DataBlockGreen,
      number: achievement?.achievement?.answer_question_total || 0,
      text: "ធ្លាប់បានឆ្លើយ",
      color: "bg-green-600",
    },
    {
      component: DataBlockYellow,
      number: achievement?.achievement?.comment_total || 0,
      text: "ធ្លាប់ផ្តល់មតិ",
      color: "bg-orange-400",
    },
    {
      component: DataBlockPurple,
      number: achievement?.achievement?.share_content_total || 0,
      text: "បង្កើតមាតិកា",
      color: "",
    },
  ];

  return (
    <div className="w-full max-w-3xl space-y-4 justify-center items-center flex flex-col">
      <div className="flex items-center xl:w-[400px] lg:w-[325px] w-[325px] justify-center">
        {dataBlocks.map(
          ({ component: Component, number, text, color }, index) => (
            <React.Fragment key={index}>
              <Component number={arabicToKhmer(number)} text={text} />
              {color && (
                <div className="flex w-full items-center">
                  <div className={`h-1 w-full ${color} rounded-sm`}></div>
                </div>
              )}
            </React.Fragment>
          )
        )}
      </div>
    </div>
  );
}
