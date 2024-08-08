import type { Metadata } from "next";
import "@styles/globals.css";

export const metadata: Metadata = {
  title: "TripHold",
  description: "TripHold - Your trip planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
