import { getDocumenterCitiesAPIPath } from '@utils/paths';
import { NextResponse, NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Get search params from the req
    const searchParams = req.nextUrl.searchParams;

    // Get country and state from the
    const country = searchParams.get('country');
    const state = searchParams.get('state');

    // If country or state is not provided, return an error
    if (!country) throw { status: 400, message: 'Country is required' };

    // Fetch data from the DocumenterCountryAPI
    const resp = await fetch(getDocumenterCitiesAPIPath(state), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country, state }),
    });

    // Get data from the resp 
    const result: DocumenterCitiesAPI = await resp.json();

    // Get data from the result
    const cities = result.data;

    // Return data from the DocumenterCountryAPI
    return NextResponse.json({ country, state, cities });
  } catch (error: any) {
    console.error("Error getting data from DocumenterCitiesAPI: ", error);
    return new NextResponse(JSON.stringify(error), { status: error?.status ?? 500 });
  }
}