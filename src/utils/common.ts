import { Session } from "next-auth";

export const SOCIAL_MEDIAS = {
  github: "https://github.com/Brendhon",
  linkedin: "https://www.linkedin.com/in/brendhon-moreira/"
}

export const DEFAULT_LOCALE = "pt";

export const LOCALES = ["pt", "en"];

export const PUBLIC_PAGES = ["/login"];

export const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://trip-hold.vercel.app",
];

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
 * @param {string} session - Image source
 * @returns Image source
 */
export const getAvatarFromSession = (session?: Session | null) => {
  switch (true) {
    // Get image from session
    case !!session?.user?.image:
      return session.user.image;

    // Default image
    default:
      return "/avatar.svg";
  }
}
