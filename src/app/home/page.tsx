"use client";

import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<Session>();

  useEffect(() => {
    // Fetch data
    getSession()
      .then(session => {
        // Set user 
        if (session) setUser(session);
        else return redirect("/");
      })
  }, []); // Run once


  // Render
  return (
    <main>
      <h1>Welcome</h1>
      <span>Olá, {user?.user?.name}</span>
      <span>Email: {user?.user?.email}</span>
      <span>Image: {user?.user?.image}</span>

      <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
    </main>
  )
}