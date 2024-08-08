import { useSession } from "next-auth/react";

export const SOCIAL_MEDIAS = {
  github: "https://github.com/Brendhon",
  linkedin: "https://www.linkedin.com/in/brendhon-moreira/"
}

export const DEFAULT_LOCALE = "pt";

export const LOCALES = ["pt", "en"];

export const BUTTON_COLORS = {
  "decline": {
    "bg": "bg-red-regular",
    "text": "text-grey"
  },
  "submit": {
    "bg": "bg-purple-semi-bold",
    "text": "text-grey-thin"
  },
  "button": {
    "bg": "bg-grey-thin",
    "text": "text-blue-regular"
  }
}

/**
 * Get avatar from session
 * @param {string} src - Image source
 * @returns Image source
 */
export const getAvatarFromSession = (src?: string) => {
  // If src is defined, return it
  if (src) return src;

  // Session data
  const { data } = useSession();

  switch (true) {
    // Get image from session
    case !!data?.user?.image:
      return data.user.image;

    // Default image
    default:
      return "/avatar.svg";
  }
}