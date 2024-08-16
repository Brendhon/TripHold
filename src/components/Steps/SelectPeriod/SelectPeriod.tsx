"use client";

import { BaseStepProps, Trip } from '@app/models';
import { DatePicker } from 'components/Form/DatePicker';
import { StepTitle } from '../StepTitle';
import { useTranslations } from 'next-intl';

export function SelectPeriod(props: BaseStepProps<Trip>) {
  // Translations
  const t = useTranslations('Trip');

  // Handle Start Date
  const handleStartDate = (e: any) => props.setstate!({ ...props.state!, startDate: e, endDate: undefined });

  // Handle End Date
  const handleEndDate = (e: any) => props.setstate!({ ...props.state!, endDate: e });

  // Render
  return (
    <div className={props.className}>
      <StepTitle title='whenWillYouTravel' />

      <div className='flex flex-col gap-1 md:flex-row justify-center md:gap-4 items-center'>
        <DatePicker
          date={props.state?.startDate}
          handleChange={handleStartDate}
          datePickerProps={{
            minDate: new Date(),
            startDate: props.state?.startDate,
          }}
        />

        <span>{t('until')}</span>

        <DatePicker
          date={props.state?.endDate}
          handleChange={handleEndDate}
          disabled={!props.state?.startDate}
          datePickerProps={{
            minDate: props.state?.startDate,
          }}
        />
      </div>
    </div>
  )
}
