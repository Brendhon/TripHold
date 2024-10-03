import { ActivityLang, TripAdvisorActivitySearch } from '@app/models';
import { inEnum } from '@utils/common';
import { getTripAdvisorActivityDetailsPath } from '@utils/paths';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Get search params from the req
    const searchParams = req.nextUrl.searchParams;

    // locationId
    const locationId = searchParams.get('locationId');

    // Get country and state from the
    const lang = searchParams.get('lang');

    // Currency
    const currency = searchParams.get('currency') ?? 'USD';

    // Validate search params
    switch (true) {
      case !inEnum(ActivityLang, lang):
        throw { status: 400, message: 'Language is invalid' };
      case !locationId:
        throw { status: 400, message: 'locationId is required' };
    }

    // Get the path to the TripAdvisorAPI
    const path = getTripAdvisorActivityDetailsPath(locationId, lang, currency);

    // Options
    const options = {
      method: 'GET', headers: {
        accept: 'application/json',
        Referer: 'https://trip-hold.vercel.app',
        Origin: 'https://trip-hold.vercel.app'
      }
    };

    // Make request
    let resp = await fetch(path, options).then(res => res.json()) as TripAdvisorActivitySearch;

    // Check if resp has error
    if (!resp) throw { status: 500, error: resp };

    // Extract address_string from the response
    resp = {
      ...resp,
      address: resp.address_obj.address_string,
    }

    // Check if resp has error
    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    console.error("Error getting data from TripAdvisorAPI: ", error);
    return NextResponse.json(error, { status: 500 });
  }
}