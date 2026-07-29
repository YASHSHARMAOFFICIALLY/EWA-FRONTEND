"use client";

import * as React from "react";
import { THEME_STORAGE_KEY } from "@/components/ui/theme-script";

export type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = React.createContext<
  ThemeProviderState | undefined
>(undefined);

const resolve = (theme: Theme) =>
  theme === "system"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : theme;

// localStorage is the store; useSyncExternalStore reads it without a
// setState-in-effect round trip. Server snapshot falls back to defaultTheme —
// the inline script in layout.tsx already painted the right class before React.
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  const theme = React.useSyncExternalStore(
    subscribe,
    () => (localStorage.getItem(storageKey) as Theme | null) ?? defaultTheme,
    () => defaultTheme,
  );

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolve(theme));
  }, [theme]);

  // TODO(you): when theme === "system", should the UI follow live OS changes?
  // Add a matchMedia("(prefers-color-scheme: dark)") "change" listener here if yes.

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (next: Theme) => {
        localStorage.setItem(storageKey, next);
        listeners.forEach((notify) => notify());
      },
    }),
    [theme, storageKey],
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
