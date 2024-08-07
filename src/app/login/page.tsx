"use client";

import { GoogleBtn, Header, Structure } from "@app/components";

export default function Login() {
  // Render
  return (
    <Structure>
      <Header hideProfile />
      <GoogleBtn />
    </Structure>
  )
}