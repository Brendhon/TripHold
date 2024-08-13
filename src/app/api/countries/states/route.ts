import { getDocumenterCountryAPIPath } from '@utils/paths';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch data from the DocumenterCountryAPI
    const resp = await fetch(getDocumenterCountryAPIPath());

    // Get data from the resp
    const result: DocumenterCountryAPI = await resp.json();

    // Get data from the result
    const { data } = result;

    // Initialize an array to store Country objects
    const countries: Country[] = [];

    // For each country in the data
    for (const country of data) {

      // Transform data into Country objects
      const countryObj: Country = {
        name: country.name,
        code: country.iso3,
        states: country.states.map((state) => ({
          name: state.name,
          code: state.state_code,
        })),
      };

      // Add the Country object to the countries array
      countries.push(countryObj);
    }

    // Return data from the DocumenterCountryAPI
    return NextResponse.json(countries);
  } catch (error) {
    console.error("Error getting data from DocumenterCountryAPI: ", error);
    return NextResponse.error();
  }
}