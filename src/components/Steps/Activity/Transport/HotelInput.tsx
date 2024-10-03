"use client";

import { TripAdvisorActivitySearch } from '@app/models';
import { Button, Divider } from '@nextui-org/react';
import { searchInArray } from '@utils/common';
import { Input } from 'components/Form';
import { getHotels } from 'lib/activity/activity';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { HotelContent } from './HotelContent';

interface SelectPlaneProps {
  type: ('arrival' | 'departure');
  className: string;
  placeholder: string;
  onChange: any;
  current?: TripAdvisorActivitySearch;
  options: TripAdvisorActivitySearch[];
}

export function HotelInput(props: SelectPlaneProps) {
  // State
  const [options, setOptions] = useState<TripAdvisorActivitySearch[]>([]);
  const [search, setSearch] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [advancedOptions, setAdvancedOptions] = useState<TripAdvisorActivitySearch[]>([]);

  // Translations
  const t = useTranslations();

  // Locale
  const locale = useLocale();

  // Fetch Hotels
  useEffect(() => {
    const options = advancedOptions.length > 0
      ? [...advancedOptions]
      : [...props.options];

    // Check if search is empty
    if (!search) return setOptions(options);

    // Check if latitude and longitude exists
    const keys: (keyof TripAdvisorActivitySearch)[] = ['name', 'address'];

    // Set filtering
    setOptions(options.filter((data: TripAdvisorActivitySearch) => searchInArray(search, keys, data)));
  }, [props.options, search]);


  // Advanced search
  const advancedSearch = () => {
    // Set searching
    setIsSearching(true);

    // Get airports by advanced search
    getHotels(search, locale)
      .then((hotels: TripAdvisorActivitySearch[]) => {
        setAdvancedOptions(hotels)
        setOptions(hotels)
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
            ? options.map((data: TripAdvisorActivitySearch) => <HotelContent onClick={() => props.onChange(data)} key={data.location_id} hotel={data} props={props} />)
            : <NotFound />
        }
      </div>

      {props.current &&
        <>
          <Divider className='mt-2' />
          <div className='flex items-center justify-center p-4'>
            <HotelContent hotel={props.current} props={props} />
          </div>
        </>
      }
    </div>

  );
}
