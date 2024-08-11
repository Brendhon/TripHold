"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { StructureProps } from "@app/models";

/**
 * Structure
 * @param {StructureProps} props - Props
 */
export function Structure(props: StructureProps) {
  return (
    <NextUIProvider className="p-7 pb-0 h-full min-h-screen flex flex-col justify-between">
      <div>
        <Header {...props.headerProps} />
        <main {...props.mainProps}> {props.children} </main>
      </div>
      <Footer />
    </NextUIProvider>
  )
}