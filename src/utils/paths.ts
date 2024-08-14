/**
 * Get user path
 * @param {string} email User email
 * @returns User path
 */
export const getUsersPath = (email?: string) => {
  return `/users/${email || ""}`;
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
 * Get countries path
 * @returns Countries path
 */
export const getCountriesPath = () => {
  return  `${window.location.origin}/api/countries`;
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