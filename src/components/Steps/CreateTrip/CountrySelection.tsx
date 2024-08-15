"use client";

import { BaseStepProps, FormSelectItem } from '@app/models';
import { getCountriesPath } from '@utils/paths';
import { Autocomplete } from 'components/Form/Autocomplete';
import { useEffect, useState } from 'react';
import { StepTitle } from '../StepTitle';
import { CountryDetails } from '../CountryDetails';
import { useLocale } from 'next-intl';
import { getIntlName } from '@utils/common';

export function CountrySelection(props: BaseStepProps) {
  // State
  const [countries, setCountries] = useState<FormSelectItem[]>([]);

  // Locale
  const locale = useLocale();

  // Set country handle
  const getIntlOptions = () => countries.map((country) => ({ ...country, name: getIntlName(country, locale) }));

  // Fetch countries
  useEffect(() => {
    fetch(getCountriesPath())
      .then(response => response.json())
      .then(setCountries)
      .catch(console.error);
  }, []);

  // Handle country change
  const handleCountryChange = (e: any) => props.setstate!({ ...props.state, country: countries.find((country) => country.key === e.target.value) })

  // Render
  return (
    <div className={props.className}>
      <StepTitle title='whichCountryWillYouVisit' />
      <Autocomplete options={getIntlOptions()} placeholder='search' handleChange={handleCountryChange} />
      <CountryDetails country={props.state.country} />
    </div>
  )
}
