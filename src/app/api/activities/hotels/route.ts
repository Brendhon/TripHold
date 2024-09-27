import { getTripAdvisorPath } from '@utils/paths';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Get search params from the req
    const searchParams = req.nextUrl.searchParams;

    // Get country and state from the
    const lang = searchParams.get('lang');

    // Place
    const place = searchParams.get('place');

    // Place validator
    if (!place) throw { status: 400, message: 'Place is required' };

    // Get the path to the TripAdvisorAPI
    const path = getTripAdvisorPath('hotels', lang, place);

    // Options
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    // Make request
    const resp = await fetch(path, options).then(res => res.json())

    // Check if resp has error
    if (resp.error) throw { status: resp.error.code, message: resp.error.message, error: resp };

    // Return data from the TripAdvisorAPI
    return NextResponse.json({ activities: resp });
  } catch (error) {
    console.error("Error getting data from TripAdvisorAPI: ", error);
    return NextResponse.json(error, { status: 500 });
  }
}