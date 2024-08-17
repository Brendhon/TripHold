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
 * Get intl name
 * @param {Country} country - Country
 * @param {string} locale - Locale
 * @returns {string} Intl name
 */
export const getIntlName = (country: any, locale: string): string => {
  if (!country) return "";
  
  switch (locale) {
    case "pt":
      return country.namesIntl.pt;
    case "es":
      return country.namesIntl.es;
    default:
      return country.namesIntl.en;
  }
}

/**
 * Normalize string
 * @param {string} str - String to normalize
 */
export const normalizeString = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/**
 * search string in other string
 * @param {string} str - String to search
 * @param {string} search - String to search
 */
export const searchInString = (str: string, search: string) => normalizeString(str).includes(normalizeString(search));