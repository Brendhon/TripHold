"use client";

import { AuthProvider, Button, UserImage } from "@app/components";
import { signOut } from "next-auth/react"

export default function Home() {
  // Render home page
  return (
    <AuthProvider>
      <UserImage />
      <Button label="Logout" action={() => signOut({ callbackUrl: "/" })} type="submit" />
    </AuthProvider>
  )
}