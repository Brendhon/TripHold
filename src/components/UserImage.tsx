"use client";

import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface Props {
  src?: string;
  action?: () => void;
}

/**
 * User Image - Avatar
 */
export function UserImage(props?: Props) {
  // Session data
  const { data } = useSession();

  /**
   * Get image URL
   * @returns Image URL
   */
  const getImagem = () => {
    switch (true) {
      // Get image from props
      case !!props?.src:
        return props.src;

      // Get image from session
      case !!data?.user?.image:
        return data.user.image;

      // Default image
      default:
        return "/avatar.svg";
    }
  }

  return (
    <Image
      src={getImagem()} alt="User Image"
      className="rounded-full border-purple-semi-bold border-2"
      onClick={() => props?.action ? props.action() : null}
      style={{ cursor: props?.action ? "pointer" : "default" }}
      width={50} height={50} />
  )
}