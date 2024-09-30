import { getZipCodeBaseAPIPath } from '@utils/paths';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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

    // Fetch data from the ZipCodeBaseAPI
    const resp = await fetch(path, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // Get data from the resp
    const result: ZipCodeBaseResponse = await resp.json();

    // Get data from the result
    const { results } = result;

    // Filter results with states
    const resultsWithStates = results[code].filter((zip: any) => zip.state);

    // Function to get attributes from the ZipCodeBaseAPI in Set to remove duplicates and remove empty strings
    const getAttributes = (attr: string) => Array.from(new Set(resultsWithStates.map((zip: any) => zip[attr]))).filter((a) => a);

    // Initialize an array to store Zip
    const zip: ZipCode = {
      countryCode: getAttributes('country_code'),
      state: getAttributes('state'),
      city: getAttributes('city'),
      postalCode: getAttributes('postal_code'),
      latitude: getAttributes('latitude').map((lat) => parseFloat(lat)),
      longitude: getAttributes('longitude').map((lng) => parseFloat(lng)),
    }

    // Return data from the ZipCodeBaseAPI
    return NextResponse.json(zip);
  } catch (error) {
    console.error("Error getting data from ZipCodeBaseAPI: ", error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}