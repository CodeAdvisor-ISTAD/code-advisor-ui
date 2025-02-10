"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Code, Users, BookOpen, Award, Compass, BarChart2, Bell } from "lucide-react"

const PolicyPage = () => {
    // Set "Forum Discussion" as the default active section
    const [activeSection, setActiveSection] = useState<string | null>("Forum Discussion")

    const policies = [
        {
            title: "Forum Discussion",
            icon: <Code className="w-6 h-6 text-secondary" />,
            details: [
                "Question publishing",
                "Code editor with syntax highlighting",
                "Answer publishing",
                "Vote up/down on answers",
                "Accept answers",
                "Tags and Categories",
                "Profile mention",
                "Full text search for questions/answers",
            ],
        },
        {
            title: "Content Sharing",
            icon: <BookOpen className="w-6 h-6 text-secondary" />,
            details: [
                "Article publishing/writing",
                "Code editor with syntax highlighting",
                "Reading feed/timeline",
                "Tags and Categories",
                "Search contents by title",
            ],
        },
        {
            title: "Community Engagement",
            icon: <Users className="w-6 h-6 text-secondary" />,
            details: ["Comments and discussions", "Reactions (likes, loves, etc.)", "Bookmarking Forum and Content"],
        },
        {
            title: "User Profile",
            icon: <Award className="w-6 h-6 text-secondary" />,
            details: [
                "Editable profile information",
                "Reading history",
                "Bookmarking",
                "Achievement badges",
                "Achievement levels",
            ],
        },
        {
            title: "Content Discovery",
            icon: <Compass className="w-6 h-6 text-secondary" />,
            details: ["Trending posts", "Featured articles", "Tag-based navigation", "Latest posts", "Recommended posts"],
        },
        {
            title: "Analytics & Statistics",
            icon: <BarChart2 className="w-6 h-6 text-secondary" />,
            details: ["Post views", "Reading time estimates", "Engagement statistics", "Profile analytics"],
        },
        {
            title: "Notification",
            icon: <Bell className="w-6 h-6 text-secondary" />,
            details: ["Real-time notifications for user interactions"],
        },
    ]

    const toggleSection = (title: string) => {
        setActiveSection(activeSection === title ? null : title)
    }

    return (
        <div className="min-h-screen bg-background from-purple-100 pt-[90px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-semibold text-center text-primary mb-8">CodeAdvisors Policy</h1>
                {policies.map((policy) => (
                    <motion.div
                        key={policy.title}
                        className="bg-white rounded-lg border border-gray-100 overflow-hidden mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <button className="w-full text-left p-6 focus:outline-none" onClick={() => toggleSection(policy.title)}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 ">
                                    {policy.icon}
                                    <h2 className="text-2xl font-medium text-primary">{policy.title}</h2>
                                </div>
                                <ChevronDown
                                    className={`w-6 h-6 text-primary transform transition-transform duration-300 ${
                                        activeSection === policy.title ? "rotate-180" : ""
                                    }`}
                                />
                            </div>
                        </button>
                        {activeSection === policy.title && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="px-6 pb-6"
                            >
                                <ul className="list-disc list-inside space-y-2 text-primary">
                                    {policy.details.map((detail, index) => (
                                        <li key={index}>{detail}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default PolicyPage