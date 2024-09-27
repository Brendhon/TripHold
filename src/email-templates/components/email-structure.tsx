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
  const url = "https://trip-hold.vercel.app";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="bg-white mx-auto mb-16 rounded-md">
            <div className="bg-white rounded-md p-4">
              <Section className="px-12">
                <div className="flex justify-center w-full text-center items-center">
                  <Img
                    className="m-auto"
                    src={url + '/dark-logo.png'}
                    width="200"
                    height="50"
                    alt="Logo"
                  />
                </div>
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
