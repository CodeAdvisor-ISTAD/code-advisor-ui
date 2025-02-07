import React from "react";

export default function TagComponent() {
    return (
        <div className="hidden md:flex lg:flex lg:items-center lg:w-full lg:py-2 lg:justify-evenly lg:px-2 bg-white lg:rounded-[5px] lg:shadow-sm lg:mb-2
        md:items-center md:w-full md:py-2 md:justify-evenly md:px-2 md:rounded-[5px] md:shadow-sm md:mb-2">
            <button className="flex items-center gap-2">
                <span className="lg:text-xl md:text-xl">+</span>
                <span className="text-primary lg:px-[2px] lg:text-base md:text-base text-sm">For you</span>
            </button>
            <div className="lg:flex md:flex md:gap-2 lg:px-1 lg:gap-3 lg:text-base md:text-base text-sm">
                {[
                    "Spring cloud",
                    "Technology",
                    "Javascript",
                    // "Programming",
                    "Java",
                ].map((tag) => (
                    <button
                        key={tag}
                        className="hover:bg-gray-100 rounded-full lg:px-[2px] lg:py-1 md:px-1  md:py-1 px-2 py-1 text-primary"
                    >
                        #{tag}
                    </button>
                ))}
            </div>
            <button className=" md:auto">More</button>
        </div>
    );
}
