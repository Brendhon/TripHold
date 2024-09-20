import { Button } from "@react-email/components";

export const EmailButton = ({
  children,
  link,
}: any) => {
  return (
    <Button className="bg-[#8E44AD] rounded text-white text-[16px] font-bold text-center block w-full py-2 my-5" href={link}>
      {children}
    </Button>
  )
};

export default EmailButton;
