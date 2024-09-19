import { LOCALES } from '@utils/common';
import { sendEmail } from '@utils/email';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // Get username from the req body
    const { username, locate } = await req.json()

    // Check if the username and locate are valid
    if (!username || !LOCALES.includes(locate)) {
      return new NextResponse("Missing username or locate", { status: 400 });
    }

    // Send the email
    const data = await sendEmail('welcome', [], { username }, locate);

    // Return the response
    return NextResponse.json({ data });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}