import { TripHoldWelcomeEmailProps } from "@app/models";
import { DEFAULT_HOST } from "@utils/common";
import { EmailButton, EmailText, TripHoldEmailStructure } from "./components";

const baseUrl = DEFAULT_HOST;

export const TripHoldWelcomeEmail = ({ translations, username }: TripHoldWelcomeEmailProps) => {
  return (
    <TripHoldEmailStructure translations={translations}>
      <EmailText> {translations["message"]}, <strong>{username}</strong>! </EmailText>
      <EmailText> {translations["description"]} </EmailText>
      <EmailButton link={baseUrl}> {translations["button"]} </EmailButton>
    </TripHoldEmailStructure>
  );
};

export default TripHoldWelcomeEmail;
