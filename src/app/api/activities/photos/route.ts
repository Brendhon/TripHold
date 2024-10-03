import { ActivityLang, ActivityPhotos, TripAdvisorActivityPhotos } from '@app/models';
import { inEnum } from '@utils/common';
import { getTripAdvisorActivityPhotosPath } from '@utils/paths';
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

    // Validate search params
    switch (true) {
      case !inEnum(ActivityLang, lang):
        throw { status: 400, message: 'Language is invalid' };
      case !locationId:
        throw { status: 400, message: 'locationId is required' };
    }

    // Get the path to the TripAdvisorAPI
    const path = getTripAdvisorActivityPhotosPath(locationId, lang);

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
    if (!resp.data) throw { status: resp?.error?.code ?? 500, message: resp?.error?.message ?? 'Unexpected Error', error: resp };

    // Format the response to return
    const photos: ActivityPhotos[] = resp.data.map((photo: TripAdvisorActivityPhotos) => {
      return {
        id: photo.id,
        url: photo.images.large.url,
        width: photo.images.large.width,
        height: photo.images.large.height,
        caption: photo.caption,
        date: photo.published_date
      }
    });

    // Check if resp has error
    return NextResponse.json(photos, { status: 200 });
  } catch (error) {
    console.error("Error getting data from TripAdvisorAPI: ", error);
    return NextResponse.json(error, { status: 500 });
  }
}