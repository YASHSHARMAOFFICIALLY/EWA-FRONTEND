"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";
import { useTheme } from "@/components/ui/theme-provider";

// ponytail: dropped unstyled:true + neuro-toast-* classNames — those classes
// exist nowhere in globals.css, so toasts rendered naked. Sonner defaults work.
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      {...props}
    />
  );
};

export { Toaster };
