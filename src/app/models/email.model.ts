export interface EmailTemplateProps {
  translations: any;
}

export type EmailType = 'welcome' | 'reset' | 'verify' | 'confirm' | 'invite';

export interface TripHoldWelcomeEmailProps extends EmailTemplateProps {
  username?: string;
  userImage?: string;
  inviteLink?: string;
}

export interface TripHoldResetPasswordEmailProps extends EmailTemplateProps {
  resetLink: string;
}

export interface TripHoldInviteEmailProps extends EmailTemplateProps {
  inviterName?: string;
  tripName: string;
  inviteLink: string;
}

export interface TripHoldEmailConfirmationProps extends EmailTemplateProps {
  username?: string;
  confirmationLink: string;
}