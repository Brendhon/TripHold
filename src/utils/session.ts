"use client";

import { User } from "@app/models";
import { useSession } from "next-auth/react";

/**
 * Get user ID from session
 * @returns User ID from session
 */
export const useUserId = (): string => {
  // Session
  const { data } = useSession();

  // Get user ID
  const userId = data!.profile?.id;

  // Return user ID
  return userId!;
}

/**
 * Get user data from session
 * @returns User data from session
 */
export const useUserData = () => {
  // Session
  const { data } = useSession();

  // Get user ID
  return data!.profile as User;
}

/**
 * Get avatar from session
 * @returns Image source
 */
export const useUserAvatar = () => {
  // Session
  const { data } = useSession();

  switch (true) {
    // Get image from session
    case !!data?.profile?.image:
      return data.profile.image;

    // Default image
    default:
      return "/avatar.svg";
  }
}

/**
 * Get user name from session
 * @returns User name
 */
export const useUserName = () => {
  // Session
  const { data } = useSession();

  // Get user name
  return data!.profile?.name;
}

/**
 * Update Local data
 */
export const updateLocalData = async (e: User, router: any) => {
  // Get user ID
  const { update } = useSession();

  // Initial data
  let avatar = e?.image;

  // Reload page
  await update({
    user: { email: e?.email, name: e?.name, image: avatar },
    profile: { ...e, image: avatar }
  });

  // Go back
  router.back();

  // Reload page
  router.refresh();
}