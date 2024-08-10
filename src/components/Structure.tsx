"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Footer } from "./Footer";
import { PropsWithChildren } from "react";

/**
 * Structure
 * @param {PropsWithChildren<{}>} props - Props
 */
export function Structure({ children }: PropsWithChildren<{}>) {
  return (
    <NextUIProvider className="p-7 pb-10 h-screen relative">
      {children}
      <Footer />
    </NextUIProvider>
  )
}