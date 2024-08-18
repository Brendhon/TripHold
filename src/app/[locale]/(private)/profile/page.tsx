"use client";

import { User } from "@app/models";
import { Card } from "@nextui-org/react";
import { useUserId } from "@utils/session";
import { AvatarCropper, UserForm } from "components";
import { uploadUserAvatar } from "lib/firebase/storage/users";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  // Router
  const router = useRouter();

  // Avatar Cropper state
  const [cropper, setCropper] = useState<Blob>();

  // Get user ID
  const { data, update } = useSession();

  // Get user id  
  const userId = useUserId();

  // Handle input change
  const handleChange = async (e?: User) => {
    // Initial data
    let avatar = e?.image;

    // If has data and cropper upload avatar
    if (cropper) avatar = await uploadUserAvatar(cropper, userId);

    // Go back
    router.back();

    // Reload page
    update({
      user: { email: e?.email, name: e?.name, image: avatar },
      profile: e
    });

    // Reload page
    router.refresh();
  }

  // Render home page
  return (
    <div className="flex justify-center">
      <Card className="gap-4 p-5 flex md:w-[800px]">
        <AvatarCropper uploadAvatar={setCropper} />
        <UserForm user={data?.profile} action={handleChange} />
      </Card>
    </div>
  )
}