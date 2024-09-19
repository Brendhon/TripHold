import WelcomeEmail from "email-templates/welcome-email";
import { Resend } from "resend";

export const EMAIL_FROM_NAME = "TripHold"
export const EMAIL_FROM_ADDRESS = "delivered@resend.dev"

export const EMAIL_FROM = `${EMAIL_FROM_NAME} <${EMAIL_FROM_ADDRESS}>`;

type EmailSubject = 'welcome' | 'reset' | 'verify';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send an email
 * @param {EmailSubject} type The email type
 * @param {string[]} to The email recipients
 * @param {any} data The email data
 * @param {string} locate The email locale
 */
export const sendEmail = async (type: EmailSubject, to: string[], data: any, locate?: string) => {
  // Load the translations
  let translations = await import(`../../messages/${locate ?? 'pt'}.json`);

  if (!translations) {
    throw new Error('Invalid locale');
  }

  // Get the email translations
  translations = translations['Email'];

  // Send the email
  return resend.emails.send({
    from: EMAIL_FROM,
    to: to.length === 0 ? ['gifabe5715@ofionk.com'] : to,
    subject: translations[type]['subject'],
    react: getEmailReact(type, data, translations[type]),
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
      return WelcomeEmail({ ...data, translations });
    default:
      return null;
  }
}
