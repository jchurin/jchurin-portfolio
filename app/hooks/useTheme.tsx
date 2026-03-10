import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    /**
     * Detects the initial theme preference from localStorage, system preference, or default
     * @returns Theme preference: "light" or "dark"
     */
    const detectTheme = (): Theme => {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        return stored;
      }

      if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
      }
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }

      return "dark";
    };

    const initialTheme = detectTheme();
    setThemeState(initialTheme);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(initialTheme);
    setMounted(true);
  }, []);

  /**
   * Updates the theme and persists it to localStorage
   * @param newTheme - The theme to set: "light" or "dark"
   */
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  /**
   * Toggles between light and dark themes
   */
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access and control the current theme
 * @returns Theme context with current theme, setTheme, and toggleTheme functions
 * @throws Error if used outside of ThemeProvider
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
