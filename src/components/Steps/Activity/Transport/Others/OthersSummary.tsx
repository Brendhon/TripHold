"use client";

import { BaseStepProps, OthersTransportActivity } from '@app/models';
import { StepDetail } from 'components/Steps/StepDetail';
import { SummaryStructure } from '../../ActivitySummary/SummaryStructure';
import { TransportContentSummary } from '../../ActivitySummary/TransportContentSummary';

export function OthersSummary(props: BaseStepProps<OthersTransportActivity>) {
  // Plane Content Summary
  const ContentSummary = ({ className, type }: { className?: string, type: 'departure' | 'arrival' }) => {
    return (
      <TransportContentSummary type={type} transport='others' className={className}>
        {props.state?.[type]?.address_string}
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
