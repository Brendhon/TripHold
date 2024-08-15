import { AuthStructure } from "components";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthStructure>
      {children}
    </AuthStructure>
  );
}
