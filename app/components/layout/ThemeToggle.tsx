import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../utils/cn";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center justify-center cursor-pointer",
        "size-9 rounded-lg",
        "border border-border/40 bg-background/80 backdrop-blur-sm",
        "text-muted-foreground hover:text-foreground hover:border-border",
        "transition-all duration-300",
        "hover:scale-105 active:scale-95"
      )}
      aria-label="Toggle theme"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <Sun
        className={cn(
          "absolute size-4 transition-all duration-300",
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        )}
      />
      <Moon
        className={cn(
          "absolute size-4 transition-all duration-300",
          theme === "light"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        )}
      />
    </button>
  );
}
