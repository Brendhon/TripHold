"use client";

import { Session } from "next-auth";
import { getSession, SessionProvider } from "next-auth/react"
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState, } from "react";
import { Structure } from "./Structure";
import { enUS, es, ptBR } from 'date-fns/locale';
import { registerLocale } from "react-datepicker";

// Register locales
registerLocale('es', es)
registerLocale('en', enUS)
registerLocale('pt', ptBR)

/**
 * Auth Provider 
 * @param {PropsWithChildren<any>} props - Props
 */
export function AuthStructure({ children }: PropsWithChildren<any>) {
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
  }, [router]);

  return (
    session &&
    <SessionProvider session={session}>
      <Structure headerProps={{ isLogoClickable: true }}>
        {children}
      </Structure>
    </SessionProvider>
  )
}