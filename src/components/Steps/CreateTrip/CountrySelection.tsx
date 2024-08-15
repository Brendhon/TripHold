"use client";

import { BaseStepProps, FormSelectItem } from '@app/models';
import { getCountriesPath } from '@utils/paths';
import { Autocomplete } from 'components/Form/Autocomplete';
import { useEffect, useState } from 'react';
import { StepTitle } from '../StepTitle';

export function CountrySelection(props: BaseStepProps) {
  // State
  const [countries, setCountries] = useState<FormSelectItem[]>([]);

  // Fetch countries
  useEffect(() => {
    fetch(getCountriesPath())
      .then(response => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  // Handle country change
  const handleCountryChange = (e: any) => props.setstate!({ ...props.state, country: countries.find((country) => country.key === e.target.value) })

  // Render
  return (
    <>
      <StepTitle title='whichCountryWillYouVisit' />
      <Autocomplete options={countries} placeholder='country' handleChange={handleCountryChange} />
    </>
  )
}
