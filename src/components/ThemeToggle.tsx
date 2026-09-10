"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex min-h-11 items-center gap-2 px-3 border hairline text-xs hover:bg-muted transition-colors lg:order-last"
    >
      <Moon aria-hidden="true" size={16} className="dark:hidden" />
      <Sun aria-hidden="true" size={16} className="hidden dark:block" />
      <span className="dark:hidden">Dark mode</span>
      <span className="hidden dark:inline">Light mode</span>
    </button>
  );
}
