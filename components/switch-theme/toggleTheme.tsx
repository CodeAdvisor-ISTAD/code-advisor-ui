"use client"

import * as React from "react"
import { Moon, MoonIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ToggleTheme() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };
  

  return (
    <Button
      size="icon"
      className="border-none shadow-non"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-white" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] " />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>

  )
}
