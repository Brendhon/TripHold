import { TripHoldInviteEmailProps } from "@app/models";
import { EmailButton, EmailText, TripHoldEmailStructure } from "./components";

export const TripHoldInviteEmail = ({
  translations,
  inviterName,
  tripName,
  inviteLink,
}: TripHoldInviteEmailProps) => {
  return (
    <TripHoldEmailStructure translations={translations}>
      <EmailText> {inviterName || "Um amigo"} {translations["message"]} <strong>{tripName}</strong>! </EmailText>
      <EmailText>  {translations["description"]} </EmailText>
      <EmailButton link={inviteLink}> {translations["button"]} </EmailButton>
    </TripHoldEmailStructure>
  );
};

export default TripHoldInviteEmail;
