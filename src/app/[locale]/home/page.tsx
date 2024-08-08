"use client";

import {
  AuthProvider,
  Header,
} from "components";

export default function Home() {
  // Render home page
  return (
    <AuthProvider>
      <Header />
    </AuthProvider>
  )
}