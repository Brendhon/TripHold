"use client";

import { ActivityProps } from '@app/models';
import { useLocale } from 'next-intl';


export function SelectTransfer(props: ActivityProps) {
  // Locale
  const locale = useLocale();

  // Render
  return (
    <h1>Transfer</h1>
  );
}
