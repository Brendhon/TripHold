import { Airport } from '@app/models';
import { searchInString, sortByDistance } from '@utils/common';
import axios from 'axios';

/**
 * Get airports from 'airports.json' file
 * @returns {Promise<Airport[]>} Airports
 */
export const getAirportsByCoordinates = async (latitude: number, longitude: number, limit = 10): Promise<Airport[]> => {
  try {
    // Get airports in public folder
    const response = await axios.get('../../airports.json');

    // Check if response is valid
    if (!response.data) throw { message: 'Invalid response' };

    // Get airports
    return sortByDistance<Airport>(response.data, latitude, longitude).slice(0, limit);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Search airport by name
 * @param {string} search - Search string
 */
export const getAirportByName = async (search: string): Promise<Airport[]> => {
  // Get airports in public folder
  const response = await axios.get('../../airports.json');

  // Check if response is valid
  if (!response.data) throw { message: 'Invalid response' };

  // Get airports
  const airports = response.data;

  // Filter airports
  return airports.filter((airport: Airport) => searchInString(airport.name, search));
}

/**
 * Get airport by iso_country
 * @param {string} iso_country - ISO country
 */
export const getAirportsByCountry = async (iso_country: string): Promise<Airport[]> => {
  // Get airports in public folder
  const response = await axios.get('../../airports.json');

  // Check if response is valid
  if (!response.data) throw { message: 'Invalid response' };

  // Get airports
  const airports = response.data;

  // Filter airports
  return airports.filter((airport: Airport) => airport.iso_country === iso_country);
}

/**
 * Get airport by municipality
 * @param {string} municipality - Municipality
 */
export const getAirportsByMunicipality = async (municipality: string): Promise<Airport[]> => {
  // Get airports in public folder
  const response = await axios.get('../../airports.json');

  // Check if response is valid
  if (!response.data) throw { message: 'Invalid response' };

  // Get airports
  const airports = response.data;

  // Filter airports
  return airports.filter((airport: Airport) => searchInString(airport.municipality, municipality));
}