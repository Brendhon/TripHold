import { Airport } from '@app/models';
import { searchInArray, searchInString, sortByDistance } from '@utils/common';
import axios from 'axios';

/**
 * Get airports from 'airports.json' file
 * @returns {Promise<Airport[]>} Airports
 */
export const getAirportsByCoordinates = async (latitude?: number, longitude?: number, limit = 10): Promise<Airport[]> => {
  try {
    // Get airports in public folder
    const response = await axios.get('/airports.json');

    // Check if response is valid
    if (!response.data) throw { message: 'Invalid response' };

    // Get airports
    const fetchAirports = (lat: number, long: number) => sortByDistance<Airport>(response.data, lat, long)
      .filter((airport: Airport) => airport.iata_code)
      .slice(0, limit)

    // Request user location
    if (!latitude || !longitude) {
      // Request location
      return new Promise<Airport[]>((resolve, reject) => {
        navigator
          .geolocation
          .getCurrentPosition(
            ({ coords }) => resolve(fetchAirports(coords.latitude, coords.longitude)),
            (error) => reject(error)
          );
      });
    } else return fetchAirports(latitude, longitude);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Search airport by name
 * @param {string} search - Search string
 */
export const getAirportByName = async (search: string): Promise<Airport[]> => {
  // Get airports in public folder
  const response = await axios.get('/airports.json');

  // Check if response is valid
  if (!response.data) throw { message: 'Invalid response' };

  // Get airports
  const airports = response.data;

  // Filter airports
  return airports.filter((airport: Airport) => searchInString(airport.name, search)).filter((airport: Airport) => airport.iata_code)
}

/**
 * Get airport by iso_country
 * @param {string} iso_country - ISO country
 */
export const getAirportsByCountry = async (iso_country: string[]): Promise<Airport[]> => {
  // Get airports in public folder
  const response = await axios.get('/airports.json');

  // Check if response is valid
  if (!response.data) throw { message: 'Invalid response' };

  // Get airports
  const airports = response.data;

  // Filter airports
  return airports.filter((airport: Airport) => iso_country.includes(airport.iso_country)).filter((airport: Airport) => airport.iata_code)
}

/**
 * Get airport by municipality
 * @param {string} municipality - Municipality
 */
export const getAirportsByMunicipality = async (municipality: string): Promise<Airport[]> => {
  // Get airports in public folder
  const response = await axios.get('/airports.json');

  // Check if response is valid
  if (!response.data) throw { message: 'Invalid response' };

  // Get airports
  const airports = response.data;

  // Filter airports
  return airports.filter((airport: Airport) => searchInString(airport.municipality, municipality)).filter((airport: Airport) => airport.iata_code)
}

/**
 * Get airport by municipality
 * @param {string} term - Municipality | IATA code | ISO country | Name
 */
export const getAirportsByAdvancedSearch = async (term: string): Promise<Airport[]> => {
  // Get airports in public folder
  const response = await axios.get('/airports.json');

  // Check if response is valid
  if (!response.data || !term) throw { message: 'Invalid data' };

  // Get airports
  const airports = response.data;

  // Check if latitude and longitude exists
  const keys: (keyof Airport)[] = ['name', 'municipality', 'iso_country', 'iata_code'];

  // Filter airports
  return airports.filter((airport: Airport) => searchInArray(term, keys, airport))
}