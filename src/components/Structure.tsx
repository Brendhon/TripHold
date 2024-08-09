"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Footer } from "./Footer";

/**
 * Structure
 * @param {React.PropsWithChildren<{}>} props - Props
 */
export function Structure({ children }: React.PropsWithChildren<{}>) {
  return (
    <NextUIProvider className="p-7 pb-10 h-screen relative">
      {children}
      <Footer />
    </NextUIProvider>
  )
}