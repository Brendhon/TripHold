"use client";

import { Button, UserImage } from "@app/components";
import { Session } from "next-auth";
import { getSession, SessionProvider, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState,   } from "react";

export default function Home() {
  // Session data
  const [session, setSession] = useState<Session>();

  // Router
  const router = useRouter();

  // Get session on load or redirect to login - Run once
  useEffect(() => {
    getSession()
    .then(session => {
      session ? setSession(session) : router.push("/login");
    });
  }, []);

  // Render home page
  return (
    <SessionProvider session={session}>
      <h1>Welcome</h1>
      <span>Olá, {session?.user?.name}</span>
      <span>Email: {session?.user?.email}</span>

      <UserImage />
      <Button label="Logout" action={() => signOut({ callbackUrl: "/" })} type="submit" />
    </SessionProvider>
  )
}