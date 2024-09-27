"use client";

import { useTranslations } from 'next-intl';

export function StepDesc(props: { className?: string, desc: string }) {
  // Translations
  const t = useTranslations('Step');

  // Render
  return (
    <span className={`flex justify-center text-[12px] text-grey-light ${props.className}`}>
      <p className='text-justify'> <strong>{t(`desc.description`)}: </strong> {t(`desc.${props.desc}`)}</p>
    </span>
  )
}
