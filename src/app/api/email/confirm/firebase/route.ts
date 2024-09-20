import { ALLOWED_ORIGINS } from '@utils/common';
import { handleEmailError } from '@utils/email';
import admin from 'lib/firebase/admin-config';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Get origin from the request
    const requestOrigin = req.nextUrl.origin;

    // Check if if allowed origin 
    if (!ALLOWED_ORIGINS.includes(requestOrigin)) throw { error: 'Invalid origin', status: 400 };

    // Get uid from the req body
    const { uid } = await req.json()

    // Check if uid exists
    if (!uid) throw { error: 'Invalid uid', status: 400 };

    // Update in auth
    const data = await admin
      .auth()
      .updateUser(uid, { emailVerified: true });

    // Update in firestore
    await admin
      .firestore()
      .collection('users')
      .doc(uid)
      .update({ emailVerified: true });

    // Return the response
    return NextResponse.json({ uid, email: data.email, emailVerified: true });
  } catch (error: any) {
    return handleEmailError(error);
  }
}