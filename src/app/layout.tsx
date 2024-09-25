import type { Metadata } from "next";
import "@styles/globals.css";

export const metadata: Metadata = {
  title: "TripHold",
  description: "TripHold - Your trip planner",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  authors: [
    {
      name: "Brendhon Moreira",
      url: "https://www.linkedin.com/in/brendhon-moreira/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "ios/128.png" },
    { rel: "icon", url: "ios/128.png" },
  ],
};

export const viewport = {
  themeColor: "#303030",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
