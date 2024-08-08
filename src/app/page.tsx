import { DEFAULT_LOCALE } from "@utils/common";
import { redirect } from "next/navigation";

export default async function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
