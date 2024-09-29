import { Activity, ActivityCategory } from "@app/models";
import { getActivitiesPath } from "@utils/paths";

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
 * @returns {Promise<Activity[]>} Hotels details
 */
export const getHotelsDetails = async (place: string, locate: string): Promise<Activity[]> => {
  try {
    return request(getActivitiesPath(ActivityCategory.Hotels, place, locate), options);
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
export const getRestaurantsDetails = async (place: string, locate: string): Promise<Activity[]> => {
  try {
    return request(getActivitiesPath(ActivityCategory.Restaurants, place, locate), options);
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
export const getAttractionsDetails = async (place: string, locate: string): Promise<Activity[]> => {
  try {
    return request(getActivitiesPath(ActivityCategory.Attractions, place, locate), options);
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
export const getGeosDetails = async (place: string, locate: string): Promise<Activity[]> => {
  try {
    return request(getActivitiesPath(ActivityCategory.Geos, place, locate), options);
  } catch (error) {
    console.log(error);
    throw error;
  }
}