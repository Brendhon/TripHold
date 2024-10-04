"use client";

import { useTranslations } from 'next-intl';

interface Props {
  className?: string,
  type: 'departure' | 'arrival',
  transport: 'transfer' | 'others' | 'flight'
  children: React.ReactNode;
}

export function TransportContentSummary(props: Props) {
  // Translations
  const t = useTranslations('Activity');

  // Render
  return (
    <div className={`flex flex-col border-1 border-grey-light md:rounded-md w-80 ${props.className}`}>
      <span className='flex text-grey-extra-light text-md font-semibold justify-center p-2 items-center rounded-t-md bg-blue-light w-full' >{t(`${props.transport}.${props.type}`)}</span>
      {props.children}
    </div>
  );
}
