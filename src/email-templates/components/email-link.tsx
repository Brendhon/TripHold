import { Link } from "@react-email/components";

export const EmailLink = ({
  children,
  link,
}: any) => {
  return (
    <Link className="text-[#8E44AD]" href={link}>
      {children}
    </Link>
  )
};

export default EmailLink;
