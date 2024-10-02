"use client";

import { Airport } from '@app/models';
import { Divider } from '@nextui-org/react';
import { searchInArray } from '@utils/common';
import { Input } from 'components/Form';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { BiSolidPlaneAlt } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';

interface SelectPlaneProps {
  type: ('arrival' | 'departure');
  className: string;
  placeholder: string;
  onChange: any;
  current?: Airport;
  options: Airport[];
}

export function PlaneInput(props: SelectPlaneProps) {
  // State
  const [options, setOptions] = useState<Airport[]>([]);
  const [search, setSearch] = useState<string>('');

  // Fetch airports
  useEffect(() => {
    // Check if latitude and longitude exists
    const keys: (keyof Airport)[] = ['name', 'municipality', 'iso_country', 'iata_code'];

    // Filter airports
    const filtered = search
      ? props.options.filter((airport: Airport) => searchInArray(search, keys, airport))
      : props.options;

    // Set options
    setOptions(filtered);
  }, [props.options, search]);

  // Translations
  const t = useTranslations();

  // Plane Content
  const PlaneContent = ({ airport, props, onClick }: { airport: Airport, props: SelectPlaneProps, onClick?: any }) => (
    <div
      key={airport.id + props.type}
      onClick={onClick}
      className={
        `flex items-center py-2 px-4 gap-2 hover:bg-blue-light cursor-pointer rounded-md ${props.current?.id === airport.id ? "bg-blue-light" : ""}`
      }>

      {/* Icon */}
      <div className='flex items-center justify-center w-8'>
        <BiSolidPlaneAlt className="text-xl text-grey-extra-light mr-3" />
      </div>

      {/* Content */}
      <div className="flex-grow">
        <p className="font-semibold">{airport.municipality}, {airport.iso_country}</p>
        <p className="text-sm text-grey-light">
          {airport.name}
          {airport.iata_code ? ` (${airport.iata_code})` : ""} {/* Renderiza o código somente se ele existir */}
        </p>
      </div>
    </div>
  );

  // Render
  return (
    <div className={`2lg:w-[500px] ${props.className}`}>
      <Input
        placeholder={props.placeholder}
        type='text'
        className='mb-2'
        handleChange={(e: any) => setSearch(e.target.value)}
      />

      <div className='flex flex-col max-h-60 overflow-y-auto rounded-md m-2'>
        {
          options.length > 0
            ? options.map((airport: Airport) => <PlaneContent onClick={() => props.onChange(airport)} key={airport.id} airport={airport} props={props} />)
            : <p className='text-center text-grey-light min-w-[400px]'>{t('noDataFound')}</p>
        }

        <span className='flex justify-center my-3 gap-2 text-center text-grey-light hover:text-blue-light cursor-pointer border-1 border-blue-light rounded-md p-2'>
          <FaSearch className='mt-1' size={16} />
          {t('advancedSearch')}
        </span>
      </div>

      {props.current &&
        <>
          <Divider className='mt-2' />
          <div className='flex items-center justify-center p-4'>
            <PlaneContent airport={props.current} props={props} />
          </div>
        </>
      }
    </div>

  );
}
