"use client";

import { TripCardProps } from '@app/models';
import { getIntlName } from '@utils/common';
import { formatDate } from '@utils/dates';
import { AnimatedDiv } from 'components/Common';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { FiPlusCircle } from "react-icons/fi";

/**
 * Trip Card
 */
export function TripCard(props: TripCardProps) {
  // Translations
  const t = useTranslations('Trip');

  // Get locate
  const locate = useLocale();

  // Common card
  const commonCard = () => (
    <>
      <Image
        priority
        hidden={!props?.trip!.country.flag}
        src={props?.trip!.country.flag ?? ''}
        alt={props?.trip!.country.name ?? 'Country flag'}
        className='border-grey-thin border-1 rounded-sm mb-1'
        width="0" height="0" style={{ width: "auto", height: "auto", maxWidth: "80%" }}
      />

      <h3 className="text-lg font-bold mb-3">{getIntlName(props.trip?.country, locate)}</h3>

      <span className='text-small'>
        {formatDate(locate, props.trip!.startDate)} {t("until")} {formatDate(locate, props.trip!.endDate)}
      </span>
    </>
  )

  // New card
  const newCard = () => (
    <>
      <FiPlusCircle className="text-5xl text-primary" />

      <h3 className="text-lg font-bold mb-3">{t('invite')}</h3>

      <span className='text-small'>{t('inviteInfo')}</span>
    </>
  )

  return (
    <div {...props} className="flex justify-center text-center">
      <AnimatedDiv className={`flex flex-col items-center justify-center text-center  
        gap-2 px-4 py-2 rounded-md cursor-pointer border-1 w-64 h-72
        hover:bg-grey-bold  hover:border-purple-semi-bold transition-all duration-400
        ${props.className}`}>
        {props.trip ? commonCard() : newCard()}
      </AnimatedDiv>
    </div>
  )
}