import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function App() {
  // Get session
  const session = await getServerSession();

  // Redirect to login if no session
  return session
    ? redirect("/home")
    : redirect("/login");
}
