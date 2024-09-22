"use client";

import { BaseStepProps, Trip } from '@app/models';
import { useTranslations } from 'next-intl';
import { CountryDetails } from './CountryDetails';
import { StepTitle } from '../StepTitle';
import { DateDetails } from '../DateDetails';

export function TripSummary(props: BaseStepProps<Trip>) {
  // Translations
  const t = useTranslations('Trip');

  // Step Detail
  const StepDetail = (props: { text: string }) => <span className='text-lg font-thin text-grey-extra-light'>{t(props.text)}</span>;

  // Render
  return (
    <div className={props.className}>
      <StepTitle title='summary' />

      {
        props.state?.alias &&
        <>
          <StepDetail text='tripAlias' />
          <p className='text-lg text-grey-extra-light font-semibold mt-1 mb-4'>{props.state?.alias}</p>
        </>
      }

      <StepDetail text='countryYouWillVisit' />
      <CountryDetails country={props.state?.country} />

      <StepDetail text='whenYouWillTravel' />
      <DateDetails numberPerRow={2} dates={{ startDate: props.state?.startDate!, endDate: props.state?.endDate! }} />
    </div>
  )
}
