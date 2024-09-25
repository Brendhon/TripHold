import { getDocumenterCountryAPIPath } from '@utils/paths';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Get search params from the req
    const searchParams = req.nextUrl.searchParams;

    // Get country and state from the
    const country = searchParams.get('country');

    // Get the path to the DocumenterCountryAPI
    const path = getDocumenterCountryAPIPath();

    // Fetch data from the DocumenterCountryAPI
    const resp = country
      ? await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ country }) })
      : await fetch(path);

    // Get data from the resp
    const result: DocumenterCountryAPI = await resp.json();

    // Get data from the result
    const { data } = result;

    // Initialize an array to store Country objects
    const countries: CountrySimple[] = [];

    // Add the Country object to the countries array
    if (data instanceof Array) data.forEach((country) =>
      countries.push({
        name: country.name,
        key: country.iso3,
        codes: [country.iso3],
        states: country.states.map((state) => ({
          name: state.name,
          key: state.state_code,
        })),
      }));
    else countries.push({
      name: data.name,
      key: data.iso3,
      codes: [data.iso3],
      states: data.states.map((state) => ({
        name: state.name,
        key: state.state_code,
      })),
    });

    // Return data from the DocumenterCountryAPI
    return NextResponse.json(countries);
  } catch (error) {
    console.error("Error getting data from DocumenterCountryAPI: ", error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}