"use client";

import { BaseStepProps, Trip } from '@app/models';
import { Input } from 'components/Form';
import { StepDesc } from '../StepDesc';
import { StepTitle } from '../StepTitle';

export function TripAlias(props: BaseStepProps<Trip>) {
  // Handle change
  const handleChange = (e: any) => props.setstate!({ ...props.state!, alias: e.target.value });

  // Render
  return (
    <div className={props.className}>
      <StepTitle title='tripIdentifier' />
      <Input handleChange={handleChange} maxLength={35} controller={props.state?.alias} type="text" placeholder="tripIdentifier" />
      <StepDesc desc='tripIdentifier' className='max-w-[400px]' />
    </div>
  )
}
