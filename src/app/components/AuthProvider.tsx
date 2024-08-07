"use client";

import { Session } from "next-auth";
import { getSession, SessionProvider, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState, } from "react";
import { Structure } from "./Structure";

/**
 * Auth Provider 
 * @param {React.PropsWithChildren<{}>} props - Props
 */
export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
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

  return (
    session &&
    <SessionProvider session={session}>
      <Structure>
        {children}
      </Structure>
    </SessionProvider>
  )
}