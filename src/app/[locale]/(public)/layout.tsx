import { Structure } from "components";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Structure
      headerProps={{ hideProfile: true }}
      mainProps={{ className: "md:flex md:flex md:justify-center md:items-center" }}>
      {children}
    </Structure>
  );
}
