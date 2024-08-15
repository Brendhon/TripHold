"use client";

import { GoogleBtnProps } from '@app/models';
import { Spinner } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

/**
 * Login button - Google
 */
export function GoogleBtn(props?: GoogleBtnProps) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signIn('google', { callbackUrl: '/home' });
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className="flex items-center gap-2 px-6 py-2 bg-grey-thin rounded-md"
      onClick={() => props?.action ? props.action() : handleGoogleLogin()}
    >
      <Image
        hidden={loading}
        src="/google-icon.jpg"
        alt="Google Logo"
        width={25}
        height={25}
      />
      {loading && <Spinner size="sm" />}
      <span className='text-blue-regular font-bold text-medium'>{props?.content ?? 'Google'}</span>
    </button>
  )
}