import { handleEmailError, sendEmail } from '@utils/email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Get data from the req body
    const {
      locate,
      to,
      inviterName,
      tripName,
      inviteLink,
    } = await req.json()

    // Check if the data is valid
    if (!inviterName || !tripName || !inviteLink || !locate) {
      throw { error: 'Missing inviter name, trip name, invite link or locate', status: 400 };
    }

    // Send the email
    const data = await sendEmail('invite', to, { inviterName, tripName, inviteLink }, locate);

    // Return the response
    return NextResponse.json({ data });
  } catch (error: any) {
    return handleEmailError(error);
  }
}