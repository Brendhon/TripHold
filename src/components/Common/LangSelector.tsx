"use client";

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function LangSelector() {
  // Get translations
  const t = useTranslations('ProfileDropdown');

  // Initialize transition
  const [isPending, startTransition] = useTransition();

  // Get router
  const router = useRouter();

  // Get locale
  const locate = useLocale();

  // Handle language change
  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const path = `/${e.target.value}${window.location.pathname.split(`/${locate}`)[1]}`;
    startTransition(() => router.replace(path));
  }

  return (
    <select
      className="z-10 outline-none w-24 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-grey-light dark:border-grey-light bg-blue-light text-grey-thin cursor-pointer"
      id="theme"
      name="theme"
      disabled={isPending}
      defaultValue={locate}
      onChange={handleLangChange}
    >
      <option value="pt">{t('portuguese')}</option>
      <option value="en">{t('english')}</option>
      <option value="es">{t('spanish')}</option>
    </select>
  )
}
