"use client";

import { User } from "@app/models";
import { Card } from "@nextui-org/react";
import { UserForm } from "components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Profile() {
  // Router
  const router = useRouter();

  // Get user ID
  const { data, update } = useSession();

  // Handle input change
  const handleChange = (e?: User) => {
    // Go back
    router.back();

    // Reload page
    update({
      user: { email: e?.email, name: e?.name, image: e?.image },
      profile: e
    });

    // Reload page
    router.refresh();
  }

  // Render home page
  return (
    <div className="flex justify-center">
      <Card className="gap-4 p-5 flex md:w-[800px]">

        <UserForm user={data?.profile} action={handleChange} />
      </Card>
    </div>
  )
}