import React from "react";

export default function TagComponent() {
  return (
    <div className="hidden items-center bg-white p-2 justify-evenly px-10 rounded-sm border mb-2 dark:bg-darkPrimary lg:flex">
      <button className="flex items-center gap-2">
        <span className="lg:text-xl md:text-xl lg">+</span>
        <span>For you</span>
      </button>
      <div className="lg:flex md:flex md:gap-2 lg:px-1 lg:gap-3 lg:text-base md:text-base text-sm">
        {[
          "Spring cloud",
          // "Technology",
          "Javascript",
          "Programming",
          "Java",
        ].map((tag) => (
          <button
            key={tag}
            className="hover:bg-gray-100 rounded-full px-3 py-1"
          >
            #{tag}
          </button>
        ))}
      </div>
      <button className=" md:auto">More</button>
    </div>
  );
}
