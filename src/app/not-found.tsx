"use client";

import { PiEmptyFill } from "react-icons/pi";
import "@styles/globals.css";

/**
 * Not found page
 */
export default function NotFound() {
  return (
    <html>
      <body className="flex items-center justify-center h-screen flex-col">
        <PiEmptyFill className="text-8xl text-grey-thin" />
        <h1 className="text-4xl font-bold text-center"> 404 - Page not found </h1>
      </body>
    </html>
  )
}