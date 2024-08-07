"use client";

import {
  AuthProvider,
  Button,
  Header,
} from "@app/components";
import { signOut } from "next-auth/react"

export default function Home() {
  // Render home page
  return (
    <AuthProvider>
      <Header />
      <Button label="Logout" action={() => signOut({ callbackUrl: "/" })} type="submit" />
    </AuthProvider>
  )
}