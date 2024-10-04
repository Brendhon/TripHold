"use client";

import { useTranslations } from 'next-intl';

export function StepDetail(props: { text: string }) {
  // Translations
  const t = useTranslations('Activity');

  // Render
  return <span className='text-lg font-semibold text-grey-extra-light'>{t(props.text)}</span>;
}
