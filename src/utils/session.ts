"use client";

import { useSession } from "next-auth/react";

export const getUserId = (): string => {
  // Session
  const { data } = useSession();

  // Get user ID
  const userId = data!.profile?.id;

  // Return user ID
  return userId!;
}