"use client";

import { Activity } from '@app/models';
import { DateDetails } from 'components/Steps/DateDetails';
import { StepDetail } from 'components/Steps/StepDetail';

interface Props {
  state?: Activity;
  rows?: number;
  showTime?: boolean;
  title?: string;
}

export function SummaryPeriod(props: Props) {
  // Render
  return (
    <>
      <StepDetail text={props.title ?? 'activityPeriod'} />
      <DateDetails
        showTime={!!props.showTime}
        numberPerRow={props.rows ?? 2}
        dates={{ startDate: props.state?.startDate!, endDate: props.state?.endDate! }} />
    </>
  )
}
