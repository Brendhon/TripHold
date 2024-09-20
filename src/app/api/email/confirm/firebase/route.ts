import { handleEmailError } from '@utils/email';
import admin from 'lib/firebase/admin-config';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
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