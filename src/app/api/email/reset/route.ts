import { handleEmailError, sendEmail } from '@utils/email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Get data from the req body
    const {
      locate,
      to,
      resetLink,
    } = await req.json()

    // Check if the data is valid
    if (!resetLink || !locate) {
      throw { error: 'Missing resetLink or locate', status: 400 };
    }

    // Send the email
    const data = await sendEmail('reset', to, { resetLink }, locate);

    // Return the response
    return NextResponse.json({ data });
  } catch (error: any) {
    return handleEmailError(error);
  }
}