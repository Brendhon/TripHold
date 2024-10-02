"use client";

import { SelectPeriodProps } from '@app/models';
import { DatePicker } from 'components/Form/DatePicker';
import { useTranslations } from 'next-intl';
import { StepTitle } from '../StepTitle';

export function SelectPeriod(props: SelectPeriodProps) {
  // Translations
  const t = useTranslations('Trip');

  // Handle Start Date
  const handleStartDate = (e: any) => props.setstate!({ ...props.state!, startDate: e, endDate: undefined });

  // Handle End Date
  const handleEndDate = (e: any) => props.setstate!({ ...props.state!, endDate: e });

  // Render
  return (
    <div className={props.className}>
      <StepTitle title={props.title ?? 'whenWillYouTravel'} />

      <div className='flex flex-col gap-1 md:flex-row justify-center md:gap-4 items-center'>
        <DatePicker
          showTime={props.showTime}
          date={props.state?.startDate}
          placeholder={props.startDatePlaceholder}
          handleChange={handleStartDate}
          datePickerProps={{
            minDate: new Date(),
            startDate: props.state?.startDate,
          }}
        />

        <span>{t('until')}</span>

        <DatePicker
          showTime={props.showTime}
          date={props.state?.endDate}
          placeholder={props.endDatePlaceholder}
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
