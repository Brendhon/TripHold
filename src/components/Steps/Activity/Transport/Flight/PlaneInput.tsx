"use client";

import { Airport } from '@app/models';
import { Button, Divider } from '@nextui-org/react';
import { searchInArray } from '@utils/common';
import { Input } from 'components/Form';
import { getAirportsByAdvancedSearch } from 'lib/airports/airports';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { PlaneContent } from '../PlaneContent';

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
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [advancedOptions, setAdvancedOptions] = useState<Airport[]>([]);

  // Translations
  const t = useTranslations();

  // Fetch airports
  useEffect(() => {
    const options = advancedOptions.length > 0
      ? [...advancedOptions]
      : [...props.options];

    // Check if search is empty
    if (!search) return setOptions(options);

    // Check if latitude and longitude exists
    const keys: (keyof Airport)[] = ['name', 'municipality', 'iso_country', 'iata_code'];

    // Set filtering
    setOptions(options.filter((airport: Airport) => searchInArray(search, keys, airport)));
  }, [props.options, search]);


  // Advanced search
  const advancedSearch = () => {
    // Set searching
    setIsSearching(true);

    // Get airports by advanced search
    getAirportsByAdvancedSearch(search)
      .then((airports: Airport[]) => {
        setAdvancedOptions(airports)
        setOptions(airports)
      })
      .catch(console.error)
      .finally(() => setIsSearching(false));
  }

  // Not found
  const NotFound = () => (
    <div className='flex flex-col items-center justify-center p-4'>
      <span className='text-grey-extra-light'>{t('notFoundWhatYouAreLookingFor')}</span>
      <p className='text-grey-light text-sm'>{t('tryToUseAdvancedSearch')}</p>
      <Button
        isDisabled={isSearching || !search}
        isLoading={isSearching}
        onClick={advancedSearch}
        className='flex justify-center my-3 text-center text-grey-light cursor-pointer rounded-md p-5'>
        <FaSearch size={16} />
        {t('advancedSearch')}
      </Button>
    </div>
  );

  // Render
  return (
    <div className={`2lg:w-[500px] ${props.className}`}>
      <Input
        placeholder={props.placeholder}
        type='text'
        className='mb-2'
        controller={search}
        handleChange={(e: any) => setSearch(e.target.value)}
      />

      <div className='flex flex-col max-h-60 gap-2 overflow-y-auto rounded-md m-2'>
        {
          options.length > 0
            ? options.map((airport: Airport) => <PlaneContent onClick={() => props.onChange(airport)} key={airport.id} airport={airport} props={props} />)
            : <NotFound />
        }
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
