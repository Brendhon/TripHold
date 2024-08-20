"use client";

import { getIntlName } from '@utils/common';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { ReactNode } from 'react';
import { FaCar } from 'react-icons/fa';
import { GiTwoCoins } from 'react-icons/gi';
import { IoLanguage } from 'react-icons/io5';
import { MdAccessTimeFilled, MdPeopleAlt } from 'react-icons/md';
import { RiMapPin2Fill } from 'react-icons/ri';

// Info
const Info = ({ data, icon }: { data: any, icon: ReactNode }) => (
  <div className='flex gap-2 items-center text-sm'>
    <span>{icon}</span>
    <p className='max-w-[400px] text-ellipsis'>{data}</p>
  </div>
);

export function CountryDetails(props: { country?: Country }) {
  // Translations
  const t = useTranslations('Country');

  // Locale
  const locale = useLocale();

  // Format population
  const formatPopulation = (population: number) => {
    if (population > 1000000) return `${(population / 1000000).toFixed(1)}M`;
    if (population > 1000) return `${(population / 1000).toFixed(1)}K`;
    return population;
  }

  // Get car side description
  const getCarSide = (carSide: Side) => t(`carSide.${carSide}`);

  // Get country name
  const countryName = getIntlName(props.country, locale);

  // Render
  return (props.country &&
    <div className='flex flex-col md:flex-row gap-6 border-1 my-4 border-blue-light rounded-sm p-4 justify-between'>

      <div className='flex flex-col gap-4 justify-start items-center'>
        <h3 className='text-xl font-semibold'>{countryName}</h3>
        <div>
          <Image
            alt='Country flag'
            src={props.country.flag!}
            className='rounded-md'
            priority
            width="0"
            height="0"
            style={{ width: "auto", height: "120px" }}
          />
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <Info data={formatPopulation(props.country.population)} icon={<MdPeopleAlt size={20} />} />
        <Info data={props.country.languages?.join(', ')} icon={<IoLanguage size={20} />} />
        <Info data={props.country.timezones?.join(', ')} icon={<MdAccessTimeFilled size={20} />} />
        <Info data={props.country.currencies?.join(', ')} icon={<GiTwoCoins size={20} />} />
        <Info data={props.country.capital} icon={<RiMapPin2Fill size={20} />} />
        <Info data={getCarSide(props.country.carSide)} icon={<FaCar size={20} />} />
      </div>
    </div>
  )
}
