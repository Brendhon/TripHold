import { TripAdvisorActivity, ActivityCategory, TripAdvisorActivitySearch } from "@app/models";
import { getActivityDetailsPath, getActivityPhotosPath, getSearchActivitiesPath } from "@utils/paths";

/**
 * Form fetch options
 */
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Make fetch request
 * @param {string} path Path
 * @returns {Promise<any>} Response
 */
const request = async (path: string, options: any): Promise<any> => {
  return fetch(path, options).then(response => response.json());
}

/**
 * Get hotels details
 * @param {string} place Place
 * @param {string} locate Locate
 * @returns {Promise<TripAdvisorActivity[]>} Hotels details
 */
export const getHotels = async (place: string, locate: string, pin?: Pin): Promise<TripAdvisorActivitySearch[]> => {
  try {
    return request(getSearchActivitiesPath(ActivityCategory.Hotels, place, locate, pin), options);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Get restaurants details
 * @param {string} place Place
 * @param {string} locate Locate
 */
export const getRestaurantsDetails = async (place: string, locate: string): Promise<TripAdvisorActivitySearch[]> => {
  try {
    return request(getSearchActivitiesPath(ActivityCategory.Restaurants, place, locate), options);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Get attractions details
 * @param {string} place Place
 * @param {string} locate Locate
 */
export const getAttractionsDetails = async (place: string, locate: string): Promise<TripAdvisorActivitySearch[]> => {
  try {
    return request(getSearchActivitiesPath(ActivityCategory.Attractions, place, locate), options);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Get geos details
 * @param {string} place Place
 * @param {string} locate Locate
 */
export const getGeosDetails = async (place: string, locate: string): Promise<TripAdvisorActivitySearch[]> => {
  try {
    return request(getSearchActivitiesPath(ActivityCategory.Geos, place, locate), options);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Get activity detail
 * @param {string} locationId Location ID
 * @param {string} lang Language
 * @param {string} currency Currency
 * @returns {Promise<TripAdvisorActivity>} Activity detail
 */
export const getActivityDetail = async (locationId: string, lang: string, currency: string): Promise<TripAdvisorActivity> => {
  try {
    return request(getActivityDetailsPath(locationId, lang, currency), options);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Get activity photos
 * @param {string} locationId Location ID
 * @param {string} lang Language
 * @returns {Promise<TripAdvisorActivity>} Activity photos
 */
export const getActivityPhotos = async (locationId: string, lang: string): Promise<TripAdvisorActivity> => {
  try {
    return request(getActivityPhotosPath(locationId, lang), options);
  } catch (error) {
    console.log(error);
    throw error;
  }
}