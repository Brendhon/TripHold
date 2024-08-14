import { getZipCodeBaseAPIPath } from '@utils/paths';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Get search params from the req
    const searchParams = req.nextUrl.searchParams;

    // Get country and state from the
    const code = searchParams.get('code');

    // If code is not provided, return an error
    if (!code) throw { status: 400, message: 'Code is required' };

    // Get the path to the ZipCodeBaseAPI
    const path = getZipCodeBaseAPIPath(code);

    console.log(path);

    // Fetch data from the ZipCodeBaseAPI
    const resp = await fetch(path, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // Get data from the resp
    const result: ZipCodeBaseResponse = await resp.json();

    // Get data from the result
    const { results } = result;

    // Initialize an array to store Country objects
    const zips: ZipCode[] = [];

    // For each country in the data
    for (const zip of results[code]) {

      // Transform data into Country objects
      const obj: ZipCode = {
        lat: zip.latitude,
        lon: zip.longitude,
        countryCode: zip.country_code,
        stateCode: zip.state_code,
        city: zip.city,
        postalCode: zip.postal_code,
      };

      // Add the Country object to the countries array
      zips.push(obj);
    }

    // Return data from the ZipCodeBaseAPI
    return NextResponse.json(zips);
  } catch (error) {
    console.error("Error getting data from ZipCodeBaseAPI: ", error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}