"use client";

import { AuthProvider } from "components";

export default function Home() {
  // Render home page
  return (
    <AuthProvider>
      <div>Olá</div>
    </AuthProvider>
  )
}