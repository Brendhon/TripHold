import { Text } from "@react-email/components";

export const EmailText = ({
  children,
}: any) => {
  return <Text className="text-[#303030] text-[16px] leading-[24px] text-left">      {children}    </Text>;
};

export default EmailText;
