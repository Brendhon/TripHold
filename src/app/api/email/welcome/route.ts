import { handleEmailError, sendEmail } from '@utils/email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Get username from the req body
    const { username, locate, to } = await req.json()

    // Check if the username and locate are valid
    if (!username || !locate) {
      throw { error: 'Missing username or locate', status: 400 };
    }

    // Send the email
    const data = await sendEmail('welcome', to, { username }, locate);

    // Return the response
    return NextResponse.json({ data });
  } catch (error: any) {
    return handleEmailError(error);
  }
}