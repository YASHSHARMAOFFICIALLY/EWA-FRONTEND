import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { THEME_STORAGE_KEY, themeScript } from "@/components/ui/theme-script";
import { ViewTransitions } from "next-view-transitions";
import { ReactLenis } from "@/utils/lenis";
import { Toaster } from "@/components/ui/sonner";
import { fontVariables } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Your App Name",
    template: "%s | Your App Name",
  },
  description: "Your app description goes here.",
  keywords: ["your", "keywords", "here"],
  authors: [{ name: "@yourhandle" }],
  creator: "Your App Name",
  publisher: "Your App Name",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  category: "website",
  openGraph: {
    title: "Your App Name",
    description: "Your app description goes here.",
    url: "/",
    siteName: "Your App Name",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your App Name",
    description: "Your app description goes here.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: themeScript(THEME_STORAGE_KEY, "light"),
            }}
          />
        </head>
        <ReactLenis root>
          <body className={fontVariables}>
            <ThemeProvider defaultTheme="light" storageKey={THEME_STORAGE_KEY}>
              {children}
              <Toaster />
            </ThemeProvider>
          </body>
        </ReactLenis>
      </html>
    </ViewTransitions>
  );
}
