import { ActivityTransportType, Airport, FlightActivity, LatLng, TripAdvisorActivitySearch } from "@app/models";

export const SOCIAL_MEDIAS = {
  github: "https://github.com/Brendhon",
  linkedin: "https://www.linkedin.com/in/brendhon-moreira/"
}

export let CURRENT_FLAG = "";

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

/**
 * Search in array of keys
 * @param {string} search - String to search
 * @param {string[]} keys - Array of keys
 * @param {object} obj - Object to search
 * @returns {boolean} If found
 */
export const searchInArray = <T>(search: string, keys: Array<keyof T>, obj: T): boolean => {
  for (const key of keys) if (searchInString(String(obj[key]), search)) return true;
  return false;
}

/**
 * Check if string is type of enum
 * @param {string} str - String to check
 * @param {any} enumType - Enum type
 */
export const inEnum = (enumType: any, str: string | null) => {
  return str && Object.values(enumType).includes(str);
};

/**
 * Function to calculate the distance between two coordinates (Haversine formula)
 */
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const toRadians = (degree: number): number => degree * (Math.PI / 180);
  const R = 6371; // Radius of the Earth in kilometers

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Returns the distance in km
};

/**
 * Function to sort the array based on the distance to a specific coordinate
 * @param {LatLng[]} arr Array of data with latitude and longitude
 * @param {number} targetLat Latitude of the target coordinate
 * @param {number} targetLon Longitude of the target coordinate
 * @returns {LatLng[]} Sorted array
 */
export const sortByDistance = <T>(arr: LatLng[], targetLat: number, targetLon: number): T[] => {
  return arr.sort((a: LatLng, b: LatLng) => {
    const distA = calculateDistance(targetLat, targetLon, a.latitude, a.longitude);
    const distB = calculateDistance(targetLat, targetLon, b.latitude, b.longitude);
    return distA - distB; // Sorts from smallest to largest
  }) as T[];
};

// Check if Hotel or Airport
export const isAirport = (data: TripAdvisorActivitySearch | Airport): data is Airport => (data as Airport).iso_country !== undefined;

// Check if is Flight or Transfer Activity
export const isFlightActivity = (data: any): data is FlightActivity => data.subType === ActivityTransportType.Flight;