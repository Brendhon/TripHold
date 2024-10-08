import { ActivityCategory, EmailType } from "@app/models";

/**
 * Get user path
 * @param {string} email User email
 * @returns User path
 */
export const getUsersPath = (email?: string) => {
  return `/users/${email || ""}`;
}

/**
 * Get Storage - Users path
 * @param {string} id User ID
 * @returns Storage - Users path
 */
export const getStorageUsersPath = (id: string) => {
  return `users/${id}`;
}

/**
 * Get trip path
 * @param {string} id Trip ID
 * @returns Trip path
 */
export const getTripsPath = (id?: string) => {
  return `/trips/${id || ""}`;
}

/**
 * Get activity path
 * @param {string} id Trip ID
 * @param {string} activityID Activity ID
 * @returns Activity path
 */
export const getFireActivitiesPath = (id: string, activityID?: string) => {
  return `/trips/${id}/activities/${activityID || ""}`;
}

/**
 * Terms path
 * @returns Terms path
 */
export const getTermsPath = () => {
  return "https://nextui.org/docs/components/link";
}

/**
 * Get path to DocumenterCountryAPI
 */
export const getDocumenterCountryAPIPath = () => {
  return "https://countriesnow.space/api/v0.1/countries/states";
}

/**
 * Get path to DocumenterCitiesAPI
 */
export const getDocumenterCitiesAPIPath = (state: string | null) => {
  return state
    ? "https://countriesnow.space/api/v0.1/countries/state/cities"
    : "https://countriesnow.space/api/v0.1/countries/cities";
}

/**
 * Get path to RestCountriesAPI
 */
export const getRestCountriesAPIPath = () => {
  return "https://restcountries.com/v3.1/all";
}

/**
 * Get path to ZipCodeBaseAPI
 */
export const getZipCodeBaseAPIPath = (code: string) => {
  return `https://app.zipcodebase.com/api/v1/search?apikey=${process.env.ZIP_CODE_API_KEY}&codes=${code}`;
}

/**
 * Get location trip advisor path
 */
export const getTripAdvisorLocationActivityPath = (category: string, language: string | null, searchQuery: string) => {
  return `https://api.content.tripadvisor.com/api/v1/location/search?key=${process.env.TRIP_ADVISOR_API_KEY}&category=${category}&language=${language || "pt"}&searchQuery=${searchQuery}`;
}

/**
 * Get location trip advisor details path
 * @param {string} locationID Location ID
 * @param {string} language Language
 * @param {string} currency Currency
 * @returns Location trip advisor details path
 */
export const getTripAdvisorActivityDetailsPath = (locationID: string, language: string | null, currency: string | null) => {
  return `https://api.content.tripadvisor.com/api/v1/location/${locationID}/details?key=${process.env.TRIP_ADVISOR_API_KEY}&language=${language || "pt"}&currency=${currency || "USD"}`;
}

/**
 * Get location trip advisor photos path
 * @param {string} locationID Location ID
 * @param {string} language Language
 * @param {number} limit Limit
 * @returns Location trip advisor photos path
 */
export const getTripAdvisorActivityPhotosPath = (locationID: string, language: string | null, limit: number = 5) => {
  return `https://api.content.tripadvisor.com/api/v1/location/${locationID}/photos?key=${process.env.TRIP_ADVISOR_API_KEY}&language=${language || "pt"}&limit=${limit}`;
}

/**
 * Get countries path
 * @returns Countries path
 */
export const getCountriesPath = () => {
  return `${window.location.origin}/api/countries`;
}

/**
 * Get Activities path
 * @param {string} category Category
 * @returns Activities path
 */
export const getSearchActivitiesPath = (category: ActivityCategory, place: string, lang: string, pin?: Pin) => {
  return `${window.location.origin}/api/activities/search?category=${category}&place=${place}&lang=${lang}${pin ? `&latitude=${pin.latitude}&longitude=${pin.longitude}` : ""}`;
}

/**
 * Get Activity details path
 * @param {string} locationId Location ID
 * @param {string} lang Language
 * @param {string} currency Currency
 * @returns Activity details path
 */
export const getActivityDetailsPath = (locationId: string, lang: string, currency?: string) => {
  return `${window.location.origin}/api/activities/details?locationId=${locationId}&lang=${lang}${currency ? `&currency=${currency}` : ""}`;
}

/**
 * Get Activity photos path
 * @param {string} locationId Location ID
 * @param {string} lang Language
 * @returns Activity photos path
 */
export const getActivityPhotosPath = (locationId: string, lang: string) => {
  return `${window.location.origin}/api/activities/photos?locationId=${locationId}&lang=${lang}`;
}

/**
 * Get email path
 * @param {string} endpoint Endpoint
 * @returns Email path
 */
export const getEmailPath = (endpoint: EmailType) => {
  return `${window.location.origin}/api/email/${endpoint}`;
}

/**
 * Get states path
 * @param {string} country Country Name
 * @returns States path
 */
export const getStatesPath = (country?: string) => {
  return `${window.location.origin}/api/countries/states${country ? `?country=${country}` : ""}`;
}

/**
 * Get cities path
 * @param {string} country Country Name
 * @param {string} state State Name
 * @returns Cities path
 */
export const getCitiesPath = (country: string, state?: string) => {
  return `${window.location.origin}/api/countries/cities?country=${country}${state ? `&state=${state}` : ""}`;
}

/**
 * Get zip code path
 * @param {string} code Zip Code
 * @returns Zip Code path
 */
export const getZipCodePath = (code: string) => {
  return `${window.location.origin}/api/countries/zip?code=${code}`;
}