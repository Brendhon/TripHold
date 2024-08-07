"use client";

import { signIn } from 'next-auth/react';
import Image from 'next/image';

interface Props {
  content?: string;
  action?: () => void;
}

/**
 * Login button - Google
 */
export default function GoogleBtn(props?: Props) {
  return (
    <button
      className="flex items-center gap-4 px-8 py-2 bg-grey-thin rounded-md"
      onClick={() => props?.action ? props.action() : signIn('google', { callbackUrl: '/home' })}
    >
      <Image
        src="/google-icon.jpg"
        alt="Google Logo"
        width={50}
        height={50}
      />
      <span className='text-blue-regular font-bold text-xl'>{props?.content ?? 'Google'}</span>
    </button>
  )
}