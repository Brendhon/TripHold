import type { Metadata } from "next";
import "@styles/globals.css";

export const metadata: Metadata = {
  title: "TripHold",
  description: "TripHold - Your trip planner",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "Brendhon Moreira",
      url: "https://www.linkedin.com/in/brendhon-moreira/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "ios/128.png" },
    { rel: "icon", url: "ios/128.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
