import { EmailTemplateProps } from "@app/models";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { DEFAULT_HOST } from "@utils/common";

interface TripHoldInviteEmailProps extends EmailTemplateProps {
  inviterName?: string;
  tripName: string;
  inviteLink: string;
}

const baseUrl = DEFAULT_HOST;

export const TripHoldInviteEmail = ({
  translations,
  inviterName,
  tripName,
  inviteLink,
}: TripHoldInviteEmailProps) => {
  const previewText = translations["subject"] || "Você foi convidado para uma viagem no TripHold!";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="bg-[#2C3E50] mx-auto mb-16 rounded-md">
            <div className="bg-[#2C3E50] rounded-md p-4">
              <Section className="px-12">
                <Img
                  src={`${baseUrl}/logo.svg`}
                  width="200"
                  height="50"
                  alt="Logo"
                />
                <Hr className="border border-solid border-[#e6ebf1] my-5 w-full" />
                <Text className="text-[#E5E8E8] text-[16px] leading-[24px] text-left">
                  {inviterName || "Um amigo"} {translations["message"]} <strong>{tripName}</strong>!
                </Text>
                <Text className="text-[#E5E8E8] text-[16px] leading-[24px] text-left">
                  {translations["description"]}
                </Text>
                <Button
                  className="bg-[#8E44AD] rounded text-white text-[16px] font-bold text-center block w-full py-2 my-5"
                  href={inviteLink}
                >
                  {translations["button"]}
                </Button>
                <Hr className="border border-solid border-[#e6ebf1] my-5 w-full" />
                <Text className="text-[#E5E8E8] text-[16px] leading-[24px] text-left">
                  {translations["help"]}
                  <Link className="text-[#8E44AD]" href="https://triphold.com/support">
                    {translations["support"]}
                  </Link>
                </Text>
                <Text className="text-[#E5E8E8] text-[16px] leading-[24px] text-left">
                  {translations["signature"]}
                </Text>
                <Text className="text-[#E5E8E8] text-[16px] leading-[24px] text-left">
                  {translations["team"]}
                </Text>
              </Section>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default TripHoldInviteEmail;
