"use client";

import { useIsClient } from "@/src/shared/hooks";
import { Button } from "@/src/shared/ui";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ToggleTheme() {
  const { setTheme, theme } = useTheme();

  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
