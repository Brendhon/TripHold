"use client";

import { useTranslations } from 'next-intl';

export function StepTitle(props: { title: string }) {
  // Translations
  const t = useTranslations('Step');

  // Render
  return <h2 className='text-2xl mb-6 font-semibold'>{t(`title.${props.title}`)}</h2>
}
