import { EmailTemplateProps } from "@app/models";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Tailwind,
  Text
} from "@react-email/components";

interface WelcomeEmailProps extends EmailTemplateProps {
  username?: string;
  userImage?: string;
  inviteLink?: string;
}

export const WelcomeEmail = ({ translations, username }: WelcomeEmailProps) => {
  // Default values
  const previewText = username || "Brendhon";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Text className="text-[#666666] text-[12px] leading-[24px] m-0">
              {translations["subject"]}, {username}
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full m-0" />
            <Text className="text-[#666666] text-[12px] leading-[24px] m-0">
              {translations["message"]},
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
