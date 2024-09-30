export const DEFAULT_LOCALE = "pt";

export const LOCALES = ["pt", "en"];


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