"use client";

import { BaseStepProps, FlightActivity } from '@app/models';
import { DateDetails } from 'components/Steps/DateDetails';
import { StepTitle } from 'components/Steps/StepTitle';
import { useTranslations } from 'next-intl';
import { PlaneContent } from './PlaneContent';

export function FlightSummary(props: BaseStepProps<FlightActivity>) {
  // Translations
  const t = useTranslations('Activity');

  // Step Detail
  const StepDetail = (props: { text: string }) => <span className='text-lg font-semibold text-grey-extra-light'>{t(props.text)}</span>;

  // Plane Content Summary
  const PlaneContentSummary = ({ className, type }: { className?: string, type: 'departure' | 'arrival' }) => {
    return (
      <div className={`flex flex-col border-1 border-grey-light md:rounded-md w-80 ${className}`}>
        <span className='flex text-grey-extra-light text-md font-semibold justify-center p-2 items-center rounded-t-md bg-blue-light w-full' >{t(`flight.${type}`)}</span>
        <PlaneContent hideIcon onlyView airport={props.state?.[type]!} />
      </div>
    );
  }

  // Render
  return (
    <div className={`${props.className} min-w-80 md:min-w-96 max-w-[600px]`}>
      <StepTitle title='summary' />

      {
        props.state?.description &&
        <>
          <StepDetail text='activityDescription' />
          <p className='text-sm text-justify text-grey-extra-light font-light mt-1 mb-4'>{props.state?.description}</p>
        </>
      }

      <StepDetail text='flight.route' />

      <div className='flex flex-col my-4 md:flex-row gap-2 md:gap-0'>
        <PlaneContentSummary type="departure" className="md:border-r-0 md:rounded-r-none" />
        <PlaneContentSummary type="arrival" className="md:rounded-l-none" />
      </div>

      <StepDetail text='activityPeriod' />
      <DateDetails
        showTime
        numberPerRow={2}
        dates={{ startDate: props.state?.startDate!, endDate: props.state?.endDate! }} />
    </div>
  )
}
