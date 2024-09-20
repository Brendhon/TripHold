import { TripHoldEmailConfirmationProps } from "@app/models";
import { EmailButton, EmailText, TripHoldEmailStructure } from "./components";

export const TripHoldEmailConfirmation = ({
  translations,
  username,
  confirmationLink,
}: TripHoldEmailConfirmationProps) => {
  return (
    <TripHoldEmailStructure translations={translations}>
      <EmailText> {translations["message"]}, <strong>{username}</strong>! </EmailText>
      <EmailText> {translations["instructions"]} </EmailText>
      <EmailButton link={confirmationLink}> {translations["button"]} </EmailButton>
    </TripHoldEmailStructure>
  );
};

export default TripHoldEmailConfirmation;
