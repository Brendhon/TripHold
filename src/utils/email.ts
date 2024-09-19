import { TripHoldWelcomeEmail } from "email-templates/welcome-email";
import { Resend } from "resend";
import { LOCALES } from "./common";
import TripHoldEmailConfirmation from "email-templates/confirm-email";
import { NextResponse } from "next/server";
import TripHoldInviteEmail from "email-templates/invite-email";
import TripHoldResetPasswordEmail from "email-templates/reset-password";

export const EMAIL_FROM_NAME = "TripHold"
export const EMAIL_FROM_ADDRESS = "delivered@resend.dev"
export const EMAIL_FROM = `${EMAIL_FROM_NAME} <${EMAIL_FROM_ADDRESS}>`;

type EmailSubject = 'welcome' | 'reset' | 'verify' | 'confirmation' | 'invite';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Handle email errors
 * @param {any} error The error object
 */
export const handleEmailError = (error: any) => {
  console.log(error);
  const status = error.status || 500;
  return NextResponse.json({ ...error }, { status });
}

/**
 * Send an email
 * @param {EmailSubject} type The email type
 * @param {string[]} to The email recipients
 * @param {any} data The email data
 * @param {string} locate The email locale
 */
export const sendEmail = async (type: EmailSubject, to: string[], data: any, locate: string) => {
  // Check if the username and locate are valid
  if (!LOCALES.includes(locate)) {
    throw { error: 'Invalid locale', status: 400 };
  }

  // Load the translations
  const translations = await import(`../../messages/${locate ?? 'pt'}.json`);

  // Get the email translations
  const t = translations['Email'];

  // Send the email
  return resend.emails.send({
    from: EMAIL_FROM,
    to: !to?.length ? ['gifabe5715@ofionk.com'] : to,
    subject: t[type]['subject'],
    react: getEmailReact(type, data, t[type]),
  });
}

/**
 * Get the email react component
 * @param {EmailSubject} type The email type
 * @param {any} data The email data
 * @param {any} translations The email translations
 */
const getEmailReact = (type: EmailSubject, data: any, translations: any) => {
  switch (type) {
    case 'welcome':
      return TripHoldWelcomeEmail({ ...data, translations });
    case 'confirmation':
      return TripHoldEmailConfirmation({ ...data, translations });
    case 'invite':
      return TripHoldInviteEmail({ ...data, translations });
    case 'reset':
      return TripHoldResetPasswordEmail({ ...data, translations });
    default:
      return null;
  }
}
