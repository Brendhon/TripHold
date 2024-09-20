import { handleEmailError } from '@utils/email';
import admin from 'lib/firebase/admin-config';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Get uid from the req body
    const { uid, password } = await req.json()

    // Check if uid exists
    if (!uid) throw { error: 'Invalid uid', status: 400 };

    // Update in auth
    await admin
      .auth()
      .updateUser(uid, { password });

    // Return the response
    return NextResponse.json({ uid });
  } catch (error: any) {
    return handleEmailError(error);
  }
}