"use client";

import { Moon, Sun } from "lucide-react";

// No React state needed to decide which icon shows — that would require
// reading `document` on mount, which either mismatches the server-rendered
// HTML (hydration warning) or causes a one-frame icon flash while state
// settles. Instead both icons are always rendered and crossfade/rotate via
// pure `dark:` CSS, resolved at paint time from whatever class
// ThemeScript already put on <html> — same trick as the logo switch.
export default function ThemeToggle() {
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // localStorage unavailable (private browsing, disabled storage) —
      // the toggle still works for the current page view, it just won't persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className="relative flex h-10 w-10 flex-none items-center justify-center rounded-full border border-light-teal text-navy transition-all duration-300 hover:border-bright-cyan hover:text-bright-cyan hover:shadow-glow"
    >
      <Moon
        className="absolute h-[18px] w-[18px] rotate-0 scale-100 opacity-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 dark:opacity-0"
        strokeWidth={2}
      />
      <Sun
        className="absolute h-[18px] w-[18px] rotate-90 scale-0 opacity-0 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100"
        strokeWidth={2}
      />
    </button>
  );
}
