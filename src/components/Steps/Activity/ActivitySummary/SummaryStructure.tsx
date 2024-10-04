"use client";

import { Activity } from '@app/models';
import { StepTitle } from 'components/Steps/StepTitle';
import { SummaryDetails } from './SummaryDetails';
import { SummaryPeriod } from './SummaryPeriod';

interface Props {
  className?: string;
  state?: Activity;
  children?: React.ReactNode;
}

export function SummaryStructure(props: Props) {
  // Render
  return (
    <div className={`${props.className} min-w-80 md:min-w-96 max-w-[600px]`}>
      <StepTitle title='summary' />

      <SummaryDetails state={props.state} />

      {props.children}

      <SummaryPeriod state={props.state} />
    </div>
  )
}
