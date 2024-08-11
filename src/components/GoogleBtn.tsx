"use client";

import { GoogleBtnProps } from '@app/models';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

/**
 * Login button - Google
 */
export function GoogleBtn(props?: GoogleBtnProps) {
  return (
    <button
      className="flex items-center gap-2 px-6 py-2 bg-grey-thin rounded-md"
      onClick={() => props?.action ? props.action() : signIn('google', { callbackUrl: '/home' })}
    >
      <Image
        src="/google-icon.jpg"
        alt="Google Logo"
        width={25}
        height={25}
      />
      <span className='text-blue-regular font-bold text-medium'>{props?.content ?? 'Google'}</span>
    </button>
  )
}