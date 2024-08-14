import { getRestCountriesAPIPath } from '@utils/paths';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch data from the RestCountriesAPI
    const resp = await fetch(getRestCountriesAPIPath());

    // Get data from the resp
    const data: RestCountriesAPI[] = await resp.json();

    // Initialize an array to store Country objects
    const countries: Country[] = [];

    // For each country in the data
    for (const country of data) {
      // Transform data into Country objects
      const countryObj: Country = {
        // Common attributes
        name: country.name.common,
        key: country.cca3 ?? country.cca2,
        flag: country.flags.svg,
      };

      // Add the Country object to the countries array
      countries.push(countryObj);
    }

    // Return data from the RestCountriesAPI
    return NextResponse.json(countries);
  } catch (error) {
    console.error("Error getting data from RestCountriesAPI: ", error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}