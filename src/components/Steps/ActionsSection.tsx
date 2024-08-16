"use client";

import { ActionsSectionProps } from '@app/models';
import { Button } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { FaChevronLeft } from 'react-icons/fa';

export function ActionsSection(props: ActionsSectionProps) {
  // Translations
  const t = useTranslations('Button');

  // Render
  return (
    <section className='flex items-center justify-between'>
      <Button
        color="default"
        onClick={props.back}
        startContent={<FaChevronLeft />}
        type="button">
        {t('back')}
      </Button>

      <Button
        color="primary"
        isLoading={props.isLoading}
        isDisabled={props.isConfirmDisabled}
        onClick={props.confirm}
        type="button">
        {t('confirm')}
      </Button>
    </section>
  )
}
