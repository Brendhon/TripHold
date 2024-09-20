import { TripHoldResetPasswordEmailProps } from "@app/models";
import { EmailButton, EmailText, TripHoldEmailStructure } from "./components";

export const TripHoldResetPasswordEmail = ({
  translations,
  resetLink,
}: TripHoldResetPasswordEmailProps) => {
  return (
    <TripHoldEmailStructure translations={translations}>
      <EmailText> {translations["message"]} </EmailText>
      <EmailButton link={resetLink}> {translations["button"]} </EmailButton>
    </TripHoldEmailStructure>
  );
};

export default TripHoldResetPasswordEmail;
