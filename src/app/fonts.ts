import { Poppins, Lexend, Montserrat, Roboto, Inter } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lexend",
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVariables = [
  poppins.variable,
  lexend.variable,
  montserrat.variable,
  roboto.variable,
  inter.variable,
].join(" ");

// ponytail: Excon/Ranade/Satoshi dropped — no .woff2 files in repo.
// Add them under src/app/fonts/ and wire next/font/local here:
//   import localFont from "next/font/local";
//   export const excon = localFont({ src: "./fonts/excon.woff2", variable: "--font-excon", display: "swap" });
