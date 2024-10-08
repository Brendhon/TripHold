"use client";

import { BaseStepProps, TransferActivity } from '@app/models';
import { isAirport } from '@utils/common';
import { StepDetail } from 'components/Steps/StepDetail';
import { SummaryStructure } from '../../ActivitySummary/SummaryStructure';
import { TransportContentSummary } from '../../ActivitySummary/TransportContentSummary';
import { HotelContent } from '../HotelContent';
import { PlaneContent } from '../PlaneContent';

export function TransferSummary(props: BaseStepProps<TransferActivity>) {
  // Plane Content Summary
  const ContentSummary = ({ className, type }: { className?: string, type: 'departure' | 'arrival' }) => {
    return (
      <TransportContentSummary className={className} transport='transfer' type={type}>
        {
          isAirport(props.state?.[type]!)
            ? <PlaneContent hideIcon onlyView airport={props.state?.[type]!} />
            : <HotelContent hideIcon onlyView hotel={props.state?.[type]!} />
        }
      </TransportContentSummary>
    );
  }

  // Render
  return (
    <SummaryStructure className={`${props.className}`} state={props.state}>
      <StepDetail text='transfer.route' />
      <div className='flex flex-col my-4 md:flex-row gap-2 md:gap-0'>
        <ContentSummary type="departure" className="md:border-r-0 md:rounded-r-none" />
        <ContentSummary type="arrival" className="md:rounded-l-none" />
      </div>
    </SummaryStructure>
  )
}
