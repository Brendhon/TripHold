"use client";

import { GoogleBtn, Header, Structure } from "components";

export default function Login() {
  // Render
  return (
    <Structure>
      <Header hideProfile />
      <GoogleBtn />
    </Structure>
  )
}