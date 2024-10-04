"use client";

import { BaseStepProps, FlightActivity } from '@app/models';
import { StepDetail } from 'components/Steps/StepDetail';
import { SummaryStructure } from '../../ActivitySummary/SummaryStructure';
import { TransportContentSummary } from '../../ActivitySummary/TransportContentSummary';
import { PlaneContent } from '../PlaneContent';

export function FlightSummary(props: BaseStepProps<FlightActivity>) {
  // Plane Content Summary
  const PlaneContentSummary = ({ className, type }: { className?: string, type: 'departure' | 'arrival' }) => {
    return (
      <TransportContentSummary className={className} type={type} transport='flight'>
        <PlaneContent hideIcon onlyView airport={props.state?.[type]!} />
      </TransportContentSummary>
    );
  }

  // Render
  return (
    <SummaryStructure className={`${props.className}`} state={props.state}>
      <StepDetail text='flight.route' />
      <div className='flex flex-col my-4 md:flex-row gap-2 md:gap-0'>
        <PlaneContentSummary type="departure" className="md:border-r-0 md:rounded-r-none" />
        <PlaneContentSummary type="arrival" className="md:rounded-l-none" />
      </div>
    </SummaryStructure>
  )
}
