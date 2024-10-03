import { ActivityCategory, ActivityLang } from '@app/models';
import { inEnum } from '@utils/common';
import { getTripAdvisorLocationActivityPath } from '@utils/paths';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Get search params from the req
    const searchParams = req.nextUrl.searchParams;

    // Category
    const category = searchParams.get('category');

    // Place
    const place = searchParams.get('place');

    // Get country and state from the
    const lang = searchParams.get('lang');

    // Get latitude and longitude
    const latitude = searchParams.get('latitude');

    // Get longitude
    const longitude = searchParams.get('longitude');

    // Validate search params
    switch (true) {
      case !inEnum(ActivityCategory, category):
        throw { status: 400, message: 'Category is invalid' };
      case !inEnum(ActivityLang, lang):
        throw { status: 400, message: 'Language is invalid' };
      case !place:
        throw { status: 400, message: 'Place is required' };
    }

    // Get the path to the TripAdvisorAPI
    let path = getTripAdvisorLocationActivityPath(category!, lang, place);

    // Add latitude and longitude to the path
    if (latitude && longitude) path += `&latLong=${latitude},${longitude}`;

    // Options
    const options = {
      method: 'GET', headers: {
        accept: 'application/json',
        Referer: 'https://trip-hold.vercel.app',
        Origin: 'https://trip-hold.vercel.app'
      }
    };

    // Make request
    const resp = await fetch(path, options).then(res => res.json())

    // Check if resp has error
    if (!resp?.data) throw { status: resp?.error?.code ?? 500, message: resp?.error?.message ?? 'Unexpected Error', error: resp };

    // Check if resp has error
    return NextResponse.json(resp.data, { status: 200 });
  } catch (error) {
    console.error("Error getting data from TripAdvisorAPI - Search: ", error);
    return NextResponse.json(error, { status: 500 });
  }
}