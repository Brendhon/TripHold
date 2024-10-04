"use client";

import { Activity } from '@app/models';
import { StepDetail } from 'components/Steps/StepDetail';

interface Props {
  state?: Activity;
}

export function SummaryDetails(props: Props) {
  // Render
  return (
    props.state?.description &&
    <>
      <StepDetail text='activityDescription' />
      <p className='text-sm text-justify text-grey-extra-light font-light mt-1 mb-4'>{props.state?.description}</p>
    </>
  )
}
