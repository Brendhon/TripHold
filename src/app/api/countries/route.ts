import { getRestCountriesAPIPath } from '@utils/paths';
import { NextResponse } from 'next/server';

/**
 * Parse the RestCountriesAPI data to a Country object
 * @param {RestCountriesAPI} country - Country from the RestCountriesAPI
 * @returns {Country} - Country object
 */
const parseRCountryToCountry = (country: RestCountriesAPI): Country => {
  return {
    name: country.name.common,
    key: country.cca2 ?? country.cca3,
    flag: country.flags.svg,
    codes: [country.cca2, country.cca3, country.cioc ?? "", country.ccn3 ?? ""].filter((c) => c),
    capital: country.capital ? country.capital.join(', ') : "",
    carSide: country.car.side,
    currencies: country.currencies ? Object.keys(country.currencies) : [],
    languages: country.languages ? Object.values(country.languages) : [],
    population: country.population,
    timezones: country.timezones,
    namesIntl: {
      en: country.name.common,
      pt: country.translations.por.common,
      es: country.translations.spa.common,
    }
  };
}

export async function GET() {
  try {
    // Fetch data from the RestCountriesAPI
    const resp = await fetch(getRestCountriesAPIPath());

    // Get data from the resp
    const data: RestCountriesAPI[] = await resp.json();

    // Initialize an array to store Country objects
    const countries: Country[] = [];

    // For each country in the data add the Country object to the countries array
    for (const country of data) countries.push(parseRCountryToCountry(country));

    // Return data from the RestCountriesAPI
    return NextResponse.json(countries);
  } catch (error) {
    console.error("Error getting data from RestCountriesAPI: ", error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}