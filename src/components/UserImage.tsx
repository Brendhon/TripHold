"use client";

import { getAvatarFromSession } from '@utils/common';
import Image from 'next/image';

interface Props {
  src?: string;
  clickable?: boolean;
  action?: () => void;
}

/**
 * User Image - Avatar
 */
export function UserImage(props?: Props) {
  return (
    <Image
      src={getAvatarFromSession(props?.src)} alt="User Image"
      className="rounded-full border-purple-semi-bold border-2"
      onClick={() => props?.action ? props.action() : null}
      style={{ cursor: props?.clickable ? "pointer" : "default" }}
      width={50} height={50} />
  )
}