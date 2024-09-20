import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind
} from "@react-email/components";
import EmailDivider from "./email-divider";
import EmailLink from "./email-link";
import EmailText from "./email-text";

export const TripHoldEmailStructure = ({ translations, children }: any) => {
  const previewText = translations["subject"] || "Bem vindo ao TripHold!";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="bg-white mx-auto mb-16 rounded-md">
            <div className="bg-white rounded-md p-4">
              <Section className="px-12">
                <Img
                  src={'https://firebasestorage.googleapis.com/v0/b/triphold.appspot.com/o/email%2Fdark-logo.svg?alt=media&token=2cf80ec5-7197-4b75-98d4-a2d240c2ed76'}
                  width="200"
                  height="50"
                  alt="Logo"
                />
                {children}
                <EmailDivider />
                <EmailText> {translations["help"]} <EmailLink link="https://triphold.com/support"> {translations["support"]} </EmailLink></EmailText>
                <EmailText> {translations["signature"]} </EmailText>
                <EmailText> {translations["team"]} </EmailText>
              </Section>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default TripHoldEmailStructure;
