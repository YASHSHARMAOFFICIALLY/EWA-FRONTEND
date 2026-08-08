import {
  Poppins,
  Lexend,
  Montserrat,
  Roboto,
  Inter,
  JetBrains_Mono,
} from "next/font/google";

// Brand pair (Velvet Violet · Pair 2): Inter for UI, JetBrains Mono for numbers.
// Inter is declared below with the comparison weights; --font-sans maps to it
// in globals.css @theme inline.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Full weight range for comparison. Once you've picked your fonts,
// trim each array back to only the weights you actually use in the UI
// (fewer weights = smaller font payload = faster loads).

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-lexend",
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const roboto = Roboto({
  subsets: ["latin"],
  // Roboto has no 600 — it ships 100/300/400/500/700/900.
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVariables = [
  poppins.variable,
  lexend.variable,
  montserrat.variable,
  roboto.variable,
  inter.variable,
  jetbrainsMono.variable,
].join(" ");

// Excon/Ranade/Satoshi dropped — no .woff2 files in repo.
// Add them under src/app/fonts/ and wire next/font/local here:
//   import localFont from "next/font/local";
//   export const excon = localFont({ src: "./fonts/excon.woff2", variable: "--font-excon", display: "swap" });
