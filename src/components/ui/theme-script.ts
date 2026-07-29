export const THEME_STORAGE_KEY = "ewa-theme";

/** Blocking pre-paint script — kills the flash of wrong theme.
 *  Server-callable, so it lives outside the "use client" provider file. */
export const themeScript = (
  storageKey = THEME_STORAGE_KEY,
  fallback = "light",
) =>
  `(function(){try{var t=localStorage.getItem(${JSON.stringify(storageKey)})||${JSON.stringify(fallback)};if(t==="system"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.classList.add(t)}catch(e){}})()`;
